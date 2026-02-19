import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://swift-man.github.io',
  base: '/dev.gorani.me',
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
          autogenerate: { directory: '.' }
        }
      ]
    })
  ]
});
