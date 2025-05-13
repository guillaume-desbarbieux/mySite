
// Ajoute au feed un bloc contenant le texte de Joke
function addJoke(joke) {


    // Récupération du noeud de joke-list
    const jokeList = document.getElementById("joke-list");

    // Récupération du texte de Joke
    const text = JokeToText(joke);

    // Création nouvel élément div
    const newDiv = document.createElement("div");

    // Initialisation nouvel élément div
    newDiv.innerHTML = `<div>
                          <p>${text}</p>
                       </div> `;

    if (joke.source === "user") {
        newDiv.classList.add("user");
    };

    // Récupération de la première joke de la liste
    const firstJoke = jokeList.firstChild;

    // On insère la div créée juste avant la première joke
    jokeList.insertBefore(newDiv, firstJoke);

    hideOverflowList(jokeList.children, 10);
    refreshUserAdd();

}


// Récupère et renvoie le texte de l'objet Joke (selon type)
function JokeToText(objet) {

    let jokeText = "";

    if (objet.type === 'single') {
        jokeText = objet.joke;
    } else {
        jokeText = objet.setup + "\n" + objet.delivery;
    }
    return jokeText;
}


// Récupération depuis l'API et appel addJoke
function getJoke() {
    fetch("https://v2.jokeapi.dev/joke/Any?lang=fr")
        .then(objet => objet.json())
        .then(result => addJoke(result));
};


// Récupération du bouton ajouter par l'ID
const addFeedButton = document.getElementById("btn-add-feed");

// le clic sur le bouton appelle la fonction getJoke
if (addFeedButton) {
    addFeedButton.addEventListener("click", () => {
        getJoke();
    });
};

// Récupération du bouton refresh par l'ID
const removeFeedButton = document.getElementById("btn-remove-feed");

// le clic sur le bouton appelle la fonction getJoke
if (removeFeedButton) {
    removeFeedButton.addEventListener("click", () => {
        removeFeed();
    });
};

// la fonction vide la liste des joke
function removeFeed() {
    // Récupération du noeud de joke-list
    const jokeList = document.getElementById("joke-list");

    jokeList.innerHTML = "";
}


// Fonction qui cache les éléments en surnombre dans une liste (paramètre max prend valeur 20 par défaut)
function hideOverflowList(list, max = 20) {

    let iterator = 0;

    for (div of list) {


        if (iterator < max) {
            div.classList.remove("hidden");
        } else {
            div.classList.add("hidden");
        }
        iterator++;
    }

    return list;
}


// récupération du bouton Menu par l'ID
const menuButton = document.getElementById("bloc-btn-menu");

// le clic sur le bouton Menu appelle la fonction menu
menuButton.addEventListener("click", clicOnMenu);


// la fonction change l'état des sous menus (hidden ou non)
function clicOnMenu() {

    const listeMenu = document.getElementById("liste-btn-menu").children;

    for (let el of listeMenu) {
        if (isHidden(el)) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    }
}

// La fonction renvoie un booléen : "hidden" est une des classe de la div en paramètre
function isHidden(div) {

    for (let classe of div.classList) {
        if (classe == "hidden") {
            return true;
        }
    }
    return false;
}

// récupération du bouton form par l'ID
const formButton = document.getElementById("btn-form-feed");

// le clic sur le bouton form appelle la fonction form
if (formButton) {
    formButton.addEventListener("click", clicOnForm);
}

// la fonction change l'état du formulaire (hidden ou non)
function clicOnForm() {

    const blocForm = document.getElementById("bloc-form");
    if (isHidden(blocForm)) {
        blocForm.classList.remove("hidden");
    } else {
        blocForm.classList.add("hidden");
    }
}

// récupération du bouton par l'ID
const submitform = document.getElementById("submit-form");

// le clic sur le bouton submit appelle la fonction submit form
if (submitform) {
    submitform.addEventListener("click", submitFeedForm);
}
// récupération du bouton par l'ID
const resetform = document.getElementById("reset-form");

// le clic sur le bouton reset appelle la fonction reset form
if (resetform) {
    resetform.addEventListener("click", resetFeedForm);
}

function resetFeedForm() {
    document.getElementById("jokeFromForm").value = "";
}


//La fonction récupère les entrées du formulaire et les envoie à addJoke
function submitFeedForm() {

    const textForm = document.getElementById("jokeFromForm");

    if (textForm.value) {
        const jokeFromForm = {
            type: "single",
            joke: textForm.value,
            source: "user",
        }

        addJoke(jokeFromForm);
        resetFeedForm();
    }
}



// récupération du bouton par l'ID
const mosaicView = document.getElementById("btn-view-mosaic");

// récupération du bouton par l'ID
const zoomOutView = document.getElementById("btn-view-out");

// récupération du bouton par l'ID
const zoomInView = document.getElementById("btn-view-in");

// récupération du bouton par l'ID
const columnView = document.getElementById("btn-view-column");

// le clic sur le bouton mosaic appelle la fonction zoom
if (mosaicView) {
    mosaicView.addEventListener("click", () => zoomView('min'));
}

// le clic sur le bouton submit appelle la fonction submit form
if (zoomOutView) {
    zoomOutView.addEventListener("click", () => zoomView('out'));
}

// le clic sur le bouton submit appelle la fonction submit form
if (zoomInView) {
    zoomInView.addEventListener("click", () => zoomView('in'));
}

// le clic sur le bouton submit appelle la fonction submit form
if (columnView) {
    columnView.addEventListener("click", () => zoomView('max'));
}



// fonction zoomView modifie la largeur d'affichage de chaque immage selon paramètre d'entrée
function zoomView(zoom) {

    const listeImages = document.getElementById("img-list").children;

    let largeur = parseInt(listeImages[0].style.width);
    if (isNaN(largeur)) {
        largeur = 30;
    }

    switch (zoom) {
        case 'min':
            largeur = 10;
            break;
        case 'out':
            largeur = largeur - 10;
            break;
        case 'in':
            largeur = largeur + 10;
            break;
        case 'max':
            largeur = 90;
            break;
    }

    if (largeur > 90) { (largeur = 90); };
    if (largeur < 10) { (largeur = 10); };

    largeur = `${largeur}vw`;


    for (el of listeImages) {
        el.style.width = largeur
    }
}

// Initialisation au chargement
if (document.getElementById("img-list")) {
    zoomView('out');
}

// récupération du bouton par l'ID
const btnAddImg = document.getElementById("btn-add-img");

// le clic sur le bouton btnAddImg appelle la fonction addImg
if (btnAddImg) {
    btnAddImg.addEventListener("click", addImg);
}

// La fonction récupère le chemin de l'image entré par l'utilisateur et l'ajoute dans la galerie
function addImg() {

    const webPath = document.getElementById("inputUrlImg").value;
    const file = document.getElementById("inputLocalImg").files[0];
    let path = 0;

    if (webPath) {
        if (isURL(webPath)) {
            path = webPath;
        } else {
            alert("URL invalide.");
            resetAddImage()
        }
    }

    if (file) {
        if (file.type.includes("image")) {
            path = URL.createObjectURL(file);
        } else {
            alert("Ce fichier n'est pas une image.")
            resetAddImage()
        }
    }

    if (path) {
        // Récupération du noeud de img-list
        const imgList = document.getElementById("img-list");

        // Récupération de la première image de la liste
        const firstImg = imgList.firstChild;

        // Création nouvel élément img
        const newImg = document.createElement("img");

        // Initialisation nouvel élément img
        newImg.setAttribute('src', `${path}`);
        newImg.style.width = imgList.children[0].style.width;
        newImg.classList.add("user");

        // On insère la div créée juste avant la première image
        imgList.insertBefore(newImg, firstImg);
        resetAddImage();
        refreshUserAdd()

    }
}

function resetAddImage() {
    document.getElementById("inputUrlImg").value = "";
    document.getElementById("inputLocalImg").value = "";
}

function isURL(lien) {
    try {
        new URL(lien);
    } catch (e) {
        return false;
    }
    return true;
}

function refreshUserAdd() {
    let userAdd = document.getElementsByClassName("user");

    for (el of userAdd) {
        console.log(el);
        el.addEventListener("click", suppElement);
    };
}


// La fonction récupère le chemin de l'image entré par l'utilisateur et l'ajoute dans la galerie
function suppElement() {
    this.remove();
    hideOverflowList(document.getElementById("joke-list").children, 10);

}
let slideIndex = 0;
function showPublicite() {
    let slides = document.getElementById("publicite").children;
    for (slide of slides) {
        slide.style.display = "none";
    }
    slides[slideIndex].style.display = "block";

    slideIndex = (slideIndex + 1) % slides.length;
    console.log(slides.length, " ", slideIndex);
}
if (document.getElementById("publicite")) {
    showPublicite();
    setInterval(showPublicite, 3000);
}

// récupération du bouton Niveau de difficilté par l'ID
const memoryButtonDifficulte = document.getElementById("btn-difficulte");

// le clic sur le bouton Niveau de difficilté appelle la fonction choixDifficulte
memoryButtonDifficulte.addEventListener("click", choixDifficulte);


// la fonction change l'état des sous menus niveaux de difficultés (hidden ou non)
function choixDifficulte() {

    const listeNiveaux = document.getElementById("liste-btn-difficulte").children;

    for (let el of listeNiveaux) {
        if (isHidden(el)) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    }
}


// récupération du bouton Niveau facile par l'ID
const memoryButtonFacile = document.getElementById("btn-facile");

// le clic sur le bouton Niveau de difficilté appelle la fonction choixDifficulte
memoryButtonFacile.addEventListener("click", () => playMemory('facile'));

// récupération du bouton Niveau moyen par l'ID
const memoryButtonMoyen = document.getElementById("btn-moyen");

// le clic sur le bouton Niveau de difficilté appelle la fonction choixDifficulte
memoryButtonMoyen.addEventListener("click", () => playMemory('moyen'));

// récupération du bouton Niveau facile par l'ID
const memoryButtonDifficile = document.getElementById("btn-difficile");

// le clic sur le bouton Niveau de difficilté appelle la fonction choixDifficulte
memoryButtonDifficile.addEventListener("click", () => playMemory('difficile'));

function playMemory(level) {
    let nbPaires = 0;
    let lienApi = "";
    choixDifficulte();

    switch (level) {
        case 'facile':
            nbPaires = 5;
            lienApi = "https://mocki.io/v1/f3ce40d6-4423-4de6-a4d1-45bc5ba25251";
            break;
        case 'moyen':
            nbPaires = 15;
            lienApi = "https://mocki.io/v1/57775561-3329-4298-b2b6-9c9232270e32";
            break;
        case 'difficile':
            nbPaires = 25;
            lienApi = "https://mocki.io/v1/66ffedd0-79a6-4750-a21b-a6ad5876a4f7";
            break;
    }

    let nbTentatives = 2 * nbPaires;
    console.log(nbPaires, " en ", nbTentatives);


    fetch(lienApi).then(objet => objet.json()).then(result => console.log(result));
}








