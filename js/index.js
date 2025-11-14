let listProductHTML = document.querySelector('.listProduct');

let listProducts = [];

const initApp = () => 
{
    //get data from json
    fetch('products.json')
    .then(response => response.json())
    .then(data =>{
        listProducts = data;
        console.log(listProducts);
    })
}

initApp();
