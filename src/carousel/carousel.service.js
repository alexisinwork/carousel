// Create separate service for working with BE
export default {
  getProducts: () => {
    // Use promise to create AJAX request to BE
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:3000/products-list');
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve({ products: JSON.parse(xhr.responseText) });
        } else {
          reject({ error: `Request failed.  Returned status of ${xhr.status}` });
        }
      };
      xhr.send();
    });
  }
};
