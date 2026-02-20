import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const plausibleDomain = process.env.PUBLIC_PLAUSIBLE_DOMAIN ?? 'dev.gorani.me';
const plausibleScriptSrc =
  process.env.PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? 'https://plausible.io/js/script.js';

export default defineConfig({
  site: 'https://dev.gorani.me',
  redirects: {
    '/blog/first-post/': '/first-post/',
    '/blog/second-post/': '/second-post/'
  },
  integrations: [
    starlight({
      title: 'Gorani Dev Blog',
      description: 'Astro + Starlight로 운영하는 정적 블로그',
      social: {
        github: 'https://github.com/swift-man/dev.gorani.me'
      },
      sidebar: [
        {
          label: 'Python',
          items: [
            { label: '카테고리 소개', slug: 'python' },
            { label: '코드 블록 스타일', slug: 'code-blocks' },
            { label: '첫 번째 글', slug: 'first-post' }
          ]
        },
        {
          label: 'MongoDB',
          items: [{ label: '카테고리 소개', slug: 'mongodb' }]
        },
        {
          label: 'Nginx',
          items: [{ label: '카테고리 소개', slug: 'nginx' }]
        },
        {
          label: 'React Native',
          items: [
            { label: '카테고리 소개', slug: 'react-native' },
            { label: '두 번째 글', slug: 'second-post' }
          ]
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
