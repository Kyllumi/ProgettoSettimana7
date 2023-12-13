// Chiamata GET
function getData(uri) {
    fetch(uri, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

// Chiamata POST
function createData(data, uri) {
    fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

// Chiamata DELETE
function deleteData(uri, id) {
    fetch(`${uri}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
        .then(response => response)
        .catch(err => console.log(err));
}

// Chiamata PUT
function updateData(data, uri, id) {
    fetch(`${uri}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

// Variabili
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2QzY2MwNTgzNTAwMTg1MjMwZjciLCJpYXQiOjE3MDIzODg2MTUsImV4cCI6MTcwMzU5ODIxNX0.5GPC4nj_PcynstGgoX_xeHTlq2B_v1WBfoEFJ2C6ayU';
const URI = "https://striveschool-api.herokuapp.com/api/product";
const id = '65797de126761400183c478f';


// Costruttore
class Product {
    constructor(name, description, brand, imageUrl, price, moreInfo) {
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.imageUrl = imageUrl;
        this.price = price;
        this.moreInfo = moreInfo;
    }
}

// Quando il DOM verrà caricato
document.addEventListener("DOMContentLoaded", async () => {
    deleteData(URI, id);
    if (window.location.pathname.includes('index.html')) {
        getData(URI);
        createProductCards();

    }

    if (window.location.pathname.includes('backOffice.html')) {
        document.querySelector('form button.btn-success').addEventListener('click', () => {
            createObject();
        })
    }


});

function createObject() {
    let nome = document.querySelector('#NomeProdotto').value;
    let marca = document.querySelector('#brand').value;
    let descrizione = document.querySelector('#description').value;
    let immagine = document.querySelector('#imageURL').value;
    let prezzo = +(document.querySelector('#price').value);


    let p = new Product(nome, descrizione, marca, immagine, prezzo);
    console.log(p);

    createData(p, URI);
}

function createProductCards() {
    let container = document.querySelector('div#containerCard');
    fetch(URI, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
        .then(response => response.json())
        .then(data => data.forEach(element => {
            let card = `    
            <div class="card m-3" style="max-width: 400px;">
            <i class="bi bi-pencil-square position-absolute top-0 end-0 p-1 rounded"></i>
                <div class="row">
                    <div class="col-md-4 d-flex">
                        <img src="${element.imageUrl}" class="img-fluid rounded-start align-self-center" alt="${element.name}">
                    </div>
                    <div class="col-md-8 d-flex">
                        <div class="card-body align-self-center">
                            <h5 class="card-title">${element.brand}</h5>
                            <p class="card-text">${element.description}. ${element.moreInfo}</p>
                            <div class="d-flex justify-content-between align-items-end">
                            <p class="card-text m-0"><small class="text-body-secondary">${element.price}€</small></p>
                            <button class="btn btn-primary">Compra</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            container.innerHTML += card;
        }))
        .catch(err => console.log(err))

}