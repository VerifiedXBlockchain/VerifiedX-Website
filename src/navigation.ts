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

  webWallet: `${DOCS_BASE_URL}/docs/introduction/applications`,
  downloadGuiMacArm:
    'https://github.com/VerifiedXBlockchain/VerifiedX-GUI/releases/download/5.3.0/VFX-OSX-ARM-Installer.dmg',
  downloadGuiMacIntel:
    'https://github.com/VerifiedXBlockchain/VerifiedX-GUI/releases/download/5.3.0/VFX-OSX-Intel-Installer.dmg',
  downloadGuiWindows:
    'https://github.com/VerifiedXBlockchain/VerifiedX-GUI/releases/download/5.3.0/VFXWalletSetup-64.exe',
  downloadCli: 'https://github.com/VerifiedXBlockchain/VerifiedX-Core/releases/tag/beta5.3.0',
  trilliumIde: 'https://trillium.verifiedx.io',
  githubOrg: 'https://github.com/VerifiedXBlockchain',
  configDocs: `${DOCS_BASE_URL}/docs/core/config`,
  vbtcIntegrationDocs: `${DOCS_BASE_URL}/docs/core/vbtc`,
  roadmap: `${DOCS_BASE_URL}/docs/roadmap`,
  testnetDocs: `${DOCS_BASE_URL}/docs/integration/testnet`,
  sync: 'https://sync.verifiedx.io',

  twitter: 'https://x.com/VFXBlockchain',
  discord: 'https://discord.gg/7cd5ebDQCj',
  email: 'mailto:info@verifiedx.io',
};

export const headerData = {
  links: [
    {
      text: 'Products',
      links: [
        { text: 'vBTC', href: `${DOCS_BASE_URL}/docs/introduction/about-vbtc`, color: '#f7931a' },
        { text: 'Prism Privacy', href: '#', color: '#a78bfa' },
        { text: 'SwitchBlade Wallet', href: externalLinks.webWallet, color: '#73C4FA' },
        { text: 'Butterfly', href: 'https://www.befree.io', color: '#34d399' },
        { text: 'PulseXAI', href: '#', color: '#f7931a' },
      ],
    },
    {
      text: 'Solutions',
      links: [
        { text: 'Everyday Users', href: `${DOCS_BASE_URL}/docs/tutorials/video-tutorials/` },
        { text: 'Institutions', href: `${DOCS_BASE_URL}/docs/introduction/institutional` },
        { text: 'Developers', href: `${DOCS_BASE_URL}/docs/integration/` },
      ],
    },
    {
      text: 'Resources',
      links: [
        { text: 'Docs', href: externalLinks.docs },
        { text: 'Security', href: `${DOCS_BASE_URL}/docs/documents/` },
        { text: 'GitHub', href: externalLinks.githubOrg },
      ],
    },
  ],
  actions: [
    { text: 'Open Butterfly', href: 'https://www.befree.io', target: '_blank' },
    { text: 'Open PulseXAI', href: '#', target: '_blank' },
    { text: 'Open SwitchBlade', href: externalLinks.webWallet, target: '_blank' },
    { text: 'Start Building', href: externalLinks.docs, target: '_blank' },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Products',
      links: [
        { text: 'vBTC', href: `${DOCS_BASE_URL}/docs/introduction/about-vbtc` },
        { text: 'Prism Privacy', href: '#' },
        { text: 'SwitchBlade Wallet', href: externalLinks.webWallet },
        { text: 'Butterfly', href: 'https://www.befree.io' },
        { text: 'PulseXAI', href: '#' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { text: 'Everyday Users', href: `${DOCS_BASE_URL}/docs/tutorials/video-tutorials/` },
        { text: 'Institutions', href: `${DOCS_BASE_URL}/docs/introduction/institutional` },
        { text: 'Developers', href: `${DOCS_BASE_URL}/docs/integration/` },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Docs', href: externalLinks.docs },
        { text: 'Security', href: `${DOCS_BASE_URL}/docs/documents/` },
        { text: 'GitHub', href: externalLinks.githubOrg },
      ],
    },
    {
      title: 'Foundation',
      links: [
        { text: 'About', href: `${DOCS_BASE_URL}/docs/introduction/` },
        { text: 'Contact', href: externalLinks.email },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: externalLinks.twitter },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: externalLinks.githubOrg },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: externalLinks.discord },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: externalLinks.email },
  ],
  footNote: `
   Copyright ${new Date().getFullYear()} VerifiedX &middot; All rights reserved.
  `,
};
