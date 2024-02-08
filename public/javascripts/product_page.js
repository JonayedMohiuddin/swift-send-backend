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

buyNowBtn.addEventListener("click", buyNow);

getProductDetails();

/* UTILITY FUNCTIONS */
function random(max = 1000) {
    return Math.floor(Math.random() * max);
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

/* ADD TO CART */
async function addToCart(productId)
{
    console.log("Add to cart button clicked. Product ID:", productId);
    const quantity = parseInt(quantityInput.value);

    let data = {
        product_id: productId,
        quantity: quantity,
    };

    const url = `/cart/add/`;

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    // const json = await response.json();
    console.log(response.text);
}