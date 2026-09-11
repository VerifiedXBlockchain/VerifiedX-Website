import { useTranslations, type Locale } from '~/i18n';

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
    'https://github.com/VerifiedXBlockchain/VerifiedX-GUI/releases/download/7.0.0/VFX-OSX-ARM-Installer.dmg',
  downloadGuiMacIntel:
    'https://github.com/VerifiedXBlockchain/VerifiedX-GUI/releases/download/7.0.0/VFX-OSX-Intel-Installer.dmg',
  downloadGuiWindows:
    'https://github.com/VerifiedXBlockchain/VerifiedX-GUI/releases/download/7.0.0/VFXWalletSetup-64.exe',
  downloadCli: 'https://github.com/VerifiedXBlockchain/VerifiedX-Core/releases/latest',
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

export const getHeaderData = (locale: Locale) => {
  const t = useTranslations(locale);
  return {
    links: [
      {
        text: t('nav.products'),
        links: [
          { text: t('nav.products_vbtc'), href: `${DOCS_BASE_URL}/docs/introduction/about-vbtc`, color: '#f7931a' },
          { text: t('nav.products_prism'), href: '#', color: '#a78bfa' },
          { text: t('nav.products_switchblade'), href: externalLinks.webWallet, color: '#73C4FA' },
          { text: t('nav.products_butterfly'), href: 'https://www.befree.io', color: '#34d399' },
          { text: t('nav.products_pulsexai'), href: '#', color: '#f7931a' },
        ],
      },
      {
        text: t('nav.solutions'),
        links: [
          { text: t('nav.solutions_everyday'), href: `${DOCS_BASE_URL}/docs/tutorials/video-tutorials/` },
          { text: t('nav.solutions_institutions'), href: `${DOCS_BASE_URL}/docs/introduction/institutional` },
          { text: t('nav.solutions_developers'), href: `${DOCS_BASE_URL}/docs/integration/` },
        ],
      },
      {
        text: t('nav.resources'),
        links: [
          { text: t('nav.resources_docs'), href: externalLinks.docs },
          { text: t('nav.resources_security'), href: `${DOCS_BASE_URL}/docs/documents/` },
          { text: t('nav.resources_github'), href: externalLinks.githubOrg },
        ],
      },
    ],
    actions: [
      { text: t('nav.action_open_butterfly'), href: 'https://www.befree.io', target: '_blank' },
      { text: t('nav.action_open_pulsexai'), href: '#', target: '_blank' },
      { text: t('nav.action_open_switchblade'), href: externalLinks.webWallet, target: '_blank' },
      { text: t('nav.action_start_building'), href: externalLinks.docs, target: '_blank' },
    ],
  };
};

export const getFooterData = (locale: Locale) => {
  const t = useTranslations(locale);
  return {
    links: [
      {
        title: t('footer.section_products'),
        links: [
          { text: t('nav.products_vbtc'), href: `${DOCS_BASE_URL}/docs/introduction/about-vbtc` },
          { text: t('nav.products_prism'), href: '#' },
          { text: t('nav.products_switchblade'), href: externalLinks.webWallet },
          { text: t('nav.products_butterfly'), href: 'https://www.befree.io' },
          { text: t('nav.products_pulsexai'), href: '#' },
        ],
      },
      {
        title: t('footer.section_solutions'),
        links: [
          { text: t('nav.solutions_everyday'), href: `${DOCS_BASE_URL}/docs/tutorials/video-tutorials/` },
          { text: t('nav.solutions_institutions'), href: `${DOCS_BASE_URL}/docs/introduction/institutional` },
          { text: t('nav.solutions_developers'), href: `${DOCS_BASE_URL}/docs/integration/` },
        ],
      },
      {
        title: t('footer.section_resources'),
        links: [
          { text: t('nav.resources_docs'), href: externalLinks.docs },
          { text: t('nav.resources_security'), href: `${DOCS_BASE_URL}/docs/documents/` },
          { text: t('nav.resources_github'), href: externalLinks.githubOrg },
        ],
      },
      {
        title: t('footer.section_foundation'),
        links: [
          { text: t('footer.foundation_about'), href: `${DOCS_BASE_URL}/docs/introduction/` },
          { text: t('footer.foundation_contact'), href: externalLinks.email },
        ],
      },
    ],
    secondaryLinks: [],
    socialLinks: [
      { ariaLabel: t('footer.aria_x'), icon: 'tabler:brand-x', href: externalLinks.twitter },
      { ariaLabel: t('footer.aria_github'), icon: 'tabler:brand-github', href: externalLinks.githubOrg },
      { ariaLabel: t('footer.aria_discord'), icon: 'tabler:brand-discord', href: externalLinks.discord },
      { ariaLabel: t('footer.aria_email'), icon: 'tabler:mail', href: externalLinks.email },
    ],
  };
};
