import './carousel.scss';
// local variables for Carousel
let parentIsMiddleDot = '', main = '', image = '', product = '';
// create class of carousel
export default class Carousel {
  // you can provide options with autoscroll or not
  constructor(title, description, products, options) {
    this.title = title;
    this.description = description;
    this.products = products;
    this.options = options;
    this.checkOptions();
    this.currentProduct = this.products[0];
    this.images = this.products.length;
    this.imageIndex = 0;
    this.props = [ this.currentProduct.name, this.currentProduct.description, this.currentProduct.price ];
  }
  // Not necessary, but in future can be extended for easier work with DOM
  findElement(selector) {
    return document.querySelector(selector);
  }

  checkOptions() {
    if (this.options.autoscroll) {
      setInterval(() => {
        this.forward();
      }, 5000);
    }
  }

  forward() {
    // If it is middle dot - imageIndex +1
    parentIsMiddleDot = this.findElement('.active').parentNode.classList.contains('carousel__body__main__dot--3');
    main = this.findElement('.carousel__body__main');
    image = this.findElement('.carousel__body__main__dot--3>img');
    if (parentIsMiddleDot) {
      this.imageIndex++;
    }
    // If this is first item - set imageIndex to last image in products
    if (this.imageIndex > this.products.length - 1) {
      this.imageIndex = 0;
      main.style.backgroundImage = `url(${this.products[this.imageIndex].image_url})`;
      this.setDots();
      this.setDotActive(image);
    } else {
      main.style.backgroundImage = `url(${this.products[this.imageIndex].image_url})`;
      this.setDots();
      this.setDotActive(image);
    }
    this.currentProduct = this.products[this.imageIndex];
    this.setDetails();
  }

  back() {
    parentIsMiddleDot = this.findElement('.active').parentNode.classList.contains('carousel__body__main__dot--3');
    main = this.findElement('.carousel__body__main');
    image = this.findElement('.carousel__body__main__dot--3>img');
    if (parentIsMiddleDot) {
      this.imageIndex--;
    }
    if (this.imageIndex === -1) {
      this.imageIndex = this.products.length - 1;
      main.style.backgroundImage = `url(${this.products[this.imageIndex].image_url})`;
      this.setDots();
      this.setDotActive(image);
    } else {
      main.style.backgroundImage = `url(${this.products[this.imageIndex].image_url})`;
      this.setDots();
      this.setDotActive(image);
    }
    this.currentProduct = this.products[this.imageIndex];
    this.setDetails();
  }
  // On each forward/back event - change alt of image
  setDots() {
    let index = this.imageIndex;
    this.findElement('.carousel__body__main__dot--1>img').alt = index - 2 < 0 ? (this.products.length - index) - 2 : index - 2;
    this.findElement('.carousel__body__main__dot--2>img').alt = index - 1 < 0 ? (this.products.length - index) - 1 : index - 1;
    this.findElement('.carousel__body__main__dot--3>img').alt = index;
    this.findElement('.carousel__body__main__dot--4>img').alt = index + 1 > this.products.length - 1 ? index = 0 : index + 1;
    this.findElement('.carousel__body__main__dot--5>img').alt = index + 2 > this.products.length - 1 ? index = 0 : index + 2;
  }
  // Depending on alt property change imageIndex
  slideTo(event) {
    main = this.findElement('.carousel__body__main');
    this.imageIndex = Number(event.target.alt);
    this.currentProduct = this.products[this.imageIndex];
    this.setDetails();
    this.setDotActive(event.target);
    main.style.backgroundImage = `url(${this.products[event.target.alt].image_url})`;
  }
  // Change class of the dot
  setDotActive(dotElement) {
    [].forEach.call(document.querySelectorAll('.active'), (el) => {
      el.classList.remove('active');
    });
    dotElement.classList.add('active');
  }
  // Change product details if user click dot or forward/back
  setDetails() {
    product = this.findElement('.carousel__body__main__product');
    product.children[0].textContent = this.currentProduct.name;
    product.children[1].textContent = this.currentProduct.description;
    product.children[2].textContent = `${this.currentProduct.price} ${this.currentProduct.price_currency_code}`;
    product.children[3].children[0].textContent = this.currentProduct.date_published;
    product.children[3].children[1].textContent = this.currentProduct.availability;
    product.children[3].children[2].children[0].href = this.currentProduct.url;
  }
}
