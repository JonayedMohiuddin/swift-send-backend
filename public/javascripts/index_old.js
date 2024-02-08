/* DYNAMIC CONTAINER POINTERS */
const container = document.querySelector(".js-card-container");

getProductDetails();

/* UTILITY FUNCTIONS */
function random(max = 1000) {
    return Math.floor(Math.random() * max);
}

/* FETCHES FULL PRODUCT TABLE FROM DATABASE */
async function getProductDetails() {
    console.log("Fetch all products button clicked.");

    const options = {
        method: "GET",
    };

    const url = `http://localhost:3000/catalog/products`;
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

/* ADDS A NEW PRODUCT INTO DATABASE */
async function addProduct() {
    console.log("Add product button clicked.");

    const name = prompt("Enter product name:");
    const price = parseInt(prompt("Enter product price:"));
    const quantity = random();
    const supplierId = random();
    const supplyHouseId = random();
    const rating = random();
    const discount = random();

    const newProduct = {
        NAME: name,
        PRICE: price,
        QUANTITY: quantity,
        SUPPLIER_ID: supplierId,
        SUPPLY_HOUSE_ID: supplyHouseId,
        RATING: rating,
        DISCOUNT: discount,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
    };

    const url = "http://localhost:8000/products";
    const response = await fetch(url, options);
    if (response.status === 201) {
        const addedProduct = await response.json();
        console.log("Product added:", addedProduct);
    } else {
        console.error("Error adding product. Server status:", response.status);
        return;
    }
}

/* DELETES A PRODUCT FROM THE PRODUCTS DATABASE TABLE */
async function deleteProduct() {
    console.log("Delete product button clicked.");

    const productId = 67; // Replace with the ID of the product you want to delete

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }),
    };

    const url = "http://localhost:8000/products";
    const response = await fetch(url, options);
    const message = await response.text();
    console.log("Delete operation:", message);
}

/* UPDATES A PRODUCT WITH NEW INFORMATION */
async function updateProduct() {
    console.log("Update product button clicked.");

    const productId = 68; // Replace with the ID of the product you want to update

    const updatedProduct = {
        NAME: "Updated Product Name",
        PRICE: 150,
        QUANTITY: 20,
        SUPPLIER_ID: 2,
        SUPPLY_HOUSE_ID: 2,
        RATING: 4.8,
        DISCOUNT: 0.1,
    };

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
    };

    const url = `http://localhost:8000/products/${productId}`;
    const response = await fetch(url, options);

    if (response.status === 200) {
        const updatedProductInfo = await response.json();
        console.log("Product updated:", updatedProductInfo);
    } else {
        console.error("Error updating product. Server status:", response.status);
    }
}

/* SEARCHES PRODUCTS BY NAME */
async function searchProductsByName() {
    console.log("Search by name button clicked.");

    const searchName = "updated";

    const options = {
        method: "GET",
    };

    const url = `http://localhost:8000/products/search?name=${searchName}`;
    const response = await fetch(url, options);

    if (response.status === 200) {
        const searchResults = await response.json();
        console.log("Search results:", searchResults);
        displayProducts(searchResults);
    } else {
        console.error("Error searching products. Server status:", response.status);
    }
}

/* DISPLAYS PRODUCTS ON THE TABLE */
function displayProducts(products) {
    let updatedContainer = "";
    for (const product of products) {
        updatedContainer += `
            <div class="product-card">
                <a href="/catalog/product/${product.ID}" class="product-card__link">
                    <img
                        class="product-card__image"
                        src="${product.IMAGE_URL}"
                        alt="${product.NAME}"
                        onerror="this.onerror=null; this.src='/public/images/no-product-image.jpg';"
                    />
                    <div class="product-card__content">
                        <div class="product-card__name">${product.NAME}</div>
                        <div class="product-card__rating product-card__rating--star-icon">${product.RATING}/5 (${product.REVIEW_COUNT})</div>
                        <div class="product-card__extras-container">
                            <div class="product-card__free-delivery">Free Delivery</div>
                            <div class="product-card__voucher">Voucher: 7</div>
                        </div>
                        <div class="product-card__price">৳  ${product.PRICE}</div>
                    </div>
                </a>
            </div>
        `;
    }
    container.innerHTML = updatedContainer;
}
