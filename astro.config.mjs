import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
          label: '블로그',
          items: [
            { label: '홈', link: '/' },
            { label: '첫 번째 글', slug: 'first-post' },
            { label: '두 번째 글', slug: 'second-post' }
          ]
        }
      ]
    })
  ]
});
