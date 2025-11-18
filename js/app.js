/*let listProducts = [];
let carts =[];
let products = [];


let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');    
let iconCart = document.querySelector('.icon-cart');
let listProductHTML = document.querySelector('.listProduct');

if(iconCart)
{
iconCart.addEventListener('click',() =>{
    document.location = 'cart.html';
})
}


const addDataToHTML = () => {
    if(listProductHTML)
    {
    console.log("ooeoeoe");
    if(listProducts.length > 0)
        {
            console.log("alalalala");
            listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src = "${product.image}" alt = "cookie">
                <p> ${product.name} </p>
                <div class = "cost" >$${product.price} </div>
                <button class = "add-to-cart">
                    Add to Cart
                </button>
                `;
                listProductHTML.appendChild(newProduct);
        })
        console.log(listProducts);
    }
    }   
}



if(listProductHTML)
{
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('add-to-cart')){
            let product_id = positionClick.parentElement.dataset.id;
            addToCart(product_id);
        }
    })
}
    

const addToCart = (product_id) => 
    {
        let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
        if(carts.length <= 0)
        {
            carts = [{
                        product_id: product_id,
                        quantity: 1
                    }];
        }
        else if(positionThisProductInCart < 0)
        {
            carts.push({
                        product_id: product_id,
                        quantity: 1
                        });
        }
        else
        {
            carts[positionThisProductInCart].quantity= carts[positionThisProductInCart].quantity + 1;
        }
        console.log(carts);
        addCartToHTML();
        addCartToMemory();
    }

const addCartToMemory = () => {
            localStorage.setItem('cart', JSON.stringify(carts));
        }



/*if(listCartHTML)
{    
    console.log("cart");
    const addCartToHTML = () => 
    {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        if(carts.length > 0)
        {
            carts.forEach(item => 
            {
                totalQuantity = totalQuantity +  item.quantity;
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;

                let positionProduct = products.findIndex((value) => value.id == item.product_id);
                let info = products[positionProduct];
                listCartHTML.appendChild(newItem);
                newItem.innerHTML = `
                <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">
                    ${info.name}
                    </div>
                    <div class="totalPrice">$${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `;
            } )
        }
        iconCartSpan.innerText = totalQuantity;
    }

}*/

/*

console.log(products);


const addCartToHTML = () => {

    listCartHTML.innerHTML = '';
    console.log("cartlah");
    let totalQuantity = 0;
    
    if(carts.length > 0)
    {
        carts.forEach(cart => 
            {
                totalQuantity = totalQuantity + cart.quantity;
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
                let info = listProducts[positionProduct];

                newCart.innerHTML = `
                <div class = "image">
                    <img src = "${info.image}" alt = "">
                </div>
                <div class = "name">
                    ${info.name}
                </div>
                <div class = "totalPrice">
                    $${info.price * cart.quantity}
                </div>
                <div class = "quantity"
                    <span class = "minus"> < </span>
                    <span>${cart.quantity}</span>
                    <span class = "plus"> > </span>
                </div>
                `;

            listCartHTML.appendChild(newCart);
                
            })
    }
    iconCartSpan.innerText = totalQuantity;
    
}



const initApp = () => 
{
    //get data from json
    fetch('products.json')
    .then(response => response.json())
    .then(data =>{
        listProducts = data;
        console.log(listProducts);
        addDataToHTML();
   
    //get memory
    if(localStorage.getItem('cart')){
        carts = JSON.parse(localStorage.getItem('cart'));

       addCartToHTML();
    } 

    })
}

initApp();*/

let listProducts = [];
let carts = [];
let products = [];

let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let iconCart = document.querySelector('.icon-cart');
let listProductHTML = document.querySelector('.listProduct');

// go to cart page
if (iconCart) {
    iconCart.addEventListener('click', () => {
        document.location = 'cart.html';
    });
}

// =============================
// ADD PRODUCTS TO HTML
// =============================
const addDataToHTML = () => {
    if (!listProductHTML) return;

    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');

            newProduct.innerHTML = `
                <img src="${product.image}" alt="cookie">
                <p>${product.name}</p>
                <div class="cost">$${product.price}</div>
                <button class="add-to-cart">Add to Cart</button>
            `;

            listProductHTML.appendChild(newProduct);
        });
    }
};

// add items to cart
if (listProductHTML) {
    listProductHTML.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('add-to-cart')) {
            let product_id = target.parentElement.dataset.id;
            addToCart(product_id);
        }
    });
}

const addToCart = (product_id) => {
    let position = carts.findIndex(item => item.product_id == product_id);

    if (position < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[position].quantity += 1;
    }

    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
};

// =============================
// ADD CART TO HTML
// =============================
const addCartToHTML = () => {
    if (!listCartHTML) return;

    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;

            let positionProduct = listProducts.findIndex(p => p.id == cart.product_id);
            let info = listProducts[positionProduct];

            // safety check to prevent crash
            if (!info) {
                console.error("Invalid product in cart:", cart.product_id);
                return;
            }

            let newCart = document.createElement('div');
            newCart.classList.add('item');

            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;

            listCartHTML.appendChild(newCart);
        });
    }

    if (iconCartSpan) iconCartSpan.innerText = totalQuantity;
};

// =============================
// INIT APP
// =============================
const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });
};

initApp();


