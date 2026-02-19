import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://dev.gorani.me',
  integrations: [
    starlight({
      title: 'Gorani Dev Blog',
      description: 'Astro + Starlight로 운영하는 정적 블로그',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/YOUR_GITHUB_ID/dev.gorani.me'
        }
      ],
      sidebar: [
        {
          label: '블로그',
          items: [
            { label: '환영합니다', slug: 'index' },
            { label: '첫 번째 글', slug: 'blog/first-post' },
            { label: '두 번째 글', slug: 'blog/second-post' }
          ]
        }
      ]
    })
  ]
});
