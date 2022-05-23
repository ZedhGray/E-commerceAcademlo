'use strict'

const baseURL = 'https://e-commerce-api-academlo.herokuapp.com/api';

let editingID = null;


function printProducts(products) {
const container = document.getElementById('products-container');
let html = '';
for(let i = 0; i < products.length; i++) {
    html += `<div class="col-md-6 col-lg-4 mt-3">
    <div class="card">
        <div class="card-body">
          <h5 class="card-title">${products[i].name}</h5>
          <p class="card-text">${products[i].price}</p>
          <img class=col-md-6 src= "${products[i].image}" alt="image"/> 
          <div class="text-end">
        <button class="btn btn-danger" onclick="deleteProduct(${products[i].id})">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        <button class="btn btn-primary" onclick="editProduct(${products[i].id})">
        <i class="fa-solid fa-pen"></i>
        </button>
        </div>
        </div>
        
        
            
      </div>
</div>`
}
container.innerHTML = html;
}



//resibe los productos de la api
function getProducts() {
    axios.get('https://e-commerce-api-academlo.herokuapp.com/api/products') 
    .then(function (response) {
      const products = response.data;
      printProducts(products);
      })
    .catch(function (error) {
      console.log(error)
      })
}

function deleteProduct(id){
  const confirmation = confirm('Are you sure you want to delete the product?');
  if(!confirmation){
    return
  }

  axios.delete(`${baseURL}/products/${id}`)
    .then(function (response) {
      console.log(response)
      alert('The product was removed successfully');
      getProducts();
      })
    .catch(function (error) {
      console.log(error)
      alert('Could not delete the product correctly');
      })
}
function createProduct() {
  const newProduct = {
      name: document.getElementById('name').value,
      price: document.getElementById('price').value,
      image: document.getElementById('image').value
  }

  axios.post('https://e-commerce-api-academlo.herokuapp.com/api/products', newProduct)
      .then(function (response) {
          alert('The product was created successfully');
          getProducts();
      })
      .catch(function (error) {
          alert('Failed to create product');
          console.log(error);
      })
}

function editProduct(id) {
  axios.get(`${baseURL}/products/${id}`)
  .then(function (response) {
    editingID = id;
    const product= response.data;
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('image').value = product.image;

    })
  .catch(function (error) {
    alert('Product could not be loaded');
    })
}

function updateProduct() {
    const productEdited = {
      name: document.getElementById('name').value,
      price: document.getElementById('price').value, 
      image: document.getElementById('image').value 
    }
    axios.put(`${baseURL}/products/${editingID}`, productEdited)
    .then(function (response) {
      alert('The product was edited successfully');
      getProducts();
      })
    .catch(function (error) {
      alert('Could not edit the product correctly');
      })
}


getProducts();

