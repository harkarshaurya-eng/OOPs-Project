export function formatTime(ts, tz) {
    return new Date((ts + tz) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' });
}
export function formatHour(ts, tz) {
    return new Date((ts + tz) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, timeZone: 'UTC' });
}
export function formatDay(ts, tz) {
    const d = new Date((ts + tz) * 1000);
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const m = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    return { day: days[d.getUTCDay()], date: `${m}/${day}` };
}
export function windDirection(deg) {
    const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    return dirs[Math.round(deg / 22.5) % 16];
}
export function uvLabel(uv) {
    if (uv <= 2) return { label: 'Low', color: '#22c55e' };
    if (uv <= 5) return { label: 'Moderate', color: '#eab308' };
    if (uv <= 7) return { label: 'High', color: '#f97316' };
    if (uv <= 10) return { label: 'Very High', color: '#ef4444' };
    return { label: 'Extreme', color: '#7c3aed' };
}
export function aqiInfo(aqi) {
    const map = [
        { label: 'Good', face: '😊', color: '#22c55e' },
        { label: 'Fair', face: '🙂', color: '#eab308' },
        { label: 'Moderate', face: '😐', color: '#f97316' },
        { label: 'Poor', face: '😷', color: '#ef4444' },
        { label: 'Very Poor', face: '🤢', color: '#7c3aed' }
    ];
    return map[Math.min(aqi - 1, 4)] || map[0];
}
export function visibilityDesc(vis) {
    const km = vis / 1000;
    if (km >= 10) return 'Good visibility and clear field of vision';
    if (km >= 5) return 'Moderate visibility';
    if (km >= 2) return 'Low visibility, use caution';
    return 'Very poor visibility';
}
export function humidityDesc(h) {
    if (h < 30) return 'Air is very dry. Stay hydrated.';
    if (h < 60) return 'Comfortable humidity level.';
    if (h < 80) return 'Air feels humid and sticky.';
    return 'Very high humidity. Stay cool.';
}
export function getMoonPhase() {
    const d = new Date();
    const y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate();
    let c = 0, e = 0;
    if (m < 3) { c = y - 1; e = m + 12; } else { c = y; e = m; }
    const jd = Math.floor(365.25 * (c + 4716)) + Math.floor(30.6001 * (e + 1)) + day - 1524.5;
    const phase = ((jd - 2451550.1) / 29.530588853) % 1;
    const p = phase < 0 ? phase + 1 : phase;
    const icons = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
    const names = ['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous','Full Moon','Waning Gibbous','Last Quarter','Waning Crescent'];
    const i = Math.floor(p * 8) % 8;
    return { icon: icons[i], name: names[i], illumination: Math.round(p * 100) };
}

// Storage helpers
export function getStorage(key, def) { try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; } }
export function setStorage(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
