let listProducts = [];
let carts =[];


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

        
const addCartToHTML = () =>
{
    let totalQuantity = 0;
    listCartHTML.innerHTML = '';
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            let positionProduct = listProducts.findIndex((value => value.id == cart.product_id));
            let info = products[positionProduct];
            newCart.innerHTML = `
                <div class = "item">
                <div class = "img">
                    <img src = "${info.image}" alt = "Item 1" width="100"> 
                </div>
                <div class = "name"> ${info.name} </div>
                <div class = "quantity">    
                    <span class = "add"> < </span>
                    <span>${cart.quantity}/span>
                    <span class = "minus"> > </span>
                </div> 
                <div class = "totalprice"> $${cart.quantity * info.price} </div>
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
       // console.log(listProducts);
        addDataToHTML();
   
    //get memory
    if(localStorage.getItem('cart')){
        carts = JSON.parse(localStorage.getItem('cart'));

       // addCartToHTML();
    } 

    })
}

initApp();
