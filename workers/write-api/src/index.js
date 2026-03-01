const CATEGORIES = new Set(['python', 'mongodb', 'nginx', 'react-native', 'redis', 'postgresql', 'astro']);

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers }
  });

const b64url = (arr) => {
  let str = '';
  arr.forEach((n) => (str += String.fromCharCode(n)));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const randomState = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return b64url(bytes);
};

const parseCookies = (req) => {
  const raw = req.headers.get('cookie') || '';
  return raw.split(';').reduce((acc, part) => {
    const [k, ...v] = part.trim().split('=');
    if (!k) return acc;
    acc[k] = decodeURIComponent(v.join('='));
    return acc;
  }, {});
};

const makeCors = (origin, allowedOrigin) => {
  if (!origin || origin !== allowedOrigin) return {};
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-credentials': 'true',
    'access-control-allow-headers': 'content-type',
    'access-control-allow-methods': 'GET,POST,OPTIONS'
  };
};

const gh = async (path, token, init = {}) => {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'user-agent': 'dev-gorani-write-api',
      ...(init.headers || {})
    }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `GitHub API ${res.status}`);
  }
  return data;
};

const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const markdownFor = ({ title, description, body }) => {
  const lines = ['---', `title: ${title}`];
  if (description) lines.push(`description: ${description}`);
  lines.push('---', '', body.trim(), '');
  return lines.join('\n');
};

const toBase64Utf8 = (text) => {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin);
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('origin');
    const cors = makeCors(origin, env.ALLOWED_ORIGIN);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === '/auth/github/start' && request.method === 'GET') {
      const state = randomState();
      const redirect = url.searchParams.get('redirect') || `${env.ALLOWED_ORIGIN}/write`;
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', `${env.API_BASE}/auth/github/callback`);
      authUrl.searchParams.set('scope', 'repo');
      authUrl.searchParams.set('state', state);

      const headers = new Headers({ location: authUrl.toString() });
      headers.append('set-cookie', `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`);
      headers.append('set-cookie', `post_login_redirect=${encodeURIComponent(redirect)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`);
      return new Response(null, { status: 302, headers });
    }

    if (url.pathname === '/auth/github/callback' && request.method === 'GET') {
      const cookies = parseCookies(request);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      if (!code || !state || !cookies.oauth_state || state !== cookies.oauth_state) {
        return new Response('Invalid OAuth state', { status: 400 });
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code
        })
      });
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) {
        return new Response('OAuth token exchange failed', { status: 400 });
      }

      const redirect = cookies.post_login_redirect
        ? decodeURIComponent(cookies.post_login_redirect)
        : `${env.ALLOWED_ORIGIN}/write`;

      const headers = new Headers({ location: redirect });
      headers.append('set-cookie', `gh_token=${tokenData.access_token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`);
      headers.append('set-cookie', 'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
      headers.append('set-cookie', 'post_login_redirect=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
      return new Response(null, { status: 302, headers });
    }

    if (url.pathname === '/auth/logout' && request.method === 'POST') {
      const headers = new Headers(cors);
      headers.append('set-cookie', 'gh_token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
      return json({ ok: true }, 200, headers);
    }

    const cookies = parseCookies(request);
    const token = cookies.gh_token;

    if (url.pathname === '/api/me' && request.method === 'GET') {
      if (!token) return json({ error: 'unauthorized' }, 401, cors);
      try {
        const me = await gh('/user', token);
        return json({ login: me.login, id: me.id }, 200, cors);
      } catch (err) {
        return json({ error: err.message }, 401, cors);
      }
    }

    if (url.pathname === '/api/posts' && request.method === 'POST') {
      if (!token) return json({ error: 'unauthorized' }, 401, cors);

      let input;
      try {
        input = await request.json();
      } catch {
        return json({ error: 'invalid json' }, 400, cors);
      }

      const category = (input.category || '').trim();
      const title = (input.title || '').trim();
      const description = (input.description || '').trim();
      const body = (input.body || '').trim();

      if (!CATEGORIES.has(category)) return json({ error: 'invalid category' }, 400, cors);
      if (!title || !body) return json({ error: 'title/body required' }, 400, cors);

      const slug = slugify(title);
      if (!slug) return json({ error: 'invalid title for slug' }, 400, cors);

      const path = `src/content/docs/${category}/${slug}.md`;
      const content = markdownFor({ title, description, body });
      const encoded = toBase64Utf8(content);

      try {
        const result = await gh(
          `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`,
          token,
          {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              message: `docs(${category}): add ${slug}`,
              content: encoded,
              branch: env.DEFAULT_BRANCH || 'main'
            })
          }
        );

        return json(
          {
            ok: true,
            path,
            htmlUrl: result.content?.html_url || `https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/blob/${env.DEFAULT_BRANCH || 'main'}/${path}`
          },
          200,
          cors
        );
      } catch (err) {
        return json({ error: err.message }, 400, cors);
      }
    }

    return json({ error: 'not found' }, 404, cors);
  }
};
