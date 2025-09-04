// Lightweight debug overlay to inspect online sync state.
(function () {
  const DEBUG_KEY = 'debug';

  function createEl(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'style' && typeof v === 'object') {
        Object.assign(el.style, v);
      } else if (k in el) {
        el[k] = v;
      } else {
        el.setAttribute(k, v);
      }
    });
    children.forEach(c => el.appendChild(c));
    return el;
  }

  function initOverlay() {
    if (document.getElementById('debug-overlay')) return; // already
    const style = createEl('style', { innerHTML: `
      #debug-overlay{position:fixed;bottom:8px;right:8px;width:320px;max-height:60vh;overflow:auto;background:rgba(0,0,0,.78);color:#0ff;font:12px/1.35 monospace;z-index:9999;border:1px solid #0ff;border-radius:6px;}
      #debug-overlay .dbg-hdr{display:flex;justify-content:space-between;align-items:center;padding:6px 8px;border-bottom:1px solid #0ff;color:#0ff}
      #debug-overlay .dbg-body{padding:6px 8px}
      #debug-overlay .dbg-row{display:flex;justify-content:space-between;gap:6px}
      #debug-overlay .dbg-k{color:#8ef}
      #debug-overlay .dbg-v{color:#fff}
      #debug-overlay .dbg-logs{margin-top:6px;border-top:1px dashed #0ff;padding-top:6px;max-height:28vh;overflow:auto;color:#9ff}
      #debug-overlay .dbg-btn{cursor:pointer;color:#0ff;background:transparent;border:1px solid #0ff;border-radius:4px;padding:2px 6px}
    `});
    document.head.appendChild(style);

    const header = createEl('div', { className: 'dbg-hdr' }, [
      createEl('div', { textContent: 'Debug Overlay' }),
      createEl('button', { className: 'dbg-btn', id: 'dbg-close', textContent: 'Hide' })
    ]);
    const body = createEl('div', { className: 'dbg-body' });
    const logs = createEl('div', { className: 'dbg-logs', id: 'dbg-logs' });
    const wrap = createEl('div', { id: 'debug-overlay' }, [header, body, logs]);
    document.body.appendChild(wrap);

    document.getElementById('dbg-close').onclick = () => {
      const el = document.getElementById('debug-overlay');
      if (el) el.style.display = 'none';
      localStorage.setItem(DEBUG_KEY, 'off');
    };

    window.debug._els = { body, logs, root: wrap };
    window.debug._render();
  }

    const state = {
        enabled: false,
        fields: {
          game: '',
          you: '',
          other: '',
          isPlayerOne: '',
          isPlayingOnline: '',
          turnSeq: '',
          lastProcessedSeq: '',
          wantsToCheck_self: '',
          wantsToCheck_other: '',
          nextTurn_self: '',
          nextTurn_other: '',
          compInProgress: '',
          waiting: '',
          queuedIndex: ''
        },
    logs: []
  };

  function setEnabled(on) {
    state.enabled = !!on;
    if (on) {
      initOverlay();
      localStorage.setItem(DEBUG_KEY, 'on');
    } else {
      localStorage.setItem(DEBUG_KEY, 'off');
      const el = document.getElementById('debug-overlay');
      if (el) el.style.display = 'none';
    }
  }

  function setField(k, v) {
    if (!(k in state.fields)) return;
    state.fields[k] = String(v);
    if (window.debug._els) window.debug._render();
  }

  function log(msg, data) {
    const line = `[${new Date().toISOString().split('T')[1].split('Z')[0]}] ${msg}` + (data !== undefined ? ` :: ${JSON.stringify(data)}` : '');
    state.logs.unshift(line);
    if (state.logs.length > 200) state.logs.pop();
    console.log('[DEBUG]', line);
    if (window.debug._els) window.debug._renderLogs();
  }

  function render() {
    const b = window.debug._els?.body;
    if (!b) return;
    b.innerHTML = '';
    Object.entries(state.fields).forEach(([k, v]) => {
      const row = createEl('div', { className: 'dbg-row' }, [
        createEl('div', { className: 'dbg-k', textContent: k }),
        createEl('div', { className: 'dbg-v', textContent: String(v) })
      ]);
      b.appendChild(row);
    });
  }

  function renderLogs() {
    const l = window.debug._els?.logs;
    if (!l) return;
    l.innerHTML = state.logs.map(s => `<div>${s}</div>`).join('');
  }

  // public API
  window.debug = Object.assign(window.debug || {}, {
    enable: () => setEnabled(true),
    disable: () => setEnabled(false),
    set: setField,
    log,
    _render: render,
    _renderLogs: renderLogs,
    _els: null,
    _state: state
  });

  // auto-enable if localStorage says so or query contains debug=1
  const qs = new URLSearchParams(location.search);
  if (localStorage.getItem(DEBUG_KEY) === 'on' || qs.get('debug') === '1') {
    setEnabled(true);
  }

  // keyboard toggle Shift + D
  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
      const next = !(localStorage.getItem(DEBUG_KEY) === 'on');
      setEnabled(next);
      if (next) initOverlay();
    }
  });
})();
