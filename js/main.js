// Overbay.app — Progressive enhancement for navigation, choreographed stages,
// interactive specimens, hardware depth, smooth disclosures, and copy buttons.

(() => {
  const root = document.documentElement;
  root.classList.add('has-js');

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  const prefersReduced = () => reducedMotionQuery.matches;
  const hasFinePointer = () => finePointerQuery.matches;

  const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function createCheckSvg(className) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 12 12');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    if (className) svg.setAttribute('class', className);
    const poly = document.createElementNS(SVG_NS, 'polyline');
    poly.setAttribute('points', '2.5 6.5 5 9 9.5 3.5');
    svg.appendChild(poly);
    return svg;
  }

  // Smooth number settle for Orbit Money balances (exact cents, tabular-nums)
  const activeBalanceAnims = new WeakMap();
  function rollBalance(el) {
    if (!el) return;
    const raw = (el.dataset.targetValue || el.textContent).trim();
    el.dataset.targetValue = raw;
    if (prefersReduced()) {
      el.textContent = raw;
      return;
    }
    const match = raw.match(/^([^0-9-]*)(-?[\d,]+(?:\.(\d+))?)(.*)$/);
    if (!match) return;
    const prefix = match[1];
    const numericTarget = parseFloat(match[2].replace(/,/g, ''));
    const decimals = match[3] ? match[3].length : 0;
    const suffix = match[4];
    if (!Number.isFinite(numericTarget)) return;

    const prevId = activeBalanceAnims.get(el);
    if (prevId) cancelAnimationFrame(prevId);

    const startVal = numericTarget * 0.88;
    const duration = 540;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const val = startVal + (numericTarget - startVal) * eased;
      el.textContent =
        prefix +
        val.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;
      if (t < 1) {
        activeBalanceAnims.set(el, requestAnimationFrame(step));
      } else {
        el.textContent = raw;
        activeBalanceAnims.delete(el);
      }
    };
    activeBalanceAnims.set(el, requestAnimationFrame(step));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const isLegalPage = Boolean(document.querySelector('.legal-main'));

    // ── 1. Sticky header state + architectural scroll progress hairline ──
    const header = document.querySelector('.site-header');
    if (header) {
      const progressBar = document.createElement('span');
      progressBar.className = 'scroll-progress';
      progressBar.setAttribute('aria-hidden', 'true');
      header.appendChild(progressBar);

      let scrollTicking = false;
      const syncScroll = () => {
        scrollTicking = false;
        const y = window.scrollY;
        header.classList.toggle('is-scrolled', y > 12);
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const ratio = Math.min(1, Math.max(0, y / maxScroll));
        progressBar.style.setProperty('--scroll-progress', ratio.toFixed(4));
      };
      syncScroll();
      const requestSync = () => {
        if (!scrollTicking) {
          scrollTicking = true;
          requestAnimationFrame(syncScroll);
        }
      };
      window.addEventListener('scroll', requestSync, { passive: true });
      window.addEventListener('resize', requestSync, { passive: true });
    }

    // ── 2. Mobile navigation drawer ──
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

    // ── 3. Sliding Pill Indicator & Directional Choreographed Tabs ──
    document.querySelectorAll('[data-tabs]').forEach((group) => {
      const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
      if (!tabs.length) return;
      const panelIds = tabs.map((t) => t.getAttribute('aria-controls')).filter(Boolean);
      const panels = panelIds.map((id) => document.getElementById(id)).filter(Boolean);
      const stageContainer = panels[0] ? panels[0].closest('.gallery-stage') : null;

      // Sliding background pill indicator
      const indicator = document.createElement('span');
      indicator.className = 'tab-indicator is-instant';
      indicator.setAttribute('aria-hidden', 'true');
      group.prepend(indicator);
      group.classList.add('has-tab-indicator');

      const positionIndicator = (activeTab, instant = false) => {
        if (!activeTab) return;
        if (instant) indicator.classList.add('is-instant');
        indicator.style.setProperty('--ind-x', `${activeTab.offsetLeft}px`);
        indicator.style.setProperty('--ind-y', `${activeTab.offsetTop}px`);
        indicator.style.setProperty('--ind-w', `${activeTab.offsetWidth}px`);
        indicator.style.setProperty('--ind-h', `${activeTab.offsetHeight}px`);
        if (instant) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => indicator.classList.remove('is-instant'));
          });
        }
      };

      let activeIdx = Math.max(
        0,
        tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true')
      );
      positionIndicator(tabs[activeIdx], true);

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => positionIndicator(tabs[activeIdx], true));
      }
      if (typeof ResizeObserver === 'function') {
        const ro = new ResizeObserver(() => positionIndicator(tabs[activeIdx], true));
        ro.observe(group);
      } else {
        window.addEventListener('resize', () => positionIndicator(tabs[activeIdx], true), { passive: true });
      }

      let stageHeightAnim = null;

      const animatePanelIn = (panel, dir) => {
        if (!panel || prefersReduced() || typeof panel.animate !== 'function') return;

        // Home stage panel choreography (copy + devices/specimen)
        const copy = panel.querySelector('.stage-copy');
        const visuals = panel.querySelector('.stage-visuals');
        if (copy && visuals) {
          copy.animate(
            [
              { opacity: 0, transform: `translate3d(${dir * 14}px, 0, 0)` },
              { opacity: 1, transform: 'translate3d(0, 0, 0)' },
            ],
            { duration: 340, easing: EASE_OUT_EXPO, fill: 'backwards' }
          );

          const visualItems = Array.from(visuals.children);
          visualItems.forEach((child, i) => {
            child.animate(
              [
                { opacity: 0, transform: `translate3d(${dir * 24}px, 4px, 0) scale(0.985)` },
                { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
              ],
              {
                duration: 420,
                delay: 45 + i * 65,
                easing: EASE_OUT_EXPO,
                fill: 'backwards',
              }
            );
          });
          return;
        }

        // Luma Reader screenshot stage choreography
        const children = Array.from(panel.children);
        children.forEach((child, i) => {
          child.animate(
            [
              { opacity: 0, transform: `translate3d(${dir * 18}px, 0, 0) scale(0.985)` },
              { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
            ],
            {
              duration: 380,
              delay: i * 50,
              easing: EASE_OUT_EXPO,
              fill: 'backwards',
            }
          );
        });
      };

      const activate = (tab) => {
        const nextIdx = tabs.indexOf(tab);
        if (nextIdx === -1 || nextIdx === activeIdx) return;
        const dir = nextIdx > activeIdx ? 1 : -1;
        activeIdx = nextIdx;

        positionIndicator(tab, prefersReduced());

        let oldHeight = null;
        if (stageContainer && !prefersReduced() && typeof stageContainer.animate === 'function') {
          if (stageHeightAnim) {
            stageHeightAnim.cancel();
            stageHeightAnim = null;
          }
          oldHeight = stageContainer.getBoundingClientRect().height;
        }

        tabs.forEach((t) => {
          const selected = t === tab;
          t.setAttribute('aria-selected', String(selected));
          t.tabIndex = selected ? 0 : -1;
        });

        const targetId = tab.getAttribute('aria-controls');
        let shownPanel = null;
        panels.forEach((p) => {
          const isTarget = p.id === targetId;
          p.hidden = !isTarget;
          if (isTarget) shownPanel = p;
        });

        if (stageContainer && oldHeight !== null) {
          const newHeight = stageContainer.getBoundingClientRect().height;
          if (Math.abs(newHeight - oldHeight) > 2) {
            stageHeightAnim = stageContainer.animate(
              [{ height: `${oldHeight}px` }, { height: `${newHeight}px` }],
              { duration: 360, easing: EASE_OUT_EXPO }
            );
            stageHeightAnim.onfinish = () => {
              stageHeightAnim = null;
            };
          }
        }

        animatePanelIn(shownPanel, dir);

        if (shownPanel) {
          // Trigger Orbit balance precision roll when panel opens
          const bal = shownPanel.querySelector('.orbit-balance-val');
          if (bal) rollBalance(bal);
          // Re-measure Twitter underline bar once visible
          const twSync = shownPanel.querySelector('.twitter-mock-tabs');
          if (twSync && typeof twSync._syncBar === 'function') {
            twSync._syncBar(true);
          }
        }
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

    // ── 4. Interactive Living UI Specimens ──

    // 4a. AllNotes interactive checklist + notebook switcher
    const ALLNOTES_PAGES = {
      Personal: {
        title: 'Weekend Reading List',
        calloutLabel: 'Queue:',
        calloutText: 'Keep two offline EPUBs downloaded before Friday\'s flight.',
        tasks: [
          { text: 'Finish chapter 14 in Luma Reader', done: true },
          { text: 'Return library hardcovers', done: true },
          { text: 'Jot notes for book club', done: false },
        ],
      },
      Home: {
        title: 'Spring Maintenance',
        calloutLabel: 'Schedule:',
        calloutText: 'Swap HVAC filters every 90 days and check gutter downspouts.',
        tasks: [
          { text: 'Replace 20x25x1 furnace filter', done: true },
          { text: 'Flush water heater valve', done: false },
          { text: 'Test smoke alarm batteries', done: false },
        ],
      },
      'Taxes 2026': {
        title: '2026 Tax Folder',
        calloutLabel: 'Filing:',
        calloutText: 'Keep exported PDFs in local storage; no cloud upload needed.',
        tasks: [
          { text: 'Save W-2 and 1099-INT copies', done: true },
          { text: 'Export property tax receipt', done: true },
          { text: 'Confirm estimated payment dates', done: false },
        ],
      },
      Recipes: {
        title: 'Cast-Iron Skillet Chili',
        calloutLabel: 'Tip:',
        calloutText: 'Toast whole cumin and chili powder for 45 seconds before adding broth.',
        tasks: [
          { text: 'Brown ground beef & diced onion', done: true },
          { text: 'Simmer 35 minutes uncovered', done: false },
          { text: 'Top with sharp cheddar & scallions', done: false },
        ],
      },
      Work: {
        title: 'Release Checklist',
        calloutLabel: 'Build:',
        calloutText: 'Verify clean offline startup and Play Store privacy links.',
        tasks: [
          { text: 'Run local SQLite migration test', done: true },
          { text: 'Tag APK release artifact', done: false },
        ],
      },
      'Book Notes': {
        title: 'Chapter Highlights',
        calloutLabel: 'Idea:',
        calloutText: 'Tools age best when files stay plain, local, and easy to export.',
        tasks: [
          { text: 'Summarize part two takeaways', done: true },
          { text: 'Pull favorite quotes into section', done: false },
        ],
      },
    };

    const bindChecklistItems = (rootEl) => {
      rootEl.querySelectorAll('.notes-checklist li').forEach((li) => {
        const box = li.querySelector('.check-box');
        if (!box) return;
        if (!box.querySelector('svg')) {
          box.appendChild(createCheckSvg());
        }
        const checked = box.classList.contains('is-checked');
        li.classList.toggle('is-done', checked);
        li.setAttribute('role', 'checkbox');
        li.setAttribute('aria-checked', String(checked));
        li.tabIndex = 0;

        const toggle = () => {
          const next = !box.classList.contains('is-checked');
          box.classList.toggle('is-checked', next);
          li.classList.toggle('is-done', next);
          li.setAttribute('aria-checked', String(next));
          if (next && !prefersReduced()) {
            box.classList.remove('is-pop');
            void box.offsetWidth;
            box.classList.add('is-pop');
          }
        };

        li.addEventListener('click', toggle);
        li.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggle();
          }
        });
      });
    };

    document.querySelectorAll('.ui-specimen').forEach((specimen) => {
      // AllNotes specimen
      const notesLayout = specimen.querySelector('.notes-mock-layout');
      if (notesLayout) {
        const railItems = Array.from(notesLayout.querySelectorAll('.notes-mock-item'));
        const page = notesLayout.querySelector('.notes-mock-page');
        const barTitle = specimen.querySelector('.specimen-app-label > span');
        const tag = specimen.querySelector('.ui-specimen__tag');
        if (tag) {
          tag.textContent = 'Interactive preview';
          tag.classList.add('is-interactive');
        }

        // Preserve default page DOM snapshot for the initially active tab
        const defaultItem = railItems.find((i) => i.classList.contains('is-active'));
        const defaultName = defaultItem ? defaultItem.textContent.trim() : '';
        const defaultSnapshot = page ? page.cloneNode(true) : null;
        const savedStates = new Map();
        if (defaultName && defaultSnapshot) {
          savedStates.set(defaultName, defaultSnapshot);
        }

        bindChecklistItems(notesLayout);

        const buildNotePage = (name) => {
          const data = ALLNOTES_PAGES[name];
          if (!data) return null;
          const wrap = document.createElement('div');
          const title = document.createElement('p');
          title.className = 'specimen-title';
          title.textContent = data.title;
          wrap.appendChild(title);

          const callout = document.createElement('div');
          callout.className = 'notes-callout';
          const strong = document.createElement('strong');
          strong.textContent = `${data.calloutLabel} `;
          callout.appendChild(strong);
          callout.appendChild(document.createTextNode(data.calloutText));
          wrap.appendChild(callout);

          const list = document.createElement('ul');
          list.className = 'notes-checklist';
          data.tasks.forEach((task) => {
            const li = document.createElement('li');
            const box = document.createElement('span');
            box.className = task.done ? 'check-box is-checked' : 'check-box';
            box.appendChild(createCheckSvg());
            const label = document.createElement('span');
            label.textContent = task.text;
            li.appendChild(box);
            li.appendChild(label);
            list.appendChild(li);
          });
          wrap.appendChild(list);
          return wrap;
        };

        railItems.forEach((item) => {
          const name = item.textContent.trim();
          if (!savedStates.has(name) && !ALLNOTES_PAGES[name]) return;

          item.setAttribute('role', 'button');
          item.tabIndex = 0;
          item.setAttribute('aria-pressed', String(item.classList.contains('is-active')));

          const selectNotebook = () => {
            if (item.classList.contains('is-active') || !page) return;

            // Save current page state (including checked boxes) before switching
            const currentActive = railItems.find((r) => r.classList.contains('is-active'));
            if (currentActive) {
              savedStates.set(currentActive.textContent.trim(), page.cloneNode(true));
              currentActive.classList.remove('is-active');
              currentActive.setAttribute('aria-pressed', 'false');
              const existingDot = currentActive.querySelector('.notes-mock-dot');
              if (existingDot) existingDot.remove();
            }

            item.classList.add('is-active');
            item.setAttribute('aria-pressed', 'true');
            const dot = document.createElement('span');
            dot.className = 'notes-mock-dot notes-mock-dot--accent';
            item.prepend(dot);

            if (barTitle) barTitle.textContent = `AllNotes · ${name}`;

            const cached = savedStates.get(name);
            const nextContent = cached ? cached.cloneNode(true) : buildNotePage(name);
            if (!nextContent) return;

            page.replaceChildren(...Array.from(nextContent.childNodes));
            bindChecklistItems(page);

            if (!prefersReduced() && typeof page.animate === 'function') {
              page.animate(
                [
                  { opacity: 0, transform: 'translate3d(10px, 0, 0)' },
                  { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                ],
                { duration: 220, easing: EASE_OUT_EXPO }
              );
            }
          };

          item.addEventListener('click', selectNotebook);
          item.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              selectNotebook();
            }
          });
        });
      }

      // 4b. Orbit Money interactive bank-memo provenance inspection
      const orbitGrid = specimen.querySelector('.orbit-mock-grid');
      if (orbitGrid) {
        const RAW_MEMOS = {
          'Corner Market': 'POS DEBIT CORNER MKT #0418',
          'City Electric': 'ACH UTIL CITY ELEC *8821',
          'City Electric Co.': 'ACH UTIL CITY ELEC *8821',
          Paycheck: 'DIRECT DEP PAYROLL 0415',
          'Index Fund Transfer': 'ACH VANGD IDX XFER *104',
          'Mortgage & Escrow': 'ACH MTG ESCROW SERV #992',
          'Fiber Internet': 'AUTOPAY FIBER ISP BILL',
        };

        const tag = specimen.querySelector('.ui-specimen__tag');
        if (tag) {
          tag.textContent = 'Interactive sample';
          tag.classList.add('is-interactive');
        }

        const rows = Array.from(orbitGrid.querySelectorAll('.orbit-ledger tbody tr'));
        let anyBound = false;
        rows.forEach((row) => {
          const firstCell = row.querySelector('td');
          if (!firstCell) return;
          const cleanName = firstCell.textContent.trim();
          const rawStr = RAW_MEMOS[cleanName];
          if (!rawStr) return;

          anyBound = true;
          const memo = document.createElement('span');
          memo.className = 'orbit-raw-memo';
          memo.textContent = `Original: ${rawStr}`;
          memo.hidden = true;
          firstCell.appendChild(memo);

          row.setAttribute('role', 'button');
          row.tabIndex = 0;
          row.setAttribute('aria-expanded', 'false');

          const toggleMemo = () => {
            const show = memo.hidden;
            memo.hidden = !show;
            row.classList.toggle('is-raw-visible', show);
            row.setAttribute('aria-expanded', String(show));
            if (show && !prefersReduced() && typeof memo.animate === 'function') {
              memo.animate(
                [
                  { opacity: 0, transform: 'translateY(-3px)' },
                  { opacity: 1, transform: 'translateY(0)' },
                ],
                { duration: 200, easing: EASE_OUT_EXPO }
              );
            }
          };

          row.addEventListener('click', toggleMemo);
          row.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              toggleMemo();
            }
          });
        });

        if (anyBound) {
          const hint = document.createElement('p');
          hint.className = 'orbit-hint';
          hint.textContent = 'Click any row to inspect preserved bank memo';
          orbitGrid.appendChild(hint);
        }
      }

      // 4c. Overbay Labs Twitter interactive feed tabs + Save chip
      const twApp = specimen.querySelector('.twitter-mock-app');
      if (twApp) {
        const tag = specimen.querySelector('.ui-specimen__tag');
        if (tag) {
          tag.textContent = 'Interactive preview';
          tag.classList.add('is-interactive');
        }

        const tabsWrap = twApp.querySelector('.twitter-mock-tabs');
        const postEl = twApp.querySelector('.twitter-mock-post');
        const filterEl = twApp.querySelector('.twitter-mock-filter');
        const saveChip = twApp.querySelector('.twitter-save-chip');

        if (tabsWrap && postEl) {
          const twTabs = Array.from(tabsWrap.querySelectorAll('span'));
          const bar = document.createElement('span');
          bar.className = 'twitter-tab-bar';
          bar.setAttribute('aria-hidden', 'true');
          tabsWrap.appendChild(bar);
          tabsWrap.classList.add('has-underline');

          const syncBar = (instant = false) => {
            const active = twTabs.find((s) => s.classList.contains('is-active')) || twTabs[0];
            if (!active) return;
            if (instant) bar.style.setProperty('transition-duration', '0ms');
            bar.style.setProperty('--tw-x', `${active.offsetLeft}px`);
            bar.style.setProperty('--tw-w', `${active.offsetWidth}px`);
            if (instant) {
              requestAnimationFrame(() => bar.style.removeProperty('transition-duration'));
            }
          };
          tabsWrap._syncBar = syncBar;
          syncBar(true);
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => syncBar(true));
          }
          if (typeof ResizeObserver === 'function') {
            const twRo = new ResizeObserver(() => syncBar(true));
            twRo.observe(tabsWrap);
          }

          const defaultAuthor = postEl.querySelector('.twitter-mock-author');
          const defaultText = postEl.querySelector('p');
          const TW_FEEDS = {
            Following: {
              name: defaultAuthor ? defaultAuthor.querySelector('strong').textContent : 'Alex R.',
              handle: '@alex_r · Sample',
              time: '12m',
              body: defaultText
                ? defaultText.textContent
                : 'Finally fixed the squeaky brake on my commuter bike tonight. Ready for the morning ride again.',
              filter: 'Blocked 2 ads · Grok hidden · Clean links',
            },
            'For you': {
              name: 'Samira K.',
              handle: '@samira_dev · Sample',
              time: '28m',
              body: 'Switched my homelab backup script to plain SQLite snapshots—full restore took 4 seconds.',
              filter: 'Blocked 5 promoted posts · Grok hidden · Clean links',
            },
            Lists: {
              name: 'Trail Weather',
              handle: '@trail_wx · Sample',
              time: '1h',
              body: 'Clear skies along the ridge through Sunday afternoon. Winds 8 mph NW, crisp visibility.',
              filter: '0 ads in list · Keyword mute active · Clean links',
            },
          };

          twTabs.forEach((tabEl) => {
            const label = tabEl.textContent.trim();
            tabEl.setAttribute('role', 'tab');
            tabEl.tabIndex = tabEl.classList.contains('is-active') ? 0 : -1;
            tabEl.setAttribute('aria-selected', String(tabEl.classList.contains('is-active')));

            const selectTwTab = () => {
              if (tabEl.classList.contains('is-active')) return;
              twTabs.forEach((s) => {
                const on = s === tabEl;
                s.classList.toggle('is-active', on);
                s.setAttribute('aria-selected', String(on));
                s.tabIndex = on ? 0 : -1;
              });
              syncBar(prefersReduced());

              const feed = TW_FEEDS[label];
              if (!feed) return;
              const authorRow = postEl.querySelector('.twitter-mock-author');
              const bodyP = postEl.querySelector('p');
              if (authorRow) {
                const leftSpan = authorRow.children[0];
                const timeSpan = authorRow.children[1];
                if (leftSpan) {
                  leftSpan.replaceChildren();
                  const strong = document.createElement('strong');
                  strong.textContent = feed.name;
                  leftSpan.appendChild(strong);
                  leftSpan.appendChild(document.createTextNode(` ${feed.handle}`));
                }
                if (timeSpan) timeSpan.textContent = feed.time;
              }
              if (bodyP) bodyP.textContent = feed.body;
              if (filterEl) filterEl.textContent = feed.filter;

              if (!prefersReduced() && typeof postEl.animate === 'function') {
                postEl.animate(
                  [
                    { opacity: 0, transform: 'translate3d(8px, 0, 0)' },
                    { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                  ],
                  { duration: 220, easing: EASE_OUT_EXPO }
                );
              }
            };

            tabEl.addEventListener('click', selectTwTab);
            tabEl.addEventListener('keydown', (e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                selectTwTab();
              }
            });
          });
        }

        if (saveChip) {
          const defaultLabel = saveChip.textContent.trim();
          let saveTimer = null;
          saveChip.setAttribute('role', 'button');
          saveChip.tabIndex = 0;

          const triggerSave = () => {
            clearTimeout(saveTimer);
            saveChip.classList.add('is-saved');
            saveChip.replaceChildren(
              createCheckSvg('copy-btn__check'),
              document.createTextNode('Saved full-res')
            );
            saveTimer = setTimeout(() => {
              saveChip.classList.remove('is-saved');
              saveChip.textContent = defaultLabel;
            }, 1800);
          };

          saveChip.addEventListener('click', triggerSave);
          saveChip.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              triggerSave();
            }
          });
        }
      }
    });

    // ── 5. Pointer-Responsive Hardware Depth & Specular Sheen ──
    const interactiveStages = document.querySelectorAll(
      '.gallery-stage, .spotlight-media, .page-hero-stage, .screenshot-stage'
    );
    interactiveStages.forEach((stage) => {
      let rafId = null;
      let lastEvent = null;

      const updateDevices = () => {
        rafId = null;
        if (!lastEvent || !hasFinePointer() || prefersReduced()) return;
        const rect = stage.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const nx = Math.max(-1, Math.min(1, ((lastEvent.clientX - rect.left) / rect.width - 0.5) * 2));
        const ny = Math.max(-1, Math.min(1, ((lastEvent.clientY - rect.top) / rect.height - 0.5) * 2));

        const devices = Array.from(stage.querySelectorAll('.device-foldable, .device-phone')).filter(
          (d) => !d.closest('[hidden]')
        );
        devices.forEach((dev, i) => {
          const depth = i === 0 ? 1 : 1.45;
          const rx = (-ny * 3.0 * (i === 0 ? 1 : 1.15)).toFixed(2);
          const ry = (nx * 3.2 * (i === 0 ? 1 : 1.15)).toFixed(2);
          const sx = (nx * 3.2 * depth).toFixed(2);
          const sy = (ny * 2.8 * depth).toFixed(2);

          const devRect = dev.getBoundingClientRect();
          const px = devRect.width
            ? Math.max(0, Math.min(100, ((lastEvent.clientX - devRect.left) / devRect.width) * 100))
            : 50;
          const py = devRect.height
            ? Math.max(0, Math.min(100, ((lastEvent.clientY - devRect.top) / devRect.height) * 100))
            : 35;

          dev.style.setProperty('--tilt-rx', `${rx}deg`);
          dev.style.setProperty('--tilt-ry', `${ry}deg`);
          dev.style.setProperty('--shift-x', `${sx}px`);
          dev.style.setProperty('--shift-y', `${sy}px`);
          dev.style.setProperty('--sheen-x', `${px.toFixed(1)}%`);
          dev.style.setProperty('--sheen-y', `${py.toFixed(1)}%`);
        });
      };

      stage.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse' || !hasFinePointer() || prefersReduced()) return;
        stage.classList.add('is-pointer-active');
      });

      stage.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || !hasFinePointer() || prefersReduced()) return;
        if (!stage.classList.contains('is-pointer-active')) {
          stage.classList.add('is-pointer-active');
        }
        lastEvent = e;
        if (!rafId) rafId = requestAnimationFrame(updateDevices);
      });

      const resetStage = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        lastEvent = null;
        stage.classList.remove('is-pointer-active');
        stage.querySelectorAll('.device-foldable, .device-phone').forEach((dev) => {
          dev.style.setProperty('--tilt-rx', '0deg');
          dev.style.setProperty('--tilt-ry', '0deg');
          dev.style.setProperty('--shift-x', '0px');
          dev.style.setProperty('--shift-y', '0px');
        });
      };

      stage.addEventListener('pointerleave', resetStage);
      stage.addEventListener('pointercancel', resetStage);
    });

    // ── 6. Authored Hero Entrance Choreography (Showcase Pages Only) ──
    if (!isLegalPage && !prefersReduced() && typeof Element.prototype.animate === 'function') {
      const animateRise = (el, delay, dy = 14, duration = 520, scale = 1) => {
        if (!el) return;
        const fromTransform =
          scale !== 1 ? `translate3d(0, ${dy}px, 0) scale(${scale})` : `translate3d(0, ${dy}px, 0)`;
        el.animate(
          [
            { opacity: 0.01, transform: fromTransform },
            { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
          ],
          { duration, delay, easing: EASE_OUT_EXPO, fill: 'backwards' }
        );
      };

      const studioHero = document.querySelector('.studio-hero');
      if (studioHero) {
        animateRise(studioHero.querySelector('h1'), 0, 14, 520);
        animateRise(studioHero.querySelector('.studio-lead'), 65, 12, 500);
        animateRise(studioHero.querySelector('.stage-tabs'), 120, 10, 480);
        animateRise(studioHero.querySelector('.gallery-stage'), 170, 16, 560);
        const initialVisuals = studioHero.querySelectorAll(
          '.stage-panel:not([hidden]) .stage-visuals > *'
        );
        initialVisuals.forEach((v, i) => animateRise(v, 225 + i * 75, 16, 560, 0.98));
      }

      const pageHero = document.querySelector('.page-hero');
      if (pageHero) {
        animateRise(pageHero.querySelector('.page-hero-copy'), 0, 14, 520);
        const heroStage = pageHero.querySelector('.page-hero-stage');
        if (heroStage) {
          animateRise(heroStage, 70, 14, 540);
          Array.from(heroStage.children).forEach((child, i) => {
            animateRise(child, 130 + i * 80, 14, 560, 0.98);
          });
          const heroBal = heroStage.querySelector('.orbit-balance-val');
          if (heroBal) setTimeout(() => rollBalance(heroBal), 160);
        }
      }
    }

    // ── 7. Progressive Below-the-Fold Scroll Arrivals ──
    if (!isLegalPage && !prefersReduced() && typeof IntersectionObserver === 'function') {
      const revealTargets = Array.from(
        document.querySelectorAll(
          '.section-header, .table-wrap, .spotlight-row, .labs-band, .two-col-split, .screenshot-stage:not([hidden]), .faq-list'
        )
      );
      const pendingTargets = [];

      const revealNow = (el) => {
        if (!el.classList.contains('reveal-ready') || el.classList.contains('is-revealed')) return;
        el.classList.add('is-revealed');
        if (el.classList.contains('spotlight-row')) {
          setTimeout(() => el.classList.add('is-reveal-settled'), 740);
        }
        const bal = el.querySelector('.orbit-balance-val');
        if (bal) rollBalance(bal);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealNow(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );

      const cutoff = window.innerHeight * 0.94;
      revealTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > cutoff) {
          el.classList.add('reveal-ready');
          pendingTargets.push(el);
          observer.observe(el);
        }
      });

      const sweepVisible = () => {
        pendingTargets.forEach((el) => {
          if (el.classList.contains('is-revealed')) return;
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 60) {
            revealNow(el);
            observer.unobserve(el);
          }
        });
      };
      window.addEventListener('hashchange', () => setTimeout(sweepVisible, 60));
    }

    // ── 8. Smooth Native <details> FAQ Accordions ──
    document.querySelectorAll('.faq-item').forEach((details) => {
      const summary = details.querySelector(':scope > summary');
      if (!summary) return;

      // Geometric animated +/- icon
      const toggleIcon = document.createElement('span');
      toggleIcon.className = 'faq-toggle-icon';
      toggleIcon.setAttribute('aria-hidden', 'true');
      summary.appendChild(toggleIcon);
      details.classList.add('has-enhanced-toggle');

      // Wrap answer nodes cleanly for height/opacity interpolation
      const answerNodes = Array.from(details.childNodes).filter((n) => n !== summary);
      const answerWrap = document.createElement('div');
      answerWrap.className = 'faq-answer';
      answerNodes.forEach((node) => answerWrap.appendChild(node));
      details.appendChild(answerWrap);

      let anim = null;
      let isClosing = false;
      let isExpanding = false;

      const finish = (openState) => {
        details.open = openState;
        anim = null;
        isClosing = false;
        isExpanding = false;
        details.classList.remove('is-expanding', 'is-collapsing');
      };

      summary.addEventListener('click', (e) => {
        if (prefersReduced() || typeof answerWrap.animate !== 'function') return;
        e.preventDefault();

        if (isClosing || !details.open) {
          // Expand (from 0 if closed, or current mid-animation height if reversing a close)
          const startHeight = isClosing ? answerWrap.getBoundingClientRect().height : 0;
          if (anim) anim.cancel();
          isClosing = false;
          isExpanding = true;
          details.classList.remove('is-collapsing');
          details.classList.add('is-expanding');
          details.open = true;

          const endHeight = answerWrap.scrollHeight;

          anim = answerWrap.animate(
            [
              { height: `${startHeight}px`, opacity: startHeight > 0 ? 1 : 0 },
              { height: `${endHeight}px`, opacity: 1 },
            ],
            { duration: 280, easing: EASE_OUT_EXPO }
          );
          anim.onfinish = () => finish(true);
          anim.oncancel = () => {
            isExpanding = false;
          };
        } else if (isExpanding || details.open) {
          // Collapse (measure before cancelling any in-flight expand)
          const startHeight = answerWrap.getBoundingClientRect().height;
          if (anim) anim.cancel();
          isExpanding = false;
          isClosing = true;
          details.classList.remove('is-expanding');
          details.classList.add('is-collapsing');

          anim = answerWrap.animate(
            [
              { height: `${startHeight}px`, opacity: 1 },
              { height: '0px', opacity: 0 },
            ],
            { duration: 210, easing: EASE_OUT_EXPO }
          );
          anim.onfinish = () => finish(false);
          anim.oncancel = () => {
            isClosing = false;
          };
        }
      });
    });

    // ── 9. Copy Buttons with Animated Checkmark Confirmation ──
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
        if (copied) {
          btn.classList.add('is-copied');
          btn.replaceChildren(createCheckSvg('copy-btn__check'), document.createTextNode('Copied'));
        } else {
          btn.classList.remove('is-copied');
          btn.textContent = 'Select text';
        }
        resetTimer = setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.textContent = defaultLabel;
        }, 1800);
      });
    });
  });
})();
