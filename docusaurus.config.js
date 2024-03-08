// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/**
 * @type {import('@docusaurus/types').Config}
 */
const config = {
  title: 'VNBnode Docs',
  tagline: 'VietNam Blockchain',
  favicon: 'img/favicon.ico',
  url: 'https://docs.vnbnode.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/vnbnode/docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/vnbnode/blog/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'VNBnode',
      logo: {
        alt: 'VNBnode Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/vnbnode',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://twitter.com/vnbnode',
          label: 'Twitter',
          position: 'right',
        },
        {
          href: 'https://t.me/VNBnodegroup',
          label: 'Telegram',
          position: 'right',
        },
      ],
    },
    algolia: {
      apiKey: 'd8c6d0ef251886d670b53b1f9cbb416c',
      indexName: 'vnbnode',
      contextualSearch: true,
      appId: '5VV9G0AUW0',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'VNBnode',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/vnbnode',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/VNBnodegroup',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/vnbnode',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} VNBnode.com`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
