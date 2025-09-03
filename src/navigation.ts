import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';


const DOCS_BASE_URL = 'https://docs.verifiedx.io';

export const externalLinks = {

  docs: `${DOCS_BASE_URL}/`,
  deck: 'https://vfx-resources.s3.us-east-1.amazonaws.com/VerifiedX.pdf',
  whitepaper: 'https://vfx-resources.s3.us-east-1.amazonaws.com/VFXBlockchainWhitePaper2024.pdf',
  vbtcFlow: 'https://vfx-resources.s3.us-east-1.amazonaws.com/vBTC-TechAndFlow.pdf',
  spyglass: 'https://spyglass.verifiedx.io',
  validatingDocs: `${DOCS_BASE_URL}/docs/gui/gui-validating`,
  videoTutorials: `${DOCS_BASE_URL}/docs/tutorials/video-tutorials`,
  guiDocs: `${DOCS_BASE_URL}/docs/gui`,
  cliDocs: `${DOCS_BASE_URL}/docs/core`,
  vbtcDocs: `${DOCS_BASE_URL}/docs/gui/gui-vbtc`,
  installDocs: `${DOCS_BASE_URL}/docs/gui/gui-installation`,
  integrationDocs: `${DOCS_BASE_URL}/docs/integration`,
  integrationSwaggerDocs: `${DOCS_BASE_URL}/docs/integration/swagger`,

  webWallet: `https://wallet.verifiedx.io`,
  downloadGuiMacArm: 'https://github.com/VerifiedXBlockchain/VerifiedX-GUI/releases/download/5.0.7/VFX-OSX-ARM-Installer.dmg',
  downloadGuiMacIntel: 'https://github.com/VerifiedXBlockchain/VerifiedX-GUI/releases/download/5.0.7/VFX-OSX-Intel-Installer.dmg',
  downloadGuiWindows: 'https://github.com/VerifiedXBlockchain/VerifiedX-GUI/releases/download/5.0.7/VFXWalletSetup-64.exe',
  downloadCli: 'https://github.com/VerifiedXBlockchain/VerifiedX-Core/releases/tag/beta5.0.6',
  trilliumIde: 'https://trillium.verifiedx.io',
  githubOrg: 'https://github.com/VerifiedXBlockchain',
  configDocs: `${DOCS_BASE_URL}/docs/core/config`,
  vbtcIntegrationDocs: `${DOCS_BASE_URL}/docs/core/vbtc`,
  roadmap: `${DOCS_BASE_URL}/docs/roadmap`,
  testnetDocs: `${DOCS_BASE_URL}/docs/integration/testnet`,

  twitter: 'https://x.com/VFXBlockchain',
  discord: 'https://discord.gg/7cd5ebDQCj',
  email: 'mailto:dev@verifiedx.io'
}

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
  actions: [{ text: 'Docs', href: externalLinks.docs, target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Ecosystem',
      links: [
        { text: 'VFX Spyglass', href: externalLinks.spyglass },
        { text: 'Web Wallet', href: externalLinks.webWallet },
        { text: 'Source Code', href: externalLinks.githubOrg },
        { text: 'Trillium IDE', href: externalLinks.trilliumIde },
        { text: 'Integration Playground', href: externalLinks.integrationSwaggerDocs },
        { text: 'Whitepaper', href: externalLinks.whitepaper },
      ],
    },
    {
      title: 'Docs',
      links: [
        { text: 'Tutorials', href: externalLinks.videoTutorials },
        { text: 'GUI', href: externalLinks.guiDocs },
        { text: 'CLI', href: externalLinks.cliDocs },
        { text: 'Integrations', href: externalLinks.integrationDocs },
        { text: 'vBTC', href: externalLinks.vbtcDocs },
      ],
    },
    {
      title: 'Community',
      links: [
        { text: 'X', href: externalLinks.twitter },
        { text: 'Discord', href: externalLinks.discord },
        { text: 'Github', href: externalLinks.githubOrg },
        { text: 'dev@verifiedx.io', href: externalLinks.email },
      ],
    },

  ],
  secondaryLinks: [
    // { text: 'Terms', href: getPermalink('/terms') },
    // { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: externalLinks.twitter },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: externalLinks.githubOrg },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: externalLinks.discord },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: externalLinks.email },
  ],
  footNote: `
   Copyright ${(new Date()).getFullYear()} VerifiedX · All rights reserved.
  `,
};



