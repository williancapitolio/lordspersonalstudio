/* criou constante para selecionar css da navbar da tag a onde existe um '#', excluindo links externos */
const menuLinks = document.querySelectorAll('.navbar a[href^="#"]');

function getDistanceFromTheTop(element) {
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
}

/* não funcional, pois o safari não suporta
function nativeScroll(distanceFromTheTop) {
    window.scroll({
        top: distanceFromTheTop,
        behavior: "smooth",
    });
}
*/

function scrollToSection(event) {
    event.preventDefault();
    const distanceFromTheTop = getDistanceFromTheTop(event.target) - 104;
    smoothScrollTo(0, distanceFromTheTop, 200)
}

/*
function scrollToSection(event) {
    event.preventDefault();
    const element = event.target;
    const id = element.getAttribute("href");
    const section = document.querySelector(id);
    console.log(section.offsetTop);
}
*/

menuLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
});

/* função do GitHub iwazaru/smooth-scroll.js */
function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== "undefined" ? duration : 400;

    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1)
            return (distance / 2) * time * time * time * time + from;
        return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60);
}

/* Mapa Leaflet */
var Latitude = -20.614547;

var Longitude = -46.052997;

var map = L.map('map').setView([Latitude, Longitude], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([Latitude, Longitude]).addTo(map)
    .bindPopup("Academia Lord's Personal Studio.<br>R. Cel. Lourenço Belo, 625 - 2º Andar")
    .openPopup();
