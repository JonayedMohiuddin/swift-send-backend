const cartAddBtn = document.querySelector(".js-cart-btn");
cartAddBtn.addEventListener("click", addCartBtnClicked);

async function addCartBtnClicked() {
    let productId = cartAddBtn.dataset.productid;
    let quantity = document.querySelector(".js-quantity").value;
    let data = {
        productId,
        quantity,
    };
    let url = "/cart/add";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
}