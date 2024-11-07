const burgerMenuButtonSvg = document.querySelectorAll(".burger-menu__svg")
const burgerMenuButton = document.querySelector(".burger-menu__button")
const burgerMenuList = document.querySelector(".burger-menu__list")

burgerMenuButton.addEventListener('click', () => {
    burgerMenuButtonSvg.forEach((el) => {el.classList.toggle("active")})
    burgerMenuList.classList.toggle("active")
})