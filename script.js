// https://www.youtube.com/watch?v=gXWohFYrI0M
// time code 26:00;
let iconCart = document.querySelector(".icon-cart");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let listCartHTML = document.querySelector(".ListCart");
let iconCartSpan = document.querySelector(".icon-cart span");

let ListProductHTML = document.querySelector(".ListProduct");
let carts = [];
let ListProducts = []; // list vide pour le moement
iconCart.addEventListener("click", () => {
    //la fonction qui ajoute un evenement clique
    // a la variable iconcart qui selectionne
    // un button(l'icone du panier)
    body.classList.toggle("showCart");
    // ! change la classe de la variable body qui indexe
    // ! sur l'element body en html
});
// ? meme chose pour la variable CloseCart mais dans
// ? le sens inverse
closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
});

// ! pour afficher les element du fichier.json si
// ! la taille du tableau est > 0
const addDataToHTML = () => {
    ListProductHTML.innerHTML = "";
    if (ListProducts.length > 0) {
        ListProducts.forEach((product) => {
            let newProduct = document.createElement("div");
            newProduct.classList.add("item");
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">${product.price}</div>
                <button class="addCart">
                    ajouter au panier
                </button>
            `;
            ListProductHTML.appendChild(newProduct);
        });
    }
};
// Fonction qui recupere l'id du produit
ListProductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("addCart")) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

// fonction  pour ajouter les produits a la sidebar
const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex(
        (value) => value.product_id == product_id
    );
    if (carts.length <= 0) {
        carts = [
            {
                product_id: product_id,
                quantity: 1,
            },
        ];
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1,
        });
    } else {
        carts[positionThisProductInCart].quantity =
            carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
};
// ! FOnction qui sauvegarde les produits
// ! meme si le user quitte la page
const addCartToMemory = ()=> {
    localStorage.setItem('cart', JSON.stringify(carts))
}
// fonction qui ajoute le chiffre sur le panier
// et recupere les articles pour les afficher sur la sidebar
const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach((cart) => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement("div");
            newCart.classList.add("item");
            newCart.dataset.id = cart.product_id;
            let positionProduct = ListProducts.findIndex((value) => value.id == cart.product_id);
            let info = ListProducts[positionProduct];
            newCart.innerHTML = `
        <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    ${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>`;
            listCartHTML.appendChild(newCart);
        });
    }
    iconCartSpan.innerText= totalQuantity;
};




const initApp = () => {
    // Recuperer ici les donnes du fichier Json
    fetch("products.json")
        .then((reponse) => reponse.json())
        .then((data) => {
            ListProducts = data;
            addDataToHTML();

            // Avoir les elements du panier si elle existe deja
            if(localStorage.getItem('cart')){
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });
};
initApp(); //appel de la fonction
