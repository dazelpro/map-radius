let map, circle, lat, lng, currentTheme = "light";
let lightTile, darkTile;

navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    map = L.map('map').setView([lat, lng], 14);

    // Light mode tile
    lightTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    });

    // Dark mode tile
    darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    // default pakai light
    lightTile.addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup("📍 Posisi Anda").openPopup();

    // default radius 3 km
    circle = L.circle([lat, lng], { radius: 3000, color: 'red', fillOpacity: 0.2 }).addTo(map);
});

function updateRadius() {
    let value = document.getElementById("radiusInput").value;
    let unit = document.getElementById("unit").value;

    let radius = value * unit;

    if (circle) {
        map.removeLayer(circle);
    }

    let color = currentTheme === "dark" ? "lime" : "blue";
    circle = L.circle([lat, lng], { radius: radius, color: color, fillOpacity: 0.25 }).addTo(map);
    map.fitBounds(circle.getBounds());
}

function toggleTheme() {
    const controls = document.getElementById("controls");

    if (currentTheme === "light") {
        map.removeLayer(lightTile);
        darkTile.addTo(map);
        controls.classList.add("dark");
        currentTheme = "dark";
    } else {
        map.removeLayer(darkTile);
        lightTile.addTo(map);
        controls.classList.remove("dark");
        currentTheme = "light";
    }

    updateRadius(); // refresh warna lingkaran sesuai tema
}