export function initBackground(canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [], w, h, animId;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        stars = Array.from({ length: 180 }, () => ({
            x: Math.random() * w, y: Math.random() * h,
            r: Math.random() * 1.8 + 0.3,
            a: Math.random(), da: (Math.random() - 0.5) * 0.015
        }));
    }
    function draw() {
        ctx.clearRect(0, 0, w, h);
        stars.forEach(s => {
            s.a += s.da;
            if (s.a > 1 || s.a < 0.1) s.da *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,210,255,${s.a})`;
            ctx.fill();
        });
        animId = requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize();
    draw();
    return () => { cancelAnimationFrame(animId); };
}

export function setWeatherEffect(condition) {
    document.querySelectorAll('.rain-drop,.cloud-layer,.lightning-flash').forEach(e => e.remove());
    const c = condition.toLowerCase();
    if (c.includes('rain') || c.includes('drizzle')) createRain();
    else if (c.includes('cloud')) createClouds();
    else if (c.includes('thunder')) { createRain(); startLightning(); }
    else if (c.includes('snow')) createSnow();
}

function createRain() {
    for (let i = 0; i < 60; i++) {
        const d = document.createElement('div');
        d.className = 'rain-drop';
        d.style.left = Math.random() * 100 + '%';
        d.style.height = Math.random() * 20 + 10 + 'px';
        d.style.animationDuration = Math.random() * 0.5 + 0.4 + 's';
        d.style.animationDelay = Math.random() * 2 + 's';
        d.style.opacity = Math.random() * 0.4 + 0.1;
        document.body.appendChild(d);
    }
}

function createClouds() {
    for (let i = 0; i < 5; i++) {
        const d = document.createElement('div');
        d.className = 'cloud-layer';
        d.style.top = Math.random() * 40 + '%';
        d.style.animationDuration = Math.random() * 30 + 40 + 's';
        d.style.animationDelay = Math.random() * 20 + 's';
        d.style.width = Math.random() * 200 + 200 + 'px';
        document.body.appendChild(d);
    }
}

function createSnow() {
    for (let i = 0; i < 50; i++) {
        const d = document.createElement('div');
        d.className = 'rain-drop';
        d.style.left = Math.random() * 100 + '%';
        d.style.width = d.style.height = Math.random() * 6 + 3 + 'px';
        d.style.borderRadius = '50%';
        d.style.background = 'rgba(255,255,255,0.7)';
        d.style.animationDuration = Math.random() * 2 + 2 + 's';
        d.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(d);
    }
}

function startLightning() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            const f = document.createElement('div');
            f.className = 'lightning-flash';
            document.body.appendChild(f);
            setTimeout(() => f.remove(), 200);
        }
    }, 3000);
}
