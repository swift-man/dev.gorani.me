import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const plausibleDomain = process.env.PUBLIC_PLAUSIBLE_DOMAIN ?? 'dev.gorani.me';
const plausibleScriptSrc =
  process.env.PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? 'https://plausible.io/js/script.js';

export default defineConfig({
  site: 'https://dev.gorani.me',
  redirects: {
    '/blog/first-post/': '/first-post/',
    '/blog/second-post/': '/misc/second-post/',
    '/second-post/': '/misc/second-post/'
  },
  integrations: [
    starlight({
      title: 'dev.gorani.me',
      description: 'AI 답변 기반 개발 기록',
      social: {
        github: 'https://github.com/swift-man/dev.gorani.me'
      },
      sidebar: [
        {
          label: '문서',
          collapsed: false,
          autogenerate: { directory: '' }
        }
      ],
      head: [
        {
          tag: 'script',
          attrs: {
            defer: true,
            'data-domain': plausibleDomain,
            src: plausibleScriptSrc
          }
        }
      ],
      customCss: ['./src/styles/code-theme.css'],
      components: {
        Footer: './src/components/CommentsFooter.astro'
      }
    })
  ]
});
