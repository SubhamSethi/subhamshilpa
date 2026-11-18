/**
 * #Sushi registry backend. Paste this into the sheet's Extensions > Apps Script and deploy it as a web app.
 * GET  -> everything the website shows (funds, gifts, events, wall).
 * POST -> a guest stamps the wall after paying; the row lands in the Wall tab.
 * Columns are found by their header text, so tabs can be reordered or widened freely.
 */

const WALL_LIMIT = 300;

function doGet() {
  return json_(state_());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    let b = {};
    try { b = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return json_({ ok: false, error: 'bad_json' }); }
    if (b.website) return json_({ ok: true, state: state_() }); // honeypot filled in: a bot

    const name = clean_(b.name, 60);
    if (!name) return json_({ ok: false, error: 'name' });

    let kind = b.kind === 'gift' ? 'gift' : 'fund';
    let item = clean_(b.item, 60);
    const mode = ['upi', 'whole', 'chip', 'bring'].indexOf(b.mode) >= 0 ? b.mode : 'upi';
    let amount = Math.max(0, Math.round(Number(b.amount) || 0));
    let converted = false;

    const st = state_();
    if (kind === 'gift') {
      const g = st.gifts.filter(function (x) { return x.id === item; })[0];
      if (!g) return json_({ ok: false, error: 'unknown', state: st });
      if (mode === 'bring') {
        if (g.remaining < g.price) return json_({ ok: false, error: 'taken', state: st });
        amount = g.price; // reserving it covers one unit
      } else if (g.remaining <= 0) {
        kind = 'fund'; item = 'home'; converted = true; // paid for something already covered: send it to the home fund
      }
    } else if (!st.funds.some(function (f) { return f.id === item; })) {
      item = 'home';
    }
    if (amount <= 0) return json_({ ok: false, error: 'amount' });

    const wall = sheet_('Wall');
    const h = headers_(wall);
    const row = new Array(wall.getLastColumn()).fill('');
    const put = function (header, v) { if (h[header] !== undefined) row[h[header]] = v; };
    put('Received at', new Date());
    put('Name', name);
    put('Type', kind);
    put('Item ID', item);
    put('Option', clean_(b.option, 30));
    put('How', mode);
    put('Amount (₹)', amount);
    put('Show amount on site', !!b.showAmount);
    put('Message', clean_(b.message, 280));
    put('Sticker', clean_(b.sticker, 20));
    put('UPI ref', clean_(b.utr, 20));
    put('Payment verified', false);
    put('Hide from site', false);
    // Write under the last real entry (not appendRow: empty tick boxes count as content and push rows to the bottom).
    const keyCol = (h['Received at'] !== undefined ? h['Received at'] : 0) + 1;
    const keys = wall.getRange(1, keyCol, wall.getMaxRows(), 1).getValues();
    let last = keys.length;
    while (last > 1 && keys[last - 1][0] === '') last--;
    const target = last + 1;
    if (target > wall.getMaxRows()) wall.insertRowsAfter(wall.getMaxRows(), 200);
    wall.getRange(target, 1, 1, row.length).setValues([row]);
    ['Show amount on site', 'Payment verified', 'Hide from site'].forEach(function (k) {
      if (h[k] !== undefined) wall.getRange(target, h[k] + 1).insertCheckboxes();
    });
    SpreadsheetApp.flush();

    return json_({ ok: true, converted: converted, state: state_() });
  } finally {
    lock.releaseLock();
  }
}

/* ---------- Reading the sheet ---------- */

function state_() {
  const tz = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  const wallRows = rows_('Wall').filter(function (r) { return r['Hide from site'] !== true && r['Name'] !== ''; });

  const funds = rows_('Funds').filter(function (r) { return r['Fund ID'] !== ''; }).map(function (r) {
    const id = String(r['Fund ID']).trim();
    const mine = wallRows.filter(function (w) { return w['Type'] === 'fund' && w['Item ID'] === id; });
    const byOption = {};
    mine.forEach(function (w) { if (w['Option']) byOption[w['Option']] = (byOption[w['Option']] || 0) + num_(w['Amount (₹)']); });
    return { id: id, target: num_(r['Target (₹)']), raised: num_(r['Total raised (₹)']), count: mine.length, byOption: byOption };
  });

  const gifts = rows_('Gifts').filter(function (r) { return r['Gift ID'] !== '' || r['Gift name'] !== ''; }).map(function (r) {
    const id = r['Gift ID'] !== '' ? String(r['Gift ID']).trim() : slug_(r['Gift name']);
    const price = num_(r['Price (₹)']);
    const qty = Math.max(1, num_(r['Quantity']) || 1);
    const givers = wallRows.filter(function (w) { return w['Type'] === 'gift' && w['Item ID'] === id; }).map(function (w) { return String(w['Name']); });
    const covered = r['Covered so far (₹)'] !== '' ? num_(r['Covered so far (₹)']) : 0;
    return {
      id: id, name: String(r['Gift name']), price: price, qty: qty,
      note: String(r['Note shown on site'] || ''), link: String(r['Link to the one we like'] || ''),
      covered: Math.min(covered, price * qty), remaining: Math.max(0, price * qty - covered), givers: givers
    };
  }).filter(function (g) { return g.price > 0; });

  const events = rows_('Events').filter(function (r) { return r['Event'] !== ''; }).map(function (r) {
    return {
      name: String(r['Event']),
      date: r['Date'] instanceof Date ? Utilities.formatDate(r['Date'], tz, 'yyyy-MM-dd') : String(r['Date']).trim(),
      time: r['Start time'] instanceof Date ? Utilities.formatDate(r['Start time'], tz, 'HH:mm') : String(r['Start time']).trim(),
      hours: num_(r['Length (hours)']) || 3,
      city: String(r['City'] || ''), venue: String(r['Venue'] || ''), address: String(r['Address'] || ''),
      mapUrl: String(r['Google Maps link'] || ''), dress: String(r['Dress code'] || ''), note: String(r['Note'] || ''),
      main: r['Main event'] === true
    };
  });

  const wall = wallRows.slice(-WALL_LIMIT).reverse().map(function (w) {
    return {
      name: String(w['Name']), kind: w['Type'], item: w['Item ID'], option: w['Option'], mode: w['How'],
      amount: w['Show amount on site'] === true ? num_(w['Amount (₹)']) : null,
      message: String(w['Message'] || ''), sticker: String(w['Sticker'] || ''), verified: w['Payment verified'] === true
    };
  });

  return { ok: true, funds: funds, gifts: gifts, events: events, wall: wall };
}

/* ---------- Helpers ---------- */

function sheet_(name) {
  const sh = SpreadsheetApp.getActive().getSheetByName(name);
  if (!sh) throw new Error('Missing tab: ' + name);
  return sh;
}
function headers_(sh) {
  const map = {};
  sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].forEach(function (v, i) { map[String(v).trim()] = i; });
  return map;
}
function rows_(name) {
  const sh = sheet_(name);
  const last = sh.getLastRow();
  if (last < 2) return [];
  const head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(function (v) { return String(v).trim(); });
  return sh.getRange(2, 1, last - 1, head.length).getValues().map(function (vals) {
    const o = {};
    head.forEach(function (k, i) { o[k] = typeof vals[i] === 'string' ? vals[i].trim() : vals[i]; });
    return o;
  });
}
function num_(v) { const n = Number(v); return isFinite(n) ? n : 0; }
function slug_(s) { return String(s).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, ''); }
function clean_(s, max) {
  s = String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s; // stop text from being read as a formula
}
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
