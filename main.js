
const categoryList = document.querySelector(".category-list");
const productList = document.querySelector(".product-list");
const sepetBtn = document.querySelector('#sepet');
const closeBtn = document.querySelector('#close');
const modal = document.querySelector('.modal-wrapper');
const modalList = document.getElementById("modal-list");

const fiyatSpan = document.querySelector("#fiyat");

document.addEventListener("DOMContentLoaded", () => { //callback farklı fonksşyonlar çalıstırabiliyoruz
    fetchCategories();
    fetchProducts();
});


function fetchCategories() {
    fetch(' https://api.escuelajs.co/api/v1/categories')
        .then((res) => res.json())
        .then((data) =>
            // Data dizisinin içindeki her bir eleman için htmle categotyDiv gönderdik.
            data.slice(0, 4).forEach((category) => {
                // Gelen her obje için div olusturma
                const categoryDiv = document.createElement("div");
                // Oluşan elemana classs verme
                categoryDiv.classList.add("category")
                // Elemanın html içeriğini değistirme
                categoryDiv.innerHTML = ` 
             <img src="${category.image}">
            <span>${category.name}</span> 
            `
                // Oluşan elemanı htmle gonderme
                categoryList.appendChild(categoryDiv);
            })
        )
        .catch((err) => console.log(err));
}

function fetchProducts() {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then((res) => res.json())
        .then((data) => data.slice(0, 20).forEach((product) => {
            // div olusturma
            const productDiv = document.createElement("div");
            //olusan elemente class verme
            productDiv.classList.add("product")
            // htmele cevir
            productDiv.innerHTML = `
         <img src="${product.images[0]}">
        <p>${product.title}</p>
        <p>${product.category.name}</p>
        <div class="product-info">
            <span>${product.price} $</span>
            <button onclick="sepeteEkle({name:'${product.title}',id:'${product.id}',price:'${product.price}',amount:1})" >Sepete Ekle</button>
        `
            //olusan elemanı htmle gönderme
            productList.appendChild(productDiv)
        }))
        .catch((err) => console.log(err));
}

// sepeti açma kapama
const basket = [];
let toplamfiyat = 0;

function listBasket() {
    basket.forEach((eleman) => {
        // Sepet Elemanını Divini Olusturma
        const basketItem = document.createElement("div")
        basketItem.classList.add("sepetItem")
        basketItem.innerHTML = ` 
      <h2>${eleman.name}</h2>
      <h2>${eleman.price} $</h2>
      <p>Miktar: ${eleman.amount}</p>`

      modalList.appendChild(basketItem);
      toplamfiyat += Number(eleman.price) * eleman.amount;
    });
    fiyatSpan.innerText = toplamfiyat;
}

sepetBtn.addEventListener('click', () => {
    //sepeti açar
    toggleSepet();
    // sepete elemanları ekler
    listBasket();
});
closeBtn.addEventListener("click", () => {
    //sepeti kapatır
    toggleSepet();

    // sepet kapandığında listenin içi temizlendi.
    modalList.innerHTML='';
});

function toggleSepet() {
    modal.classList.toggle('active');
}

// sepete eleman ekleme


function sepeteEkle(param) {
    const foundItem = basket.find((eleman) => eleman.id == param.id);
    if (foundItem) {
        foundItem.amount += 1;
    } else {
        basket.push(param);
    }
}