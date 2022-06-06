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

/* colocar um x quando clica nos itens da navbar */
const menuMobile = document.querySelector('.menu-mobile'); // pegando a classe .menu-mobile
const body = document.querySelector('body'); // pegando a tag body

menuMobile.addEventListener("click", () => { //quando há um clique
    menuMobile.classList.contains("bi-list") // se na classe .menu-mobile existir um bi-list
        ? menuMobile.classList.replace("bi-list", "bi-x") //troque o bi-list por um bi-x
        : menuMobile.classList.replace("bi-x", "bi-list"); //se não troque o bi-x por um bi-list
    body.classList.toggle("menu-nav-active"); //adicionando a classe no body
});