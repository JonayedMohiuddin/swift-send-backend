/* EXTRACT PRODUCT ID FROM URL */
const currentUrl = window.location.href;
const productIdMatch = currentUrl.match(/\/catalog\/product\/(\d+)/);

let productId;
if (productIdMatch) {
    productId = productIdMatch[1];
    console.log("Product ID:", productId);
} else {
    console.error("Unable to extract product ID from the URL");
}

/* INPUT HANDLERS */
const quantityInput = document.querySelector(".js-quantity-input");

const incrementProductBtn = document.querySelector(".js-increment-quantity-btn");
incrementProductBtn.addEventListener("click", incrementProduct);

const decrementProductBtn = document.querySelector(".js-decrement-quantity-btn");
decrementProductBtn.addEventListener("click", decrementProduct);

const addToCartBtn = document.querySelector(".js-add-to-cart-btn");
addToCartBtn.addEventListener("click", addToCart);

const buyNowBtn = document.querySelector(".js-buy-now-btn");
buyNowBtn.addEventListener("click", buyNow);

/* DYNAMIC CONTAINER POINTERS */
const productName = document.querySelector(".js-product-name");
const ratingBar = document.querySelector(".js-rating-bar");
const ratingCount = document.querySelector(".js-rating-count");
const productPrice = document.querySelector(".js-product-price");

getProductDetails();

/* UTILITY FUNCTIONS */
function random(max = 1000) {
    return Math.floor(Math.random() * max);
}

/* FUNCTIONS */
async function getProductDetails() {
    const options = {
        method: "GET",
    };

    const url = `http://localhost:3000/catalog/product/`;
    console.log(url);

    const response = await fetch(url, options);

    if (response.status !== 200) {
        console.error("Error fetching products. Server response status:", response.status);
        return;
    }

    const products = await response.json();
    console.log(products);
    
    displayProducts(products);
}

/* DISPLAYS PRODUCTS ON THE TABLE */
function updateView(productDetail) {
    
}

/*  CHANGE PRODUCT QUANTITY */
function incrementProduct() {
    console.log("Increment product button clicked.");
    const quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
}

function decrementProduct() {
    console.log("Decrement product button clicked.");
    const quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}