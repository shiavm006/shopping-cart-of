const api = fetch('https://content.newtonschool.co/v1/pr/65f821a4f6a42e24cda7e50c/productsData');

const returned = api.then((resp) => {
    return resp.json();
})

returned.then((result) => {
    console.log(result);
    display_my_prd(result);
})

var cart = [];

function display_my_prd(result) {
    let productcontainer = document.querySelector('.productscontainer')
    result.forEach((e) => {

        let productDiv = document.createElement('div')
        productDiv.classList.add('product')

        productDiv.innerHTML = `
        <img class='pimage' width="250px" height="350px" src="${e.image}" alt="">
        <p class='ptitle'>${e.title}</p>
        <div class="priceandaddtocart">
            <p class="pprice">${e.price} DH</p>
            <button class="addtocart" data-productid="${e.id}">
            
            </button>
        </div>`

        productcontainer.appendChild(productDiv)

        productDiv.querySelector('.addtocart').addEventListener('click', function () {
            addToCart(e);
            // cartButton.setAttribute('items', cart.length);
        });
    })
}


let header = document.querySelector('header')
header.style.position = 'sticky'
header.style.top = 0

const cartUI = document.querySelector('.cartui');

const cartButton = document.querySelector('.carticon');
cartButton.addEventListener('click', () => {
    cartUI.classList.toggle('cartopened');
});

const closeButton = document.querySelector('.closecart');
closeButton.addEventListener('click', () => {
    cartUI.classList.toggle('cartopened');
});


function addToCart(product) {
    if (!cart.find(item => item.id === product.id)) {
        cart.push(product);
        displayProductInCart(product);
        cartButton.setAttribute('items', cart.length);
    }
}

function displayProductInCart(product) {
    let cartContainer = document.querySelector('.pccontainer');

    let productDiv = document.createElement('div');
    productDiv.classList.add('cartproduct');

    productDiv.innerHTML = `
        <div class="pnp">
            <img class='pimage' width="100px" height="150px" src="${product.image}">
            <div class="nameandprice">
                <p>${product.title}</p>
                <p>${product.price}</p>
                <div class='qtt'>
                    <p>Qty: </p>
                    <p class="addqtt"> + <p/>
                    <p class="counter"> 1 </p>
                    <p class="minusqtt"> - <p/>
                </div>
            </div>
        </div>
        <button class="delete" productid="${product.id}">X</button>
        `;

    cartContainer.appendChild(productDiv);

    inc_dec(productDiv); 

    productDiv.querySelector('.delete').addEventListener('click', function () {
        productDiv.remove();
        cart = cart.filter((item) => item.id !== product.id); 
        cartButton.setAttribute('items', cart.length); 
    });
}

function inc_dec(productDiv) { 
    const increment = productDiv.querySelector('.addqtt'); 
    const decrement = productDiv.querySelector('.minusqtt'); 
    const counter = productDiv.querySelector('.counter'); 
    var cnt_val = parseInt(counter.textContent);

    increment.addEventListener('click', () => {
        cnt_val += 1;
        counter.textContent = cnt_val;
        cartButton.setAttribute('items', cnt_val)
    });

    

    decrement.addEventListener('click', () => {
        if (cnt_val - 1 != 0) {
            cnt_val -= 1;
            counter.textContent = cnt_val;
            cartButton.setAttribute('items', cnt_val)
        }
    });
}