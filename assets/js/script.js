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
const id = '6578866a26761400183c32be';


// Costruttore
class Product {
    constructor(name, description, brand, imageUrl, price,) {
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}

// Creazione oggetti
let p1 = new Product("Smart TV 4K", "TV con risoluzione ultra HD", "Samsung", "assets/img/tv.jpg", 799.99);

let p2 = new Product("Laptop Ultraleggero", "Notebook sottile e leggero", "Dell", "assets/img/laptop.jpg", 1299.99);

let p3 = new Product("Telecamera di Sorveglianza", "Telecamera per la sicurezza domestica", "Ring", "assets/img/telecamera.jpg", 199.99);

let p4 = new Product("Auricolari Wireless", "Auricolari Bluetooth con cancellazione del rumore", "Sony", "assets/img/cuffie.webp", 149.99);

let p5 = new Product("Stampante Multifunzione", "Stampante per ufficio con scanner integrato", "HP", "assets/img/stampante.jpg", 299.99);


// Quando il DOM verrà caricato
document.addEventListener("DOMContentLoaded", async () => {
    getData(URI);
    createProductCards();

    
});


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
            <div class="card m-3" style="max-width: 380px;">
                <div class="row g-0">
                    <div class="col-md-4 d-flex justify-content-center align-items-center">
                        <img src="${element.imageUrl}" class="img-fluid rounded-start h-75" alt="${element.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${element.brand}</h5>
                            <p class="card-text">${element.description}</p>
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

function addNewProductCard() {
    let nome = document.querySelector('#NomeProdotto').value;
    let marca = document.querySelector('#brand').value;
    let descrizione = document.querySelector('#description').value;
    let immagine = document.querySelector('#imageURL').value;
    let prezzo = document.querySelector('#price').value;

    let p = new Product(nome, descrizione, marca, immagine, prezzo);

    fetch(URI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(p)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

} 
