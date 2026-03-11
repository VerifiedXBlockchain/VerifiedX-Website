<script>
  import { onMount, onDestroy } from 'svelte';

  // Import local assets — Astro wraps these as { src, width, height } objects
  import cubeGifMeta from '../../assets/images/vfx-cube.png';
  import wordmarkMeta from '../../assets/images/vfx-wordmark-light-no-cube.png';
  import vbtcMeta from '../../assets/images/vbtc.jpg';

  // Extract the URL string
  const cubeGif = typeof cubeGifMeta === 'string' ? cubeGifMeta : cubeGifMeta.src;
  const wordmarkImg = typeof wordmarkMeta === 'string' ? wordmarkMeta : wordmarkMeta.src;
  const vbtcImg = typeof vbtcMeta === 'string' ? vbtcMeta : vbtcMeta.src;

  // ── Flywheel config (scaled up) ──
  const CX = 245, CY = 245, R = 175;

  const fwNodes = [
    { label: 'Bitcoin',    sub: 'Deposits',     color: '#F7931A', angle: -90  },
    { label: 'vBTC',       sub: 'Minting',      color: '#73C4FA', angle: -30  },
    { label: 'Financial',  sub: 'Activity',     color: '#73C4FA', angle: 30   },
    { label: 'Liquidity',  sub: 'Growth',       color: '#839DDB', angle: 90   },
    { label: 'More',       sub: 'Applications', color: '#839DDB', angle: 150  },
    { label: 'More',       sub: 'Users',        color: '#A5D5FB', angle: -150 },
  ];

  function toRad(deg) { return deg * Math.PI / 180; }

  const nodePositions = fwNodes.map(n => {
    const a = toRad(n.angle);
    return { ...n, x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
  });

  const arcPaths = fwNodes.map((n, i) => {
    const next = fwNodes[(i + 1) % fwNodes.length];
    const a1 = toRad(n.angle), a2 = toRad(next.angle);
    const x1 = CX + R * Math.cos(a1), y1 = CY + R * Math.sin(a1);
    const x2 = CX + R * Math.cos(a2), y2 = CY + R * Math.sin(a2);
    let dAngle = next.angle - n.angle;
    if (dAngle < 0) dAngle += 360;
    const large = dAngle > 180 ? 1 : 0;
    return { d: `M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2}`, color: n.color };
  });

  const ringPath = `M ${CX} ${CY - R} A ${R} ${R} 0 1 1 ${CX - 0.1} ${CY - R} Z`;

  let activeNode = 0;
  let timer;
  let layers = [];

  onMount(() => {
    // Flywheel node cycling
    timer = setInterval(() => {
      activeNode = (activeNode + 1) % fwNodes.length;
    }, 1000);

    // Staggered layer entrance
    layers = document.querySelectorAll('.layer');
    layers.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<div class="ecosystem-wrapper">
  <div class="diagram">

    <!-- LEFT: Architecture Stack -->
    <div class="stack">

      <!-- Applications Layer -->
      <div class="layer layer-apps">
        <div class="layer-label">Applications</div>
        <div class="chips">
          <div class="chip chip-purple">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 12C10 8 6 5 3 6c0 3 2 6 5 7.5C6 15 5 17 5 19c2.5 0 5-2 7-4.5 2 2.5 4.5 4.5 7 4.5 0-2-1-4-3-5.5C19 12 21 9 21 6c-3-1-7 2-9 6z" fill="currentColor"/></svg>
            Butterfly
          </div>
          <div class="chip chip-blue">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M16 13a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" fill="currentColor"/><path d="M2 9h20" stroke="currentColor" stroke-width="1.5"/></svg>
            Switchblade
          </div>
          <div class="chip chip-purple">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.6"/></svg>
            PulseXAI
          </div>
        </div>
      </div>

      <!-- Connector -->
      <div class="connector">
        <div class="connector-arrow">
          <svg viewBox="0 0 20 20" fill="none" width="22" height="22"><path d="M10 2v14M4 11l6 7 6-7" stroke="#73C4FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>

      <!-- Financial Layer -->
      <div class="layer layer-finance">
        <div class="layer-label">Financial Layer</div>
        <div class="chips">
          <div class="chip chip-blue">
            <img src={vbtcImg} alt="vBTC" width="18" height="18" style="border-radius:3px;" />
            vBTC
          </div>
          <div class="chip chip-blue">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M9 12h6M12 9v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            Stablecoins
          </div>
          <div class="chip chip-blue">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="18" cy="15" r="3" stroke="currentColor" stroke-width="1.5"/></svg>
            Smart Contracts
          </div>
        </div>
      </div>

      <!-- Connector -->
      <div class="connector">
        <div class="connector-arrow">
          <svg viewBox="0 0 20 20" fill="none" width="22" height="22"><path d="M10 2v14M4 11l6 7 6-7" stroke="#73C4FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>

      <!-- VerifiedX Network Layer -->
      <div class="layer layer-vfx">
        <div class="layer-label">VerifiedX Network</div>
        <div class="vfx-inner">
          <img class="cube" src={cubeGif} alt="" width="56" height="56" />
          <img class="wordmark" src={wordmarkImg} alt="VerifiedX" height="28" />
        </div>
      </div>

      <!-- Connector (orange) -->
      <div class="connector">
        <div class="connector-arrow">
          <svg viewBox="0 0 20 20" fill="none" width="22" height="22"><path d="M10 2v14M4 11l6 7 6-7" stroke="#F7931A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>

      <!-- Bitcoin Layer -->
      <div class="layer layer-btc">
        <div class="layer-label">Base Layer</div>
        <div class="btc-inner">
          <div class="btc-icon">&#8383;</div>
          <div>
            <div class="btc-text">Bitcoin</div>
            <div class="btc-sub">Proof of Work &middot; Decentralized</div>
          </div>
        </div>
      </div>

      <!-- Connector (orange) -->
      <div class="connector">
        <div class="connector-arrow">
          <svg viewBox="0 0 20 20" fill="none" width="22" height="22"><path d="M10 2v14M4 11l6 7 6-7" stroke="#F7931A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>

      <!-- Users & AI Agents -->
      <div class="layer layer-users">
        <div class="users-row">
          <!-- 3 user icons -->
          {#each [0,1,2] as _}
            <svg class="user-icon" viewBox="0 0 24 24" fill="none" width="48" height="48"><circle cx="12" cy="7" r="4" stroke="#A5D5FB" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#A5D5FB" stroke-width="1.5" stroke-linecap="round"/></svg>
          {/each}
          <!-- 2 AI agent icons -->
          {#each [0,1] as _}
            <svg class="user-icon" viewBox="0 0 24 24" fill="none" width="48" height="48"><rect x="5" y="7" width="14" height="10" rx="3" stroke="#73C4FA" stroke-width="1.5"/><circle cx="9" cy="12" r="1.5" fill="#73C4FA"/><circle cx="15" cy="12" r="1.5" fill="#73C4FA"/><path d="M12 4v3M9 17v2M15 17v2" stroke="#73C4FA" stroke-width="1.5" stroke-linecap="round"/></svg>
          {/each}
        </div>
        <div class="users-label">Users &amp; AI Agents</div>
      </div>

    </div>

    <!-- RIGHT: Flywheel -->
    <div class="flywheel-wrap">
      <div class="flywheel-title">The Bitcoin<br /><span>Financial Flywheel</span></div>

      <div class="flywheel-svg-wrap">
        <svg viewBox="-20 -20 530 530" aria-label="Bitcoin Financial Flywheel diagram">
          <defs>
            <filter id="eco-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="eco-glow-orange" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <!-- Center glow -->
          <circle cx={CX} cy={CY} r="82" fill="rgba(115,196,250,0.03)" stroke="rgba(115,196,250,0.08)" stroke-width="1"/>
          <circle cx={CX} cy={CY} r="54" fill="rgba(115,196,250,0.04)" stroke="rgba(115,196,250,0.06)" stroke-width="1"/>

          <!-- Center text -->
          <text x={CX} y={CY - 6} text-anchor="middle" dominant-baseline="middle" class="center-label">FLYWHEEL</text>
          <text x={CX} y={CY + 14} text-anchor="middle" dominant-baseline="middle" class="center-sub">self-reinforcing</text>

          <!-- Ring bg -->
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(115,196,250,0.07)" stroke-width="28"/>

          <!-- Arcs -->
          {#each arcPaths as arc, i}
            <path d={arc.d} fill="none" stroke={arc.color}
              stroke-width={activeNode === i ? 4 : 2.5}
              stroke-linecap="round"
              opacity={activeNode === i ? 1 : 0.6} />
          {/each}

          <!-- Nodes -->
          {#each nodePositions as node, i}
            <g>
              <!-- Outer halo — glow lives here, away from text -->
              <circle cx={node.x} cy={node.y} r="38"
                fill={node.color + (activeNode === i ? '30' : '18')}
                stroke={node.color + (activeNode === i ? '55' : '25')}
                stroke-width="1"
                filter={activeNode === i ? 'url(#eco-glow-strong)' : undefined} />
              <!-- Inner solid bg — no filter, opaque enough to block ring bleed -->
              <circle cx={node.x} cy={node.y} r="30"
                fill={activeNode === i ? '#0d1420' : '#0d1420'}
                stroke={activeNode === i ? node.color : node.color + '66'}
                stroke-width={activeNode === i ? 2 : 1.5}
                opacity="1" />
              <!-- Tinted overlay on top of solid bg -->
              <circle cx={node.x} cy={node.y} r="30"
                fill={node.color + (activeNode === i ? '30' : '18')}
                stroke="none" />
              <text x={node.x} y={node.y - 5} class="node-label" fill={activeNode === i ? '#fff' : node.color}>{node.label}</text>
              <text x={node.x} y={node.y + 12} class="node-sub" fill={activeNode === i ? '#fff' : node.color}>{node.sub}</text>
            </g>
          {/each}

          <!-- Traveling dot -->
          <circle r="7" fill="#F7931A" filter="url(#eco-glow-orange)">
            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
              <mpath href="#eco-ring-path"/>
            </animateMotion>
          </circle>
          <path id="eco-ring-path" d={ringPath} fill="none"/>
        </svg>
      </div>

      <div class="deflation-badge">
        <span class="deflation-arrow">&darr;</span>
        Deflationary Economics
      </div>
    </div>

  </div>

  <!-- Caption bar -->
  <div class="caption">
    <div class="caption-item"><strong>Bitcoin</strong> is the asset</div>
    <div class="caption-sep">&rarr;</div>
    <div class="caption-item"><strong>VerifiedX</strong> is the financial operating system</div>
    <div class="caption-sep">&rarr;</div>
    <div class="caption-item"><strong>Applications</strong> unlock financial activity</div>
  </div>
</div>

<style>
  /* ── Wrapper — fill the page wrap ── */
  .ecosystem-wrapper {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ── Two-column layout ── */
  .diagram {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  /* ── LEFT: Stack ── */
  .stack {
    display: flex;
    flex-direction: column;
  }

  .layer {
    position: relative;
    border-radius: 12px;
    padding: 18px 26px;
    border: 1px solid rgba(115,196,250,0.12);
    background: #0d1420;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .layer:hover {
    border-color: rgba(115,196,250,0.35);
    box-shadow: 0 0 20px rgba(115,196,250,0.1);
  }

  /* Layer variants */
  .layer-apps {
    border-color: rgba(131,157,219,0.3);
    background: linear-gradient(135deg, rgba(131,157,219,0.08) 0%, #0d1420 100%);
  }
  .layer-apps .layer-label { color: #839DDB; }

  .layer-finance {
    border-color: rgba(115,196,250,0.25);
    background: linear-gradient(135deg, rgba(115,196,250,0.06) 0%, #0d1420 100%);
  }
  .layer-finance .layer-label { color: #73C4FA; }

  .layer-vfx {
    border-color: rgba(115,196,250,0.4);
    background: linear-gradient(135deg, rgba(73,124,159,0.15) 0%, rgba(13,20,32,0.9) 100%);
    box-shadow: 0 0 30px rgba(115,196,250,0.08);
  }
  .layer-vfx .layer-label { color: #73C4FA; }

  .layer-btc {
    border-color: rgba(247,147,26,0.35);
    background: linear-gradient(135deg, rgba(247,147,26,0.08) 0%, #0d1420 100%);
  }
  .layer-btc .layer-label { color: #F7931A; }

  .layer-users {
    border-color: rgba(165,213,251,0.15);
    background: #0d1420;
    text-align: center;
  }

  .layer-label {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 10px;
    opacity: 0.7;
  }

  /* ── Chips — 25% larger ── */
  .chips {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    border: 1px solid;
    white-space: nowrap;
    line-height: 1;
  }
  .chip :global(svg),
  .chip :global(img) {
    flex-shrink: 0;
  }
  .chip-purple {
    background: rgba(131,157,219,0.1);
    border-color: rgba(131,157,219,0.3);
    color: #839DDB;
  }
  .chip-blue {
    background: rgba(115,196,250,0.08);
    border-color: rgba(115,196,250,0.25);
    color: #73C4FA;
  }

  /* ── Connectors ── */
  .connector {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    position: relative;
  }
  .connector::before {
    display: none;
  }
  .connector-arrow {
    position: relative;
    z-index: 1;
  }
  .connector-arrow :global(svg) {
    animation: pulse-arrow 2s ease-in-out infinite;
  }

  @keyframes pulse-arrow {
    0%, 100% { opacity: 0.4; transform: translateY(0); }
    50%      { opacity: 1;   transform: translateY(3px); }
  }

  /* ── VFX Network inner — scaled up ── */
  .vfx-inner {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .vfx-inner .cube {
    height: 56px;
    width: auto;
    filter: drop-shadow(0 0 10px rgba(115,196,250,0.5));
  }
  .vfx-inner .wordmark {
    height: 28px;
    width: auto;
    filter: drop-shadow(0 0 8px rgba(115,196,250,0.4));
  }

  /* ── Bitcoin inner — scaled up ── */
  .btc-inner {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .btc-icon {
    width: 46px;
    height: 46px;
    background: #F7931A;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 0 16px rgba(247,147,26,0.4);
    flex-shrink: 0;
    line-height: 1;
    padding-top: 2px;
    padding-left: 2px;
  }
  .btc-text {
    font-size: 20px;
    font-weight: 700;
    color: #F7931A;
    letter-spacing: 0.04em;
  }
  .btc-sub {
    font-size: 14px;
    color: rgba(247,147,26,0.55);
    font-weight: 400;
  }

  /* ── Users row — scaled up ── */
  .users-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
  .user-icon {
    opacity: 0.6;
  }
  .users-label {
    font-size: 15px;
    color: #A5D5FB;
    font-weight: 500;
    opacity: 0.7;
    text-align: center;
    margin-top: 8px;
  }

  /* ── RIGHT: Flywheel — ~2x larger ── */
  .flywheel-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  .flywheel-title {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #497C9F;
    text-align: center;
  }
  .flywheel-title span { color: #73C4FA; }

  .flywheel-svg-wrap {
    width: 624px;
    height: 624px;
  }
  .flywheel-svg-wrap :global(svg) {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .center-label {
    font-family: 'Mukta', 'Inter Variable', sans-serif;
    font-size: 16px;
    font-weight: 700;
    fill: #73C4FA;
    opacity: 0.7;
  }
  .center-sub {
    font-family: 'Mukta', 'Inter Variable', sans-serif;
    font-size: 12px;
    font-weight: 400;
    fill: #497C9F;
    opacity: 0.8;
  }
  .node-label {
    font-family: 'Mukta', 'Inter Variable', sans-serif;
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
    letter-spacing: 0.03em;
  }
  .node-sub {
    font-family: 'Mukta', 'Inter Variable', sans-serif;
    font-size: 9.5px;
    font-weight: 400;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
    opacity: 0.6;
  }

  .deflation-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 20px;
    background: rgba(247,147,26,0.08);
    border: 1px solid rgba(247,147,26,0.25);
    font-size: 14px;
    font-weight: 600;
    color: #F7931A;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .deflation-arrow {
    font-size: 16px;
  }

  /* ── Caption bar — larger text ── */
  .caption {
    margin-top: 48px;
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
  }
  .caption-item {
    font-size: 15px;
    color: rgba(232,237,245,0.55);
    font-weight: 400;
    letter-spacing: 0.06em;
    padding: 10px 22px;
    border-radius: 24px;
    background: rgba(115,196,250,0.04);
    border: 1px solid rgba(115,196,250,0.15);
    box-shadow: 0 0 16px rgba(115,196,250,0.06), inset 0 0 12px rgba(115,196,250,0.03);
  }
  .caption-item :global(strong) {
    color: rgba(232,237,245,0.85);
    font-weight: 600;
  }
  .caption-sep {
    font-size: 18px;
    color: rgba(115,196,250,0.35);
    display: flex;
    align-items: center;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .diagram { grid-template-columns: 1fr; }
    .flywheel-svg-wrap { width: 500px; height: 500px; }
  }
  @media (max-width: 480px) {
    .flywheel-svg-wrap { width: 384px; height: 384px; }
    .chip { font-size: 13px; padding: 6px 12px; }
    .layer-label { font-size: 12px; }
    .caption { gap: 16px; }
    .caption-item, .caption-sep { font-size: 13px; }
  }
</style>
