// Import dependencies
import './main.scss';
import Carousel from './carousel/carousel';
import { getProducts } from './carousel/carousel.service';
// Create future template and host element
let template = '';

// setEventListeners
function setEventListeners(carousel) {
  document.querySelector('.carousel__body__forward').addEventListener('click', carousel.forward.bind(carousel), false);
  document.querySelector('.carousel__body__back').addEventListener('click', carousel.back.bind(carousel), false);
  document.querySelector('.carousel__body__main__dot--1').addEventListener('click', carousel.slideTo.bind(carousel), false);
  document.querySelector('.carousel__body__main__dot--2').addEventListener('click', carousel.slideTo.bind(carousel), false);
  document.querySelector('.carousel__body__main__dot--3').addEventListener('click', carousel.slideTo.bind(carousel), false);
  document.querySelector('.carousel__body__main__dot--4').addEventListener('click', carousel.slideTo.bind(carousel), false);
  document.querySelector('.carousel__body__main__dot--5').addEventListener('click', carousel.slideTo.bind(carousel), false);
}

// get all products from server
getProducts()
  .then((products) => {
    // When products loaded - create Carousel - you can add autoscroll if you want to see auto switching picture
    const carousel = new Carousel('JUNIQE Products Carousel', 'Art. Everywhere.', products.products, { autoscroll: true });

    template = `
    <div class="carousel">
      <header class="carousel__header">
          <h1 class="carousel__header__title">${carousel.title}</h1>
          <h3 class="carousel__header__description">${carousel.description}</h3>
      </header>
      <section class="carousel__body">
          <aside class="carousel__body__back">
             <img class="carousel__body__back--image" src="https://image.ibb.co/d57H2F/back.png" alt="back">
          </aside>
          <section class="carousel__body__main" style="background-image: url(${carousel.products[0].image_url})">
            <div class="carousel__body__main__product">
              <p class="carousel__body__main__product__name">${carousel.currentProduct.name}</p>
              <p class="carousel__body__main__product__description">${carousel.currentProduct.description}</p>
              <p class="carousel__body__main__product__price">${carousel.currentProduct.price} ${carousel.currentProduct.price_currency_code}</p>
              <div class="carousel__body__main__product__details">
                <p class="carousel__body__main__product__details--date">Date: ${carousel.currentProduct.date_published}</p>
                <p class="carousel__body__main__product__details--availability">${carousel.currentProduct.availability}</p>
                <p class="carousel__body__main__product__details--url">
                  <a href="${carousel.currentProduct.url}" target="_blank">To details</a>
                </p>
              </div>
            </div>
            <div class="carousel__body__main__dot">
              <!-- If image is last or first in slider - start from the end of the list  -->
              <span class="carousel__body__main__dot--1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Black_circle.png" width="25" 
                     alt="${carousel.imageIndex - 2 < 0 ? (carousel.products.length - carousel.imageIndex) - 2 : carousel.imageIndex - 2}">
              </span>
              <span class="carousel__body__main__dot--2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Black_circle.png" width="25" 
                     alt="${carousel.imageIndex - 1 < 0 ? (carousel.products.length - carousel.imageIndex) - 1 : carousel.imageIndex - 1}">
              </span>
              <span class="carousel__body__main__dot--3">
                <img class="active" src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Black_circle.png" width="25" 
                     alt="${carousel.imageIndex}">
              </span>
              <span class="carousel__body__main__dot--4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Black_circle.png" width="25" 
                     alt="${carousel.imageIndex + 1}">
              </span>
              <span class="carousel__body__main__dot--5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Black_circle.png" width="25" 
                     alt="${carousel.imageIndex + 2}">
              </span>
            </div>
          </section>
          <aside class="carousel__body__forward">
            <img class="carousel__body__forward--image" src="https://image.ibb.co/eEBGwa/forward.png" alt="forward">
          </aside>
      </section>
    </div>
    `;

    document.querySelector('#app').innerHTML = template;

    setEventListeners(carousel);
  })
  .catch((error) => {
    template = `<p>${error.error}</p>`;

    document.querySelector('#app').innerHTML = template;
  });
