//Owl-carousel
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 3,
    margin: 30,
    nav: true,
    dots: false,
    mouseDrag: false,
    smartSpeed: 1000,
    //loop:true,
    responsive: {
      //Адаптация в зависимости от разрешения экрана
      0: {
        items: 1,
      },
      810: {
        items: 2,
      },
      1210: {
        items: 3,
      },
    },

    navText: [
      '<img src="./../img/arrow-right.svg" alt="Prev">',
      '<img src="./../img/arrow-right.svg" alt="Next">',
      // '<span></span>',
      // '<span></span>',
    ],
  });
});

//AirDatepicker
new AirDatepicker("#date");

//Карусель
const carouselItems = document.querySelectorAll('.direct__carousel-item');
carouselItems.forEach(item=>{
  const content = item.querySelector('.direct__carousel-content');
  const raiting = item.querySelector('.direct__carousel-rait');
    item.addEventListener('mouseover',function(event){
        if(content&&raiting)
        {content.classList.toggle('direct__carousel-content_collapsed');
        raiting.style.opacity = '0';}
    })
    item.addEventListener('mouseout',function(event){
      if(content&&raiting)
      {content.classList.toggle('direct__carousel-content_collapsed');
      raiting.style.opacity = '1';}
    })
})

//Навигация
const navBtn = document.querySelector(".nav-icon-btn");
const navIcon = document.querySelector(".nav-icon");
const navList = document.querySelector(".header__top-row");
const navItems = document.querySelectorAll(".header__mobile-list a");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navIcon.classList.remove("nav-icon--active");
    navList.classList.remove("header__top-row_mobile");
  });
});

navBtn.addEventListener("click", () => {
  navIcon.classList.toggle("nav-icon--active");
  navList.classList.toggle("header__top-row_mobile");
});

// import AirDatepicker from "air-datepicker";
// import "air-datepicker/air-datepicker.css";

// new AirDatepicker("#date");
