
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

    // Récupération de la première joke de la liste
    const firstJoke = jokeList.firstChild;

    // On insère la div créée juste avant la première joke
    jokeList.insertBefore(newDiv, firstJoke);

    hideOverflowList(jokeList.children, 10);

}


// Récupère et renvoie le texte de l'objet Joke (selon type)
function JokeToText(objet) {

    let jokeText = "";

    if (objet.type === 'single') {
        jokeText = objet.joke;
    } else {
        jokeText = objet.setup + "\n" + objet.delivery;
    }
    console.log(jokeText);
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
        console.log("appel getJoke");
        getJoke();
    });
};

// Récupération du bouton refresh par l'ID
const removeFeedButton = document.getElementById("btn-remove-feed");

// le clic sur le bouton appelle la fonction getJoke
if (removeFeedButton) {
    removeFeedButton.addEventListener("click", () => {
        console.log("appel removeFeed");
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

    console.log(list);

    let iterator = 0;

    for (div of list) {


        if (iterator < max) {
            div.classList.remove("hidden");
        } else {
            div.classList.add("hidden");
        }


        iterator++;
        console.log("iterator = " + iterator);
        console.log("div = " + div);
        console.log("hidden = " + div.hidden);

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

    console.log("is hidden ?");

    for (let classe of div.classList) {
        if (classe == "hidden") {
            console.log("true");
            return true;
        }
    }
    console.log("false");
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
    console.log("avant" + blocForm.classList);
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
mosaicView.addEventListener("click", () => zoomView('min'));

// le clic sur le bouton submit appelle la fonction submit form
zoomOutView.addEventListener("click", () => zoomView('out'));

// le clic sur le bouton submit appelle la fonction submit form
zoomInView.addEventListener("click", () => zoomView('in'));

// le clic sur le bouton submit appelle la fonction submit form
columnView.addEventListener("click", () => zoomView('max'));




// fonction zoomView modifie la largeur d'affichage de chaque immage selon paramètre d'entrée
function zoomView(zoom) {

    const listeImages = document.getElementById("img-list").children;
    console.log(listeImages[0].style.width);
    console.log(listeImages[0]);

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
    console.log(listeImages[0].style.width);
    console.log(listeImages[0]);
}

// Initialisation au chargement
zoomView('out');

// récupération du bouton par l'ID
const btnAddImg = document.getElementById("btn-add-img");

// le clic sur le bouton btnAddImg appelle la fonction addImg
btnAddImg.addEventListener("click", addImg);

// La fonction récupère le chemin de l'image entré par l'utilisateur et l'ajoute dans la galerie
function addImg() {

    const webPath = document.getElementById("inputUrlImg").value;
    const file = document.getElementById("inputLocalImg").files[0];
    console.log(file);
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
        console.log("création img");
        console.log(path);
        // Récupération du noeud de img-list
        const imgList = document.getElementById("img-list");

        // Récupération de la première image de la liste
        const firstImg = imgList.firstChild;
        console.log(firstImg);

        // Création nouvel élément img
        const newImg = document.createElement("img");

        // Initialisation nouvel élément img
        newImg.setAttribute('src', `${path}`);
        newImg.style.width = imgList.children[0].style.width;

        // On insère la div créée juste avant la première image
        imgList.insertBefore(newImg, firstImg);
        resetAddImage();

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