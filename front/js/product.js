/* Récupération id produit depuis la page produit */
let params = new URLSearchParams(window.location.search);
let productId = params.get("id");
/* initialisation page du produit de l'API */
let urlProduct = `http://localhost:3000/api/products/${productId}`;
/* requête fetch pour récupérer les datas du produit depuis l'API */
function contactApi() {
    fetch(urlProduct)
        .then((response) =>response.json())
        .then((produit)=>{
            let produitImage=produit.imageUrl;
            let produitImageTexte=produit.altTxt;
            let produitNom=produit.name;
            let produitDescription=produit.description;
            let produitPrix=produit.price;
            let produitCouleur=produit.colors;
            affichageProduit(produitImage, produitImageTexte, produitNom, produitDescription, produitPrix, produitCouleur)
        })
    }
contactApi();

/* Ajout de l'article au panier */
function addToCart() {
    document.getElementById('addToCart').addEventListener('click', testPanier);
}
addToCart();

/* affichage des détails de l'article */
function affichageProduit(produitImage, produitImageTexte, produitNom, produitDescription, produitPrix, produitCouleur) {
    /* mise à jour nom de la page */
    document.title=produitNom;

    let imageProduit=document.createElement('img');
    imageProduit.src=produitImage;
    imageProduit.alt=produitImageTexte;
    const newImage=document.querySelector('.item__img');
    newImage.appendChild(imageProduit);

    let titreProduit=document.getElementById('title');
    titreProduit.innerText=produitNom;

    let prixProduit=document.getElementById('price');
    prixProduit.innerText=produitPrix;

    let descriptionProduit=document.getElementById('description');
    descriptionProduit.innerText=produitDescription;

    const couleurForm=document.getElementById('colors');

    for (i=0;i<produitCouleur.length;i++){
        const couleurData=produitCouleur[i];
        const insertCouleur=document.createElement('option');
        insertCouleur.value=couleurData;
        insertCouleur.textContent=couleurData;
        couleurForm.appendChild(insertCouleur);
    }
}
/* function test si couleur et quantité défini */
function testPanier() {
    document.getElementById('quantity').style.backgroundColor='white';
    document.getElementById('colors').style.backgroundColor='white';
    let commandeQuantity=document.getElementById('quantity').value;
    let commandeCouleur=document.getElementById('colors').value;
    if(commandeQuantity === '0') {
        document.getElementById('quantity').style.backgroundColor='red';
    }
    else if(commandeCouleur===''){
        document.getElementById('colors').style.backgroundColor='red';
    }
    else {
        ajoutPanier(commandeCouleur, commandeQuantity);
    }
}

/* fonction ajout article dans le panier */
function ajoutPanier(commandeCouleur, commandeQuantity) {
    /* je crée mon nouvel article */
    let newCanape={
        'id' : productId,
        'couleur' : commandeCouleur,
        'quantite' : commandeQuantity
    };
    /* je défini mon nouveau panier */
    let newBasket=[];
    /* je vérifie si mon panier local existe */
    if (localStorage.getItem('Panier')) {
        /* si oui, je vérifie les doublons */
        let recupStorage = JSON.parse(localStorage.getItem('Panier'));
        let checkDouble = -1;
        for (let i=0; i < recupStorage.length; i++) {
            if (recupStorage[i].id == newCanape.id && recupStorage[i].couleur == newCanape.couleur) {
                checkDouble = i;
            }
        }
        /* si je n'ai pas de double */
        if (checkDouble == -1) {
            /* ajout nouvel element */
            newBasket = recupStorage;
            newBasket.push(newCanape);
            /* sinon */
        } else {
            /* modifie quantite */
            let newQuantite = parseInt(recupStorage[checkDouble].quantite) + parseInt(newCanape.quantite);
            recupStorage[checkDouble].quantite = newQuantite.toString();
            newBasket = recupStorage;
        }
    } else {
        /* mon panier est vide */
        newBasket.push(newCanape);
    }
    /* creation nouveau panier local */
    localStorage.setItem('Panier',JSON.stringify(newBasket));
    console.log('Panier enregistré: ' + localStorage.getItem('Panier'));
    alert("L'article a été ajouté au panier");
}