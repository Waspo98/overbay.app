// Overbay.app — Progressive enhancement only.
// All text, links, and tables remain 100% readable without JavaScript.

document.addEventListener('DOMContentLoaded', () => {
  // Sticky header border on scroll
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
    toggleBtn.addEventListener('click', () => {
      const open = drawer.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(open));
    });
  }

  // Tabbed specimen stages (Home 4-app stage + Luma Reader screenshot tabs)
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
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
          tabs[next].focus();
          activate(tabs[next]);
        }
      });
    });
  });

  // One-click copy buttons for Docker / git code boxes
  document.querySelectorAll('[data-copy-target]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const target = document.getElementById(btn.getAttribute('data-copy-target'));
      if (!target) return;
      const text = target.textContent.trim();
      const original = btn.textContent;
      let copied = false;
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.left = '-9999px';
        document.body.appendChild(area);
        area.select();
        copied = document.execCommand('copy');
        document.body.removeChild(area);
      }
      btn.textContent = copied ? 'Copied' : 'Select text';
      setTimeout(() => {
        btn.textContent = original;
      }, 1800);
    });
  });
});
