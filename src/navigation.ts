import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: "Discover",
      href: "#section-discover",
    },
    {
      text: "Why VFX",
      href: "#section-vfx",
    },
    {
      text: "Why Bitcoin",
      href: "#section-bitcoin",
    },
    {
      text: "vBTC",
      href: "#section-vbtc",
      btc: true,
    },
    {
      text: "Validators",
      href: "#section-validators",
    },
    {
      text: "Switchblade",
      href: "#section-switchblade",
    },
    {
      text: "Ecosystem",
      href: "#section-ecosystem",
    },
    {
      text: "Build",
      href: "#section-build",
    },
    {
      text: "Connect",
      href: "#section-connect",
    }
  ],
  // links: [
  //   {
  //     text: 'Homes',
  //     links: [
  //       {
  //         text: 'SaaS',
  //         href: getPermalink('/homes/saas'),
  //       },
  //       {
  //         text: 'Startup',
  //         href: getPermalink('/homes/startup'),
  //       },
  //       {
  //         text: 'Mobile App',
  //         href: getPermalink('/homes/mobile-app'),
  //       },
  //       {
  //         text: 'Personal',
  //         href: getPermalink('/homes/personal'),
  //       },
  //     ],
  //   },
  //   {
  //     text: 'Pages',
  //     links: [
  //       {
  //         text: 'Features (Anchor Link)',
  //         href: getPermalink('/#features'),
  //       },
  //       {
  //         text: 'Services',
  //         href: getPermalink('/services'),
  //       },
  //       {
  //         text: 'Pricing',
  //         href: getPermalink('/pricing'),
  //       },
  //       {
  //         text: 'About us',
  //         href: getPermalink('/about'),
  //       },
  //       {
  //         text: 'Contact',
  //         href: getPermalink('/contact'),
  //       },
  //       {
  //         text: 'Terms',
  //         href: getPermalink('/terms'),
  //       },
  //       {
  //         text: 'Privacy policy',
  //         href: getPermalink('/privacy'),
  //       },
  //     ],
  //   },
  //   {
  //     text: 'Landing',
  //     links: [
  //       {
  //         text: 'Lead Generation',
  //         href: getPermalink('/landing/lead-generation'),
  //       },
  //       {
  //         text: 'Long-form Sales',
  //         href: getPermalink('/landing/sales'),
  //       },
  //       {
  //         text: 'Click-Through',
  //         href: getPermalink('/landing/click-through'),
  //       },
  //       {
  //         text: 'Product Details (or Services)',
  //         href: getPermalink('/landing/product'),
  //       },
  //       {
  //         text: 'Coming Soon or Pre-Launch',
  //         href: getPermalink('/landing/pre-launch'),
  //       },
  //       {
  //         text: 'Subscription',
  //         href: getPermalink('/landing/subscription'),
  //       },
  //     ],
  //   },
  //   {
  //     text: 'Blog',
  //     links: [
  //       {
  //         text: 'Blog List',
  //         href: getBlogPermalink(),
  //       },
  //       {
  //         text: 'Article',
  //         href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
  //       },
  //       {
  //         text: 'Article (with MDX)',
  //         href: getPermalink('markdown-elements-demo-post', 'post'),
  //       },
  //       {
  //         text: 'Category Page',
  //         href: getPermalink('tutorials', 'category'),
  //       },
  //       {
  //         text: 'Tag Page',
  //         href: getPermalink('astro', 'tag'),
  //       },
  //     ],
  //   },
  //   {
  //     text: 'Widgets',
  //     href: '#',
  //   },
  // ],
  actions: [{ text: 'Docs', href: 'https://docs.verifiedx.io', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Ecosystem',
      links: [
        { text: 'VFX Spyglass', href: '#' },
        { text: 'Web Wallet', href: '#' },
        { text: 'Source Code', href: '#' },
        { text: 'Trillium IDE', href: '#' },
        { text: 'Integration Playground', href: '#' },
        { text: 'Whitepaper', href: '#' },
      ],
    },
    {
      title: 'Docs',
      links: [
        { text: 'Tutorials', href: '#' },
        { text: 'GUI', href: '#' },
        { text: 'CLI', href: '#' },
        { text: 'Integrations', href: '#' },
        { text: 'vBTC', href: '#' },
      ],
    },
    {
      title: 'Community',
      links: [
        { text: 'X', href: '#' },
        { text: 'Discord', href: '#' },
        { text: 'Github', href: '#' },
        { text: 'dev@verifiedx.io', href: 'mailto:dev@verifiedx.io' },
      ],
    },

  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/verifiedxblockchain' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: '#' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:dev@verifiedx.io' },
  ],
  footNote: `
   Copyright ${(new Date()).getFullYear()} VerifiedX · All rights reserved.
  `,
};
