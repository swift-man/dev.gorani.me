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
          label: 'Python',
          collapsed: false,
          autogenerate: { directory: 'python' }
        },
        {
          label: 'MongoDB',
          collapsed: false,
          autogenerate: { directory: 'mongodb' }
        },
        {
          label: 'Nginx',
          collapsed: false,
          autogenerate: { directory: 'nginx' }
        },
        {
          label: 'React Native',
          collapsed: false,
          autogenerate: { directory: 'react-native' }
        },
        {
          label: 'Redis',
          collapsed: false,
          autogenerate: { directory: 'redis' }
        },
        {
          label: 'Astro',
          collapsed: false,
          autogenerate: { directory: 'astro' }
        },
        {
          label: 'Misc',
          collapsed: false,
          autogenerate: { directory: 'misc' }
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
