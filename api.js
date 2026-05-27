const API_KEY = '4d8fb5b93d4af21d66a2948710284366';
const BASE = 'https://api.openweathermap.org';

export async function geocodeCity(city) {
    const r = await fetch(`${BASE}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${API_KEY}`);
    if (!r.ok) throw new Error('Geocoding failed');
    return r.json();
}

export async function getCurrentWeather(lat, lon, units = 'metric') {
    const r = await fetch(`${BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`);
    if (!r.ok) throw new Error('Weather fetch failed');
    return r.json();
}

export async function getForecast(lat, lon, units = 'metric') {
    const r = await fetch(`${BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`);
    if (!r.ok) throw new Error('Forecast fetch failed');
    return r.json();
}

export async function getAirQuality(lat, lon) {
    const r = await fetch(`${BASE}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    if (!r.ok) throw new Error('AQI fetch failed');
    return r.json();
}

export async function getUV(lat, lon) {
    try {
        const r = await fetch(`${BASE}/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        if (r.ok) return r.json();
    } catch(e) {}
    return null;
}

export function getIconUrl(code, size = 2) {
    return `https://openweathermap.org/img/wn/${code}@${size}x.png`;
}
