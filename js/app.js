let listProducts = [];

let listProductHTML = document.querySelector('.listProduct');



const addDataToHTML = () => {
    listProductHTML.innerHTML = '';


    if(listProducts.length > 0){

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
    }
}
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('add-to-cart')){
            /*let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);*/
            alert('1');
        }
    })

const initApp = () => 
{
    //get data from json
    fetch('products.json')
    .then(response => response.json())
    .then(data =>{
        listProducts = data;
        console.log(listProducts);
        addDataToHTML();
    })
}

initApp();
