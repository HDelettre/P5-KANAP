/* je récupére mon panier */
let contenuPanier = localStorage.getItem('Panier');
/* je vérifie si le panier existe */
if (contenuPanier == null){
    alert('Le panier est vide,vous devez sélectionner au moins un article.');
    document.location.href = 'index.html';
} else {
    /*je récupére les datas de mon panier */
    let contenuPanier_json = JSON.parse(localStorage.getItem('Panier'));
    /* pour chaque article de mon panier je récupére les datas de l'API */
    
/* je calcul le prix total */
    calculTotalPrice();
}

/* je récupére les données de mon panier pour l'affichage */
function loadBasket() {
    let contenuPanier_json = JSON.parse(localStorage.getItem('Panier'));
    let contenuPanier_Array = [];
    for (let i=0; i < contenuPanier_json.length; i++) {
        let panierId = contenuPanier_json[i].id;
        let panierCouleur = contenuPanier_json[i].couleur;
        let panierQuantite = contenuPanier_json[i].quantite;
        console.log('3, '+panierId+' - '+panierCouleur+' - '+panierQuantite);
        /* je vais rechercher les datas complémenaires */
        affichePanier(panierId, panierCouleur, panierQuantite);
    }    
}

function affichePanier(panierId, panierCouleur, panierQuantite) {
    let urlProduct = `http://localhost:3000/api/products/${panierId}`;
    fetch(urlProduct)
    .then((response) =>response.json())
    .then((produit)=>{
        /* creation article */
        let newArticle = document.createElement('article');
        newArticle.classList.add('cart__item');
        newArticle.setAttribute('data-id',panierId);
        newArticle.setAttribute('color', panierCouleur);

        let cartItemImg = document.createElement('div');
        cartItemImg.classList.add('cart__item__img');
        let panierImage = document.createElement('img');
        panierImage.src = produit.imageUrl;
        panierImage.alt = produit.altTxt;
        cartItemImg.appendChild(panierImage);
        newArticle.appendChild(cartItemImg);
        
        let cartItemContent = document.createElement('div');
        cartItemContent.classList.add('cart__item__content');
        let titreH2 = document.createElement('h2');
        titreH2.textContent = produit.name;
        let paraCouleur = document.createElement('p');
        paraCouleur.textContent = panierCouleur;
        let paraPrix = document.createElement('p');
        paraPrix.textContent = produit.price + ' €';
        let unitPrice = produit.price;

        cartItemContent.appendChild(titreH2);
        cartItemContent.appendChild(paraCouleur);
        cartItemContent.appendChild(paraPrix);
        newArticle.appendChild(cartItemContent);

        let cartItemContentSettings = document.createElement('div');
        cartItemContentSettings.classList.add('cart__item__content__settings');
        let cartItemContentSettingsQuantity = document.createElement('div');
        cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
        let paraQuantity = document.createElement('p');
        paraQuantity.textContent = 'Qté : ';
        let inputQuantity = document.createElement('input');
        inputQuantity.type = 'number';
        inputQuantity.classList.add('itemQuantity');
        inputQuantity.name = 'itemQuantity';
        inputQuantity.min = '1';
        inputQuantity.max = '100';
        inputQuantity.value = panierQuantite;
        cartItemContentSettingsQuantity.appendChild(paraQuantity);
        cartItemContentSettingsQuantity.appendChild(inputQuantity);
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

        let cartItemContentSettingsQuantityDelete = document.createElement('div');
        cartItemContentSettingsQuantityDelete.classList.add('cart__item__content__settings__quantity__delete');
        let paraDelete = document.createElement('p');
        paraDelete.classList.add('deleteItem');
        paraDelete.textContent = 'Supprimer';
        cartItemContentSettingsQuantityDelete.appendChild(paraDelete);
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantityDelete);
        newArticle.appendChild(cartItemContentSettings);

        let insertPanier=document.getElementById('cart__items');
        insertPanier.appendChild(newArticle);

        /* Changement de quantité d'un article - Evénement*/
        inputQuantity.addEventListener('change',function (){
        changeQuantity(panierId, panierCouleur, inputQuantity, unitPrice);
        })

        /* suppression d'un article - Evénement */
        paraDelete.addEventListener('click',function() {
            /* Recherche élément à supprimer */
            let itemIdToDelete = newArticle.getAttribute('data-id');
            let itemColorToDelete = newArticle.getAttribute('Color');
            suppressionArticle(newArticle, itemIdToDelete, itemColorToDelete, unitPrice);
        })
    })
}

/* Surveillance des entrées du formulaire */
function formulaireCheck() {
    document.getElementById('firstName').addEventListener('change', function() {
        let chaineATester = document.getElementById('firstName');
        let chaineATesterError = document.getElementById('firstNameErrorMsg');
        let formatChaine = /^[a-zA-Z-éèàç]+$/g;
        let errorMsg = "Le champs ne doit contenir que des lettres"
        checkFormulaire(chaineATester, chaineATesterError, formatChaine, errorMsg);
    });

    document.getElementById('lastName').addEventListener('change', function() {
        let chaineATester = document.getElementById('lastName');
        let chaineATesterError = document.getElementById('lastNameErrorMsg');
        let formatChaine = /^[a-zA-Z-éèàç]+$/g;
        let errorMsg = "Le champs ne doit contenir que des lettres"
        checkFormulaire(chaineATester, chaineATesterError, formatChaine, errorMsg);
    });

    document.getElementById('address').addEventListener('change', function() {
        let chaineATester = document.getElementById('address');
        let chaineATesterError = document.getElementById('addressErrorMsg');
        let formatChaine = /\d{1,3}.[a-zA-Z-éèàç,]/g;
        let errorMsg = "Le champs doit contenir 1 à 3 chiffres + lettres + tiret, é, è, ç et à"
        checkFormulaire(chaineATester, chaineATesterError, formatChaine, errorMsg);
    });

    document.getElementById('city').addEventListener('change', function() {
        let chaineATester = document.getElementById('city');
        let chaineATesterError = document.getElementById('cityErrorMsg');
        let formatChaine = /\d{5}.[a-zA-Z-éèà]/g;
        let errorMsg = "Le champs doit contenir 5 chiffres (code postal) + lettres + tiret, é, è et à"
        checkFormulaire(chaineATester, chaineATesterError, formatChaine, errorMsg);
    });

    document.getElementById('email').addEventListener('change', function() {
        let chaineATester = document.getElementById('email');
        let chaineATesterError = document.getElementById('emailErrorMsg');
        let formatChaine = /[\w.-]+@[\w-]+\.\w{2,4}/g;
        let errorMsg = "Le champs doit être une adresse valide (xxxxxxx@.yyyy.zz)"
        checkFormulaire(chaineATester, chaineATesterError,formatChaine, errorMsg);
    })
}
formulaireCheck();

/* Validation de la commande */
function boutonCommander() {
    console.log('contenu panier: ' +JSON.parse(localStorage.getItem("Panier")).length);
    document.getElementById('order').addEventListener('click', function(event) {
        if (document.querySelector("#firstNameErrorMsg").value == '' &&
            document.querySelector("#lastNameErrorMsg").value == '' &&
            document.querySelector("#addressErrorMsg").value == '' &&
            document.querySelector("#cityErrorMsg").value == '' &&
            document.querySelector("#emailErrorMsg").value == '' &&
            JSON.parse(localStorage.getItem("Panier")).length != 0) {
            console.log('je valide la commande')
                validationCommande();
        } else {
            event.preventDefault();
            if (JSON.parse(localStorage.getItem("Panier")).length == 0) {
                alert('Le panier est vide, vous ne pouvez pas passer de commande !');
            } else {
                alert('Veuillez compléter le formulaire avant de valider votre commande !');
            }
        }
    })
}
boutonCommander();

function acceptationCommande() {

}

/* Calcul du prix total et du nombre d'articles */
function calculTotalPrice(unitPrice) {
    let totalPrice = 0;
    /*let dansLePanier = localStorage.getItem('Panier');*/
    let dansLePanier_json = JSON.parse(localStorage.getItem('Panier'));
    /* Mise à jour nombre d'Articles */
    let totalArticles = dansLePanier_json.length
    document.getElementById('totalQuantity').innerHTML = totalArticles;
    /* calcul du prix total */
    for (let i=0; i < totalArticles; i++) {
        let panierId =dansLePanier_json[i].id;
        let panierQuantite =dansLePanier_json[i].quantite;
        console.log('4,1 '+panierId,'/'+panierQuantite+'-'+unitPrice);
        let urlProduct = `http://localhost:3000/api/products/${panierId}`;
        fetch(urlProduct)
        .then((response) =>response.json())
        .then((produit)=>{
            let unitPrice = produit.price;
            let articlePrice = parseInt(panierQuantite) * parseInt(unitPrice);
            totalPrice += articlePrice;
            console.log('total1: '+totalPrice);
            document.getElementById('totalPrice').innerHTML = totalPrice;
        })
    }
}

/* Gestion du changement de quantité des articles */
function changeQuantity(panierId, panierCouleur, inputQuantity, unitPrice) {
    /* je récupére mon panier */
    let recupStorage=JSON.parse(localStorage.getItem('Panier'));
    for (let i=0; i < recupStorage.length; i++) {
        /* je recherche mon article */
        if (recupStorage[i].id == panierId && recupStorage[i].couleur == panierCouleur) {
            /* je change sa quantité */
            recupStorage[i].quantite =inputQuantity.value;
            /* je met à jour mon panier local */
            localStorage.setItem('Panier',JSON.stringify(recupStorage));
        }
    }
    /* je met à jour le prix total */
    calculTotalPrice(unitPrice);
}

/* suppression d'un article du panier */
function suppressionArticle(newArticle, itemIdToDelete, itemColorToDelete, unitPrice) {
    let panierMemoire =JSON.parse(localStorage.getItem('Panier'));
    let itemToDelete=-1;
    for (let i=0; i<panierMemoire.length; i++) {
        if (panierMemoire[i].id == itemIdToDelete && panierMemoire[i].couleur == itemColorToDelete) {
            itemToDelete = i;
        }
    }
    /* je supprime l'élément du panier */
    panierMemoire.splice(itemToDelete, 1);
    localStorage.setItem('Panier',JSON.stringify(panierMemoire));
    console.log('après delete: ' + localStorage.getItem('Panier'));
    /* je supprime l'élément de la page */
    let parentSection = newArticle.closest('section');
    parentSection.removeChild(newArticle);
    /* je mets à jour le prix total */
    calculTotalPrice(unitPrice);
}

/* Gestion du formulaire */
function checkFormulaire(chaineATester, chaineATesterError, formatChaine, errorMsg) {
    if (formatChaine.test(chaineATester.value)) {
        chaineATesterError.hidden = true;
    } else {
        chaineATesterError.hidden = false;
        chaineATesterError.textContent = errorMsg;
    }
}

function validationCommande() {
    let contact = {
        'firstName': document.getElementById('firstName').value,
        'lastName': document.getElementById('lastName').value,
        'address': document.getElementById('address').value,
        'city': document.getElementById('city').value,
        'email': document.getElementById('email').value
    };
    let articleCommande =JSON.parse(localStorage.getItem('Panier'));
    let products = [];
    for (let i=0; i < articleCommande.length; i++){
        products.push(articleCommande[i].id);
    }
    let bonCommande = {
        'contact':contact,
        'products': products
    };
    fetch('http://localhost:3000/api/products/order/',{
        method: 'POST',
        body: JSON.stringify(bonCommande),
        headers:{
            'accept' : 'application/json',
            'Content-Type' : 'application/json'
        }})
    .then(response => response.json())
    .then(data => {
        document.location.href = 'confirmation.html?id=' + data.orderId;
    })
}

let tab = [];
function test() {
    let inputs = document.getElementsByTagName('input');
    for (let i=0; i < inputs.length; i++) {
        if (inputs[i].name != '') {
            tab.push(inputs[i].name + 'ErrorMsg');
        }
    }
    console.log('tab: ' + tab);
}
test();

function test2() {
    let testValue = 0;
    for (let i=0; i < tab.length; i++) {
        let frt = document.getElementsByName(tab[i]);
        console.log(tab[i] + ' frt: ' + frt.length);
        if (frt.length != 0) {
            testValue ++
        }
    }
    console.log('testvalue= ' + testValue)
}
test2();