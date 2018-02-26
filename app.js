const fs = require('fs');
const jsonfile = require('jsonfile');
var WooCommerce = require('woocommerce');

const setting = require('./settings.json');

console.log(setting);

var wooCommerce = new WooCommerce(setting);

var fetchProducts = function(i) {
  wooCommerce.get('/products?page='+i)
    .then(data => {
      // data will contain the body content from the request
      console.log(data);
      //fs.writeFile("products.json", JSON.stringify(data.products), 'utf8');
      jsonfile.writeFile("products"+i+".json", data.products, {spaces: 2}, function(err) {
        console.error(err)
      });
    })
    .catch(err => {
      // Log the error message
      console.log(err.message);

      // Log the body returned from the server
      console.log(err.body);

      // Log the full response object and status code
      console.log(err.response, err.response.statusCode);
    });
}

var pages = 20;
for(var i = 1; i < pages;i++) {
  fetchProducts(i);
}
