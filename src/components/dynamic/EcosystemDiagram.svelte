<script>
  import { onMount, onDestroy } from 'svelte';

  // Import local assets — Astro wraps these as { src, width, height } objects
  import cubeGifMeta from '../../assets/images/cube.gif';
  import wordmarkMeta from '../../assets/images/vfx-wordmark-light-no-cube.png';
  import vbtcMeta from '../../assets/images/vbtc.jpg';

  // Extract the URL string
  const cubeGif = typeof cubeGifMeta === 'string' ? cubeGifMeta : cubeGifMeta.src;
  const wordmarkImg = typeof wordmarkMeta === 'string' ? wordmarkMeta : wordmarkMeta.src;
  const vbtcImg = typeof vbtcMeta === 'string' ? vbtcMeta : vbtcMeta.src;

  // ── Flywheel config (scaled up) ──
  const CX = 245, CY = 245, R = 175;

  const fwNodes = [
    { label: 'Bitcoin',    sub: 'Deposits',     color: '#f7931a', angle: -90  },
    { label: 'vBTC',       sub: 'Minting',      color: '#73C4FA', angle: -30  },
    { label: 'Financial',  sub: 'Activity',     color: '#a78bfa', angle: 30   },
    { label: 'Liquidity',  sub: 'Growth',       color: '#34d399', angle: 90   },
    { label: 'More',       sub: 'Applications', color: '#73C4FA', angle: 150  },
    { label: 'More',       sub: 'Users',        color: '#a78bfa', angle: -150 },
  ];

  function toRad(deg) { return deg * Math.PI / 180; }

  // ── Color interpolation for traveling dot ──
  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }
  function lerpColor(hexA, hexB, t) {
    const a = hexToRgb(hexA), b = hexToRgb(hexB);
    return rgbToHex(
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t)
    );
  }

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

  const CYCLE_DURATION = 6; // seconds — one node per second, 6 nodes

  let activeNode = 0;
  let dotCx = CX + R * Math.cos(toRad(-90));
  let dotCy = CY + R * Math.sin(toRad(-90));
  let dotColor = fwNodes[0].color;
  let centerGlow = fwNodes[0].color;
  let rafId;
  let layers = [];

  onMount(() => {
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

    // Unified animation loop — drives dot position, dot color, and node highlighting
    const startTime = performance.now();
    function tick(now) {
      const elapsed = (now - startTime) / 1000;
      const cycleFraction = elapsed % CYCLE_DURATION;

      // Active node highlight + center glow color
      activeNode = Math.floor(cycleFraction) % fwNodes.length;
      centerGlow = fwNodes[activeNode].color;

      // Dot position
      const angleDeg = -90 + (cycleFraction / CYCLE_DURATION) * 360;
      const angleRad = toRad(angleDeg);
      dotCx = CX + R * Math.cos(angleRad);
      dotCy = CY + R * Math.sin(angleRad);

      // Dot color — lerp between current and next node
      const nodeIdx = Math.floor(cycleFraction) % fwNodes.length;
      const nextIdx = (nodeIdx + 1) % fwNodes.length;
      const t = cycleFraction - Math.floor(cycleFraction);
      dotColor = lerpColor(fwNodes[nodeIdx].color, fwNodes[nextIdx].color, t);

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
  });
</script>

<div class="ecosystem-wrapper">
  <div class="diagram">

    <!-- LEFT: Architecture Stack -->
    <div class="stack">

      <!-- Bitcoin Layer -->
      <div class="layer layer-btc">
        <div class="layer-label">Global Asset</div>
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

      <!-- VerifiedX Network Layer -->
      <div class="layer layer-vfx">
        <div class="layer-label">VerifiedX Network</div>
        <div class="vfx-inner">
          <img class="cube" src={cubeGif} alt="" width="56" height="56" />
          <img class="wordmark" src={wordmarkImg} alt="VerifiedX" height="28" />
        </div>
        <div class="vfx-sub">The Financial Operating System</div>
      </div>

      <!-- Connector (blue) -->
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

      <!-- Connector (blue) -->
      <div class="connector">
        <div class="connector-arrow">
          <svg viewBox="0 0 20 20" fill="none" width="22" height="22"><path d="M10 2v14M4 11l6 7 6-7" stroke="#73C4FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>

      <!-- Applications Layer -->
      <div class="layer layer-apps">
        <div class="layer-label">Applications</div>
        <div class="chips">
          <div class="chip chip-purple">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 12C10 8 6 5 3 6c0 3 2 6 5 7.5C6 15 5 17 5 19c2.5 0 5-2 7-4.5 2 2.5 4.5 4.5 7 4.5 0-2-1-4-3-5.5C19 12 21 9 21 6c-3-1-7 2-9 6z" fill="currentColor"/></svg>
            Butterfly
          </div>
          <div class="chip chip-purple">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M16 13a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" fill="currentColor"/><path d="M2 9h20" stroke="currentColor" stroke-width="1.5"/></svg>
            SwitchBlade
          </div>
          <div class="chip chip-purple">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.6"/></svg>
            PulseXAI
          </div>
        </div>
      </div>

      <!-- Connector (blue) -->
      <div class="connector">
        <div class="connector-arrow">
          <svg viewBox="0 0 20 20" fill="none" width="22" height="22"><path d="M10 2v14M4 11l6 7 6-7" stroke="#73C4FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
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
      <div class="flywheel-svg-wrap">
        <svg viewBox="-20 -20 530 530" aria-label="Bitcoin Financial Flywheel diagram">
          <defs>
            <filter id="eco-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="eco-glow-dot" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <!-- Center glow -->
          <circle cx={CX} cy={CY} r="90" class="center-pulse-outer"
            style:fill={centerGlow + '10'}
            style:stroke={centerGlow + '20'}
            stroke-width="1.5"
            style:transition="fill 0.6s ease, stroke 0.6s ease" />
          <circle cx={CX} cy={CY} r="62" class="center-pulse-inner"
            fill="rgba(255,255,255,0.09)"
            stroke="rgba(255,255,255,0.18)"
            stroke-width="1" />

          <!-- Center cube (blend mode on foreignObject so it composites against SVG bg) -->
          <foreignObject x={CX - 44} y={CY - 44} width="88" height="88" style="mix-blend-mode: screen;">
            <img src={cubeGif} alt="VFX" width="88" height="88" style="display: block;" />
          </foreignObject>

          <!-- Ring bg -->
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(115,196,250,0.07)" stroke-width="28"/>

          <!-- Arcs -->
          {#each arcPaths as arc, i}
            <path d={arc.d} fill="none" stroke={arc.color}
              stroke-linecap="round"
              style:stroke-width={activeNode === i ? 4 : 2.5}
              style:opacity={activeNode === i ? 1 : 0.6}
              style:transition="stroke-width 0.4s ease, opacity 0.4s ease" />
          {/each}

          <!-- Traveling dot (before nodes so it renders underneath them) -->
          <circle r="7" cx={dotCx} cy={dotCy} fill={dotColor} filter="url(#eco-glow-dot)" />

          <!-- Nodes -->
          {#each nodePositions as node, i}
            <g>
              <!-- Outer halo — glow lives here, away from text -->
              <circle cx={node.x} cy={node.y} r="38"
                stroke-width="1"
                filter={activeNode === i ? 'url(#eco-glow-strong)' : undefined}
                style:fill={node.color + (activeNode === i ? '30' : '18')}
                style:stroke={node.color + (activeNode === i ? '55' : '25')}
                style:transition="fill 0.4s ease, stroke 0.4s ease" />
              <!-- Inner solid bg — no filter, opaque enough to block ring bleed -->
              <circle cx={node.x} cy={node.y} r="30"
                fill="#0d1420"
                opacity="1"
                style:stroke={activeNode === i ? node.color : node.color + '66'}
                style:stroke-width={activeNode === i ? 2 : 1.5}
                style:transition="stroke 0.4s ease, stroke-width 0.4s ease" />
              <!-- Tinted overlay on top of solid bg -->
              <circle cx={node.x} cy={node.y} r="30"
                stroke="none"
                style:fill={node.color + (activeNode === i ? '30' : '18')}
                style:transition="fill 0.4s ease" />
              <text x={node.x} y={node.y - 5} class="node-label"
                style:fill={activeNode === i ? '#fff' : node.color}
                style:transition="fill 0.4s ease">{node.label}</text>
              <text x={node.x} y={node.y + 12} class="node-sub"
                style:fill={activeNode === i ? '#fff' : node.color}
                style:transition="fill 0.4s ease">{node.sub}</text>
            </g>
          {/each}
        </svg>
      </div>
    </div>

  </div>

  <!-- Caption bar -->
  <div class="caption">
    <div class="caption-item caption-orange"><strong>Bitcoin</strong> is the asset</div>
    <div class="caption-sep">
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20" class="arrow-pulse arrow-pulse-1"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="caption-item caption-blue"><strong>VerifiedX</strong> is the financial operating system</div>
    <div class="caption-sep">
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20" class="arrow-pulse arrow-pulse-2"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="caption-item caption-purple"><strong>Applications</strong> unlock financial activity</div>
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
    background: #000;
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
    mix-blend-mode: screen;
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

  .vfx-sub {
    font-size: 14px;
    color: rgba(115,196,250,0.55);
    font-weight: 400;
    margin-top: 6px;
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
  .flywheel-svg-wrap {
    width: 624px;
    height: 624px;
  }
  .flywheel-svg-wrap :global(svg) {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .center-pulse-outer {
    animation: center-glow-outer 3s ease-in-out infinite;
    transition: fill 0.6s ease, stroke 0.6s ease;
  }
  .center-pulse-inner {
    animation: center-glow-inner 3s ease-in-out infinite;
    transition: fill 0.6s ease, stroke 0.6s ease;
  }

  @keyframes center-glow-outer {
    0%, 100% { opacity: 0.4; }
    50%      { opacity: 0.9; }
  }
  @keyframes center-glow-inner {
    0%, 100% { opacity: 0.5; }
    50%      { opacity: 1; }
  }

  .center-stack {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }
  .center-stack > * {
    grid-area: 1 / 1;
  }
  .center-badge {
    font-family: 'Mukta', 'Inter Variable', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    padding-right: 8px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.85);
    background: rgba(13, 20, 32, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 3px 10px;
    text-align: center;
    white-space: nowrap;
    width: fit-content;
    margin: 0 auto;
    backdrop-filter: blur(4px);
    z-index: 1;
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


  /* ── Caption bar — larger text ── */
  .caption {
    margin-top: 48px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .caption-item {
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.06em;
    padding: 10px 22px;
    border-radius: 24px;
    border: 1px solid;
    /* animation set per-color class */
  }
  .caption-item :global(strong) {
    font-weight: 600;
  }

  /* Orange badge */
  .caption-orange {
    color: rgba(247, 147, 26, 0.85);
    border-color: rgba(247, 147, 26, 0.3);
    background: rgba(247, 147, 26, 0.06);
    animation: glow-orange 6s ease-in-out infinite;
  }
  .caption-orange :global(strong) { color: #F7931A; }

  /* Blue badge */
  .caption-blue {
    color: rgba(115, 196, 250, 0.85);
    border-color: rgba(115, 196, 250, 0.3);
    background: rgba(115, 196, 250, 0.06);
    animation: glow-blue 6s ease-in-out 2s infinite;
  }
  .caption-blue :global(strong) { color: #73C4FA; }

  /* Purple badge */
  .caption-purple {
    color: rgba(167, 139, 250, 0.85);
    border-color: rgba(167, 139, 250, 0.3);
    background: rgba(167, 139, 250, 0.06);
    animation: glow-purple 6s ease-in-out 4s infinite;
  }
  .caption-purple :global(strong) { color: #a78bfa; }

  @keyframes glow-orange {
    0%, 100% {
      opacity: 0.75;
      box-shadow: 0 0 20px rgba(0,0,0,0), 0 0 48px rgba(0,0,0,0), inset 0 0 16px rgba(0,0,0,0);
    }
    50% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(247,147,26,0.2), 0 0 48px rgba(247,147,26,0.1), inset 0 0 16px rgba(247,147,26,0.06);
    }
  }
  @keyframes glow-blue {
    0%, 100% {
      opacity: 0.75;
      box-shadow: 0 0 20px rgba(0,0,0,0), 0 0 48px rgba(0,0,0,0), inset 0 0 16px rgba(0,0,0,0);
    }
    50% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(115,196,250,0.2), 0 0 48px rgba(115,196,250,0.1), inset 0 0 16px rgba(115,196,250,0.06);
    }
  }
  @keyframes glow-purple {
    0%, 100% {
      opacity: 0.75;
      box-shadow: 0 0 20px rgba(0,0,0,0), 0 0 48px rgba(0,0,0,0), inset 0 0 16px rgba(0,0,0,0);
    }
    50% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(167,139,250,0.2), 0 0 48px rgba(167,139,250,0.1), inset 0 0 16px rgba(167,139,250,0.06);
    }
  }
  /* Pulsing arrows */
  .caption-sep {
    display: flex;
    align-items: center;
  }
  .arrow-pulse {
    animation: arrow-shuttle 2s ease-in-out infinite;
  }
  .arrow-pulse-1 {
    color: #F7931A;
    filter: drop-shadow(0 0 4px rgba(247, 147, 26, 0.5));
    animation-delay: 0.5s;
  }
  .arrow-pulse-2 {
    color: #73C4FA;
    filter: drop-shadow(0 0 4px rgba(115, 196, 250, 0.5));
    animation-delay: 1.5s;
  }

  @keyframes arrow-shuttle {
    0%, 100% {
      transform: translateX(0);
      opacity: 0.4;
    }
    50% {
      transform: translateX(5px);
      opacity: 1;
    }
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
