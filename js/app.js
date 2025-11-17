let listProducts = [];
let cart =[];


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

    listProductHTML.innerHTML = '';

    if(listProducts.length > 0){

        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
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
    }

}
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('add-to-cart')){
            let product_id = positionClick.parentElement.dataset.id;
            addToCart(product_id);
        }
    })

const addToCart = (product_id) => 
    {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        if(cart.length <= 0)
        {
            cart = [{
                        product_id: product_id,
                        quantity: 1
                    }];
        }
        else if(positionThisProductInCart < 0)
        {
            cart.push({
                        product_id: product_id,
                        quantity: 1
                        });
        }
        else
        {
            cart[positionThisProductInCart].quantity= cart[positionThisProductInCart].quantity + 1;
        }
        console.log(cart);
        addCartToHTML();
        addCartToMemory();
    }

const addCartToMemory = () => {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
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
       // console.log(listProducts);
        addDataToHTML();
   
    //get memory
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));

       addCartToHTML();
    } 

    })
}

initApp();
