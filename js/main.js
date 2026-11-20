// Overbay.app — Progressive enhancement for navigation, tabs, and code copy buttons.

document.addEventListener('DOMContentLoaded', () => {
  // Sticky header hairline border on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  // Mobile navigation drawer
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (toggleBtn && drawer) {
    const closeDrawer = (restoreFocus = false) => {
      if (!drawer.classList.contains('is-open')) return;
      drawer.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (restoreFocus) toggleBtn.focus();
    };

    toggleBtn.addEventListener('click', () => {
      const open = drawer.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(open));
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeDrawer());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer(true);
    });

    document.addEventListener('click', (e) => {
      if (header && !header.contains(e.target)) closeDrawer();
    });

    const desktopMedia = window.matchMedia('(min-width: 921px)');
    const onBreakpointChange = (e) => {
      if (e.matches) closeDrawer();
    };
    if (typeof desktopMedia.addEventListener === 'function') {
      desktopMedia.addEventListener('change', onBreakpointChange);
    } else if (typeof desktopMedia.addListener === 'function') {
      desktopMedia.addListener(onBreakpointChange);
    }
  }

  // Tabbed stages (Home 4-app stage + Luma Reader screenshots)
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
    const panelIds = tabs.map((t) => t.getAttribute('aria-controls')).filter(Boolean);
    const panels = panelIds.map((id) => document.getElementById(id)).filter(Boolean);

    const activate = (tab) => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
      });
      const targetId = tab.getAttribute('aria-controls');
      panels.forEach((p) => {
        p.hidden = p.id !== targetId;
      });
    };

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (e) => {
        let next = null;
        if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next === null) return;
        e.preventDefault();
        tabs[next].focus();
        activate(tabs[next]);
      });
    });
  });

  // Copy buttons for code blocks
  document.querySelectorAll('[data-copy-target]').forEach((btn) => {
    const defaultLabel = btn.textContent.trim() || 'Copy';
    let resetTimer = null;

    btn.addEventListener('click', async () => {
      const target = document.getElementById(btn.getAttribute('data-copy-target'));
      if (!target) return;
      const text = target.textContent.trim();
      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch {
          copied = false;
        }
      }

      if (!copied) {
        const area = document.createElement('textarea');
        area.className = 'sr-copy-area';
        area.value = text;
        area.setAttribute('readonly', '');
        document.body.appendChild(area);
        area.select();
        try {
          copied = document.execCommand('copy');
        } catch {
          copied = false;
        } finally {
          document.body.removeChild(area);
        }
      }

      if (!copied && window.getSelection && document.createRange) {
        try {
          const range = document.createRange();
          range.selectNodeContents(target);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } catch {
          // Ignore selection errors in restricted frames
        }
      }

      clearTimeout(resetTimer);
      btn.textContent = copied ? 'Copied' : 'Select text';
      resetTimer = setTimeout(() => {
        btn.textContent = defaultLabel;
      }, 1800);
    });
  });
});
