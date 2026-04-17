import type { TranslationSchema } from './en';

/**
 * Spanish (es) — neutral Latin American, informal "tú".
 * Follows /Users/m4mac/Development/verifiedx-i18n/glossary-en-es.md.
 * Brand names and accepted industry terms (vBTC, DeFi, staking, hash, mainnet, NFT, token)
 * intentionally left in English. Proper diacritics on transacción, configuración, etc.
 */
export const es: TranslationSchema = {
  nav: {
    products: 'Productos',
    solutions: 'Soluciones',
    resources: 'Recursos',
    products_vbtc: 'vBTC',
    products_prism: 'Prism Privacy',
    products_switchblade: 'SwitchBlade Wallet',
    products_butterfly: 'Butterfly',
    products_pulsexai: 'PulseXAI',
    solutions_everyday: 'Usuarios',
    solutions_institutions: 'Instituciones',
    solutions_developers: 'Desarrolladores',
    resources_docs: 'Documentación',
    resources_security: 'Seguridad',
    resources_github: 'GitHub',
    action_open_butterfly: 'Abrir Butterfly',
    action_open_pulsexai: 'Abrir PulseXAI',
    action_open_switchblade: 'Abrir SwitchBlade',
    action_start_building: 'Empezar a construir',
    aria_main: 'Navegación principal',
  },

  announcement: {
    badge_new: 'NUEVO',
    switchblade_release: 'SwitchBlade Wallet v5.3.0 ya disponible »',
    block_height: 'Altura de bloque actual:',
  },

  footer: {
    tagline:
      'VerifiedX es el sistema operativo financiero que convierte a Bitcoin en capital financiero programable.',
    section_products: 'Productos',
    section_solutions: 'Soluciones',
    section_resources: 'Recursos',
    section_foundation: 'Fundación',
    foundation_about: 'Acerca de',
    foundation_contact: 'Contacto',
    copyright: 'Copyright {year} VerifiedX · Todos los derechos reservados.',
    legal_disclaimer: 'Aviso legal',
    legal_terms: 'Términos y condiciones',
    legal_privacy: 'Política de privacidad',
    aria_x: 'X',
    aria_github: 'Github',
    aria_discord: 'Discord',
    aria_email: 'Correo',
  },

  hero: {
    heading_prefix: 'El sistema operativo financiero para ',
    heading_bitcoin: 'Bitcoin',
    tagline:
      'VerifiedX es el sistema operativo financiero que convierte a Bitcoin en capital financiero programable.',
    description:
      'Pagos, finanzas descentralizadas, activos tokenizados, recuperación segura y la emergente economía de agentes, impulsados por una red autocustodial.',
    group_individuals: 'Personas',
    group_institutions: 'Instituciones',
    group_developers: 'Desarrolladores',
    cta_open_butterfly: 'Abrir Butterfly',
    cta_open_pulsexai: 'Abrir PulseXAI',
    cta_download_wallet: 'Descargar billetera',
    cta_institutional_infra: 'Infraestructura institucional',
    cta_integrate_vbtc: 'Integrar vBTC',
    cta_start_building: 'Empezar a construir',
    cta_code_repo: 'Repositorio de código',
    terminal_payments: 'Pagos',
    terminal_defi: 'DeFi',
    terminal_wallets: 'Billeteras',
    terminal_ai: 'Agentes de IA',
  },

  trust: {
    title: 'Respaldado por infraestructura líder de la industria',
    halborn: 'Auditorías de seguridad Halborn',
    merkle: 'Cumplimiento con Merkle Science',
    mainnet: 'Mainnet probada en producción',
    validators: 'Gobernanza por validadores',
  },

  partners: {
    heading: 'Socios e integraciones del ecosistema',
    subheading:
      'Con la confianza de proveedores de infraestructura, plataformas de custodia y socios institucionales líderes.',
  },

  home: {
    meta_title: 'VerifiedX — El sistema operativo financiero para Bitcoin.',

    capital_heading: 'Usa Bitcoin como capital financiero',
    capital_send_title: 'Envía pagos globales',
    capital_send_desc: 'Envía activos digitales al instante a cualquier parte del mundo.',
    capital_send_cta: 'Abrir aplicación',
    capital_yield_title: 'Genera rendimiento con Bitcoin',
    capital_yield_desc: 'Usa vBTC para participar en mercados financieros descentralizados.',
    capital_yield_cta: 'Conoce vBTC',
    capital_private_title: 'Transfiere Bitcoin de forma privada',
    capital_private_desc: 'Mueve fondos a través de una capa de privacidad integrada al consenso.',
    capital_private_cta: 'Próximamente',
    capital_own_title: 'Sé dueño de tu dinero',
    capital_own_desc: 'Las billeteras autocustodiales ponen tus activos bajo tu control.',
    capital_own_cta: 'Descargar billetera',
    capital_build_title: 'Construye aplicaciones financieras',
    capital_build_desc:
      'Los desarrolladores pueden crear herramientas financieras, mercados y aplicaciones descentralizadas.',
    capital_build_cta: 'Docs para desarrolladores',

    vbtc_heading_prefix: 'Desbloquea la utilidad financiera de ',
    vbtc_heading_suffix: 'Bitcoin',
    vbtc_body:
      'vBTC permite a los poseedores de Bitcoin participar en mercados financieros manteniendo colateralización total y autocustodia. Cada vBTC está respaldado 1:1 por Bitcoin y no es sintético.',
    vbtc_retail: 'Minorista',
    vbtc_institutional: 'Institucional',
    vbtc_mint: 'Emitir vBTC',
    vbtc_how: 'Cómo funciona vBTC',
    vbtc_overview: 'Resumen institucional',
    vbtc_custody: 'Integración de custodia',

    apps_heading: 'Aplicaciones financieras autocustodiales',
    apps_butterfly_title: 'Butterfly',
    apps_butterfly_desc: 'Pagos globales y generación de rendimiento sobre la red VerifiedX.',
    apps_butterfly_cta: 'Abrir Butterfly',
    apps_switchblade_title: 'SwitchBlade Wallet',
    apps_switchblade_desc: 'Billetera nativa para interactuar con VerifiedX y vBTC.',
    apps_switchblade_cta: 'Abrir billetera',
    apps_pulsexai_title: 'PulseXAI: Inteligencia tokenizada',
    apps_pulsexai_desc:
      'Agentes de IA y mercados tokenizados que ejecutan estrategias con inteligencia generativa.',
    apps_pulsexai_cta: 'Abrir PulseXAI',

    how_heading: 'Cómo se conecta todo',

    security_heading_line1: 'Infraestructura',
    security_heading_line2: 'de nivel institucional',
    security_subheading: 'Respaldado por infraestructura líder de la industria',
    security_halborn: 'Auditorías de seguridad Halborn',
    security_merkle: 'Cumplimiento Merkle Science y herramientas de trazabilidad de bloques',
    security_smart_contracts: 'Funcionalidades de contratos inteligentes integradas al consenso',
    security_validators: 'Consenso y gobernanza de validadores',
    security_selfcustody: 'Arquitectura autocustodial',
    security_opensource: 'Protocolo de código abierto con un marco unificado',
    security_overview: 'Resumen de seguridad',
    security_audit_reports: 'Informes de auditoría',
    security_run_validator: 'Ejecutar validador',
    security_institutional: 'Soluciones institucionales',

    stats_heading: 'Actividad de la red',
    stats_launch_spyglass: 'Abrir Spyglass Explorer',

    cta_heading: 'El futuro de las finanzas autocustodiales',
    cta_body_brand: 'VerifiedX',
    cta_body_middle: ' está construyendo la infraestructura que permite a ',
    cta_body_bitcoin: 'Bitcoin',
    cta_body_suffix: ' impulsar un ecosistema financiero autocustodial global.',
    cta_applications: 'Aplicaciones',
    cta_start_building: 'Empezar a construir',
    cta_infrastructure: 'Infraestructura institucional',
  },

  not_found: {
    meta_title: 'Error 404',
    heading: 'Error',
    subheading: 'Lo sentimos, no pudimos encontrar esta página.',
    body: 'Pero no te preocupes, puedes encontrar muchas otras cosas en nuestra página de inicio.',
    back_home: 'Volver al inicio',
  },
};
