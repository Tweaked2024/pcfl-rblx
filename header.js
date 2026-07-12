// =========================================================================
// SITE DYNAMIC HEADER RENDERING ENGINE
// =========================================================================

(function renderSiteHeader() {
  var headerContainer = document.getElementById('site-header');
  if (!headerContainer) return;

  // 1. Inject styling directly to ensure visibility above home-grid layers
  var style = document.createElement('style');
  style.textContent = `
    .primary-header {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      height: 70px !important;
      background-color: #ffffff !important;
      border-bottom: 1px solid #e5e7eb !important;
      z-index: 999999 !important;
      display: block !important;
    }
    
    html.dark-mode .primary-header {
      background-color: #0f0f12 !important;
      border-bottom-color: #24242b !important;
    }

    .nav-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
      padding: 0 1.5rem;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }

    .logo-black img {
      height: 32px;
      width: auto;
      display: block;
    }

    .primary-navigation {
      display: flex !important;
      align-items: center !important;
      gap: 2rem;
    }

    .nav-list {
      list-style: none !important;
      margin: 0 !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      gap: 1.5rem !important;
    }

    .nav-link {
      text-decoration: none !important;
      font-weight: 600 !important;
      font-size: 0.95rem !important;
      color: #111111 !important;
      text-transform: lowercase !important;
    }

    html.dark-mode .nav-link {
      color: #f3f4f6 !important;
    }

    .button {
      background-color: #e91c34 !important;
      color: #ffffff !important;
      text-decoration: none !important;
      padding: 0.5rem 1.2rem !important;
      border-radius: 6px !important;
      font-weight: 700 !important;
      font-size: 0.9rem !important;
      text-transform: lowercase !important;
    }
  `;
  document.head.appendChild(style);

  // 2. Structural markup layout injection
  headerContainer.innerHTML = `
    <header class="primary-header">
      <div class="nav-wrapper">
        <a href="/" class="logo-black">
          <img src="/images/afltypeblack.png" alt="logo" onerror="this.style.display='none'; this.parentNode.innerHTML='<b style=\\'font-size:1.2rem;color:inherit;text-transform:uppercase;\\'>AFL</b>'">
        </a>
        
        <nav class="primary-navigation" id="primary-navigation" aria-label="Primary">
          <ul role="list" class="nav-list">
            <li><a class="nav-link" href="/mainpages/standings/" data-section="standings">standings</a></li>
            <li><a class="nav-link" href="/teams/" data-section="teams">teams</a></li>
            <li><a class="nav-link" href="/scores/scores12/" data-section="scores">scores</a></li>
            <li><a class="nav-link" href="/stats/qb/" data-section="stats">stats</a></li>
            <li><a class="nav-link" href="/mainpages/rulebook/" data-section="rulebook">rulebook</a></li>
            <li><a class="nav-link" href="/mainpages/legacy/legacyscores/" data-section="legacy">legacy</a></li>
          </ul>
          
          <div id="theme-toggle-container" style="display: flex; align-items: center; margin-left: 1.5rem;">
            <div id="theme-toggle-placeholder"></div>
            <a href="https://discord.gg/afl" class="button">join now</a>
          </div>
        </nav>
      </div>
    </header>
  `;

  // 3. Highlight the active link selector state matching window location path paths
  var path = window.location.pathname;
  var sections = [
    { name: 'standings', test: /^\/mainpages\/standings/ },
    { name: 'teams', test: /^\/(teams|team)(\/|$)/ },
    { name: 'scores', test: /^\/(scores|matchup)(\/|$)/ },
    { name: 'stats', test: /^\/(stats|player|alltime)(\/|$)/ },
    { name: 'rulebook', test: /^\/mainpages\/rulebook/ },
    { name: 'legacy', test: /^\/(mainpages\/legacy|mainpages\/awards|docs)(\/|$)/ }
  ];
  
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].test.test(path)) {
      var activeLink = headerContainer.querySelector('.nav-link[data-section="' + sections[i].name + '"]');
      if (activeLink) activeLink.classList.add('is-active');
      break;
    }
  }

  // 4. Inject theme toggle switch mechanism dynamically inside layout container frame
  var placeholder = document.getElementById('theme-toggle-placeholder');
  if (placeholder) {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle theme color dark/light mode');
    btn.style.background = 'none';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.padding = '8px';
    btn.style.marginRight = '12px';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.color = 'inherit';

    btn.innerHTML = `
      <svg class="icon-theme" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path class="path-moon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        <path class="path-sun" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
      </svg>
    `;
    
    placeholder.parentNode.replaceChild(btn, placeholder);

    function updateToggleVisibility() {
      var isDark = document.documentElement.classList.contains('dark-mode');
      var sunPath = btn.querySelector('.path-sun');
      var moonPath = btn.querySelector('.path-moon');
      if (sunPath && moonPath) {
        sunPath.style.display = isDark ? 'block' : 'none';
        moonPath.style.display = isDark ? 'none' : 'block';
      }
    }

    updateToggleVisibility();

    btn.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark-mode');
      localStorage.setItem('afl-theme', document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light');
      updateToggleVisibility();
    });
  }
})();
