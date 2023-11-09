const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'VNBnode',
  tagline: 'VietNam Blockchain',
  url: 'https://docs.vnbnode.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'VNBnode', // Usually your GitHub org/user name.
  projectName: 'Docs', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/vnbnode/VNBnode-Guides/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/vnbnode/VNBnode-Guides/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        plugins: [
          '@docusaurus/plugin-search',
          '@docusaurus/theme-live-codeblock',
        ],

      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'bottom',
      },
      navbar: {
        title: 'VNBnode',
        logo: {
          alt: 'VNBnode Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
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
            href :'https://t.me/VNBnodegroup',
            label: 'Telegram',
            position: 'right',
          },
        ],
      },
      search: {
        // Các tùy chọn của plugin tìm kiếm
        // Xem thêm: https://docusaurus.io/docs/search
        showSearchBar: true,
        // các tùy chọn khác nếu cần
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
