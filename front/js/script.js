/* Script de l'affichage des produits sur la page d'accueil */
/* Définition du chemin d'accès à l'API */
const urlApi = "http://localhost:3000/api/products/";
/* requête fetch pour récupérer les datas des produits depuis l'API */
function contactApi() {
    fetch(urlApi)
        .then((response) =>response.json())
        .then((produit)=>{
            /* récupération des datas de chaque produit */
            for (i = 0; i < produit.length; i++) {
                const produitId=produit[i]._id;
                const produitImage=produit[i].imageUrl;
                const produitImageTexte=produit[i].altTxt;
                const produitNom=produit[i].name;
                const produitDescription=produit[i].description;

                affichageAllProducts(produitId, produitImage, produitImageTexte, produitNom, produitDescription);
            }
        })
    }
contactApi();
/* function de construction des éléments HTML dans la page d'accueil */
function affichageAllProducts(produitId, produitImage, produitImageTexte, produitNom, produitDescription) {
    const lienProduit=document.createElement('a');
    lienProduit.href='./product.html?id='+produitId;
    
    const newArticle=document.createElement('article');

    const imageProduit=document.createElement('img');
    imageProduit.src=produitImage;
    imageProduit.alt=produitImageTexte;

    const titreProduit=document.createElement('h3');
    titreProduit.classList.add('productName');
    titreProduit.textContent=produitNom;

    const descriptionProduit=document.createElement('p');
    descriptionProduit.classList.add('productDescription');
    descriptionProduit.textContent=produitDescription;

    newArticle.appendChild(imageProduit);
    newArticle.appendChild(titreProduit);
    newArticle.appendChild(descriptionProduit);
    lienProduit.appendChild(newArticle);

    const produitCard=document.getElementById('items');
    produitCard.appendChild(lienProduit);
}