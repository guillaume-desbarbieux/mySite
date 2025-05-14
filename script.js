
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
    for (let i = 1; i < 6; i++) {
        getJoke();
    };
}

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

// le clic sur le bouton Niveau de difficilté appelle la fonction callMemoryAPI
memoryButtonFacile.addEventListener("click", () => callMemoryAPI('facile'));

// récupération du bouton Niveau moyen par l'ID
const memoryButtonMoyen = document.getElementById("btn-moyen");

// le clic sur le bouton Niveau de difficilté appelle la fonction callMemoryAPI
memoryButtonMoyen.addEventListener("click", () => callMemoryAPI('moyen'));

// récupération du bouton Niveau facile par l'ID
const memoryButtonDifficile = document.getElementById("btn-difficile");

// le clic sur le bouton Niveau de difficilté appelle la fonction callMemoryAPI
memoryButtonDifficile.addEventListener("click", () => callMemoryAPI('difficile'));

// Appel API selon difficulté choisie puis apelle setMemoryPlateau
function callMemoryAPI(level) {
    let lienApi = "";
    choixDifficulte();

    switch (level) {
        case 'facile':
            lienApi = "https://mocki.io/v1/f3ce40d6-4423-4de6-a4d1-45bc5ba25251";
            break;
        case 'moyen':
            lienApi = "https://mocki.io/v1/57775561-3329-4298-b2b6-9c9232270e32";
            break;
        case 'difficile':
            lienApi = "https://mocki.io/v1/66ffedd0-79a6-4750-a21b-a6ad5876a4f7";
            break;
    }

    fetch(lienApi).then(objet => objet.json()).then(result => setMemoryPlateau(result));
}


// Efface le plateau précédent / crée une liste des images depuis objet API
// crée les div cellule et div card et affecte aléatoirement une image pour chacune
//

function setMemoryPlateau(objet) {

    const containerPlateau = document.getElementById("plateauMemory");

    while (containerPlateau.firstChild) {
        containerPlateau.removeChild(containerPlateau.firstChild);
    }

    let listeImages = Object.values(objet.images);
    listeImages = listeImages.concat(listeImages);

    const hauteur = 5;
    const largeur = listeImages.length / 5;

    for (let i = 0; i < largeur; i++) {
        let ligne = document.createElement("div");

        for (let j = 0; j < hauteur; j++) {

            let cellule = document.createElement("div");
            cellule.className = "cellule";

            let card = document.createElement("div");

            card.className = "hiddenCard";
            card.addEventListener("click", returnCard);

            let k = Math.floor(Math.random() * listeImages.length);
            card.innerText = listeImages[k]
            listeImages.splice(k, 1);

            cellule.appendChild(card);
            ligne.appendChild(cellule);
        }
        containerPlateau.appendChild(ligne);
    }
}

function returnCard() {

    const currentCard = this;
    const message = document.getElementById("message");

    const listFalseCard = document.getElementsByClassName("falseCard");

    if (listFalseCard.length == 2) {
        let card1 = listFalseCard[0];
        let card2 = listFalseCard[1];
        card1.className = "hiddenCard";
        card2.className = "hiddenCard";
    }

    if (currentCard.className = "hiddenCard") {
        currentCard.className = "guessingCard";




        let listGuessingCard = document.getElementsByClassName("guessingCard");

        if (listGuessingCard.length == 2) {
            let card1 = listGuessingCard[0];
            let card2 = listGuessingCard[1];

            if (card1.innerText == card2.innerText) {
                card1.className = "foundCard";
                card2.className = "foundCard";
            } else {
                card1.className = "falseCard";
                card2.className = "falseCard";
            }
        }
    }
    const listFoundCard = document.getElementsByClassName("foundCard");
    const listCard = document.getElementsByClassName("cellule");


    if (listFoundCard.length == listCard.length) {
        message.innerText = "Félicitations !";
    }

}



// essai dvp memory avec nouvelle méthode (orienté objet)


// récupération du bouton Niveau de difficilté par l'ID
const memoButtonDifficulte = document.getElementById("memo-btn-difficulte");

// le clic sur le bouton Niveau de difficilté appelle la fonction choixDifficulte
memoButtonDifficulte.addEventListener("click", memoChoixDifficulte);


// la fonction change l'état des sous menus niveaux de difficultés (hidden ou non)
function memoChoixDifficulte() {

    const listeNiveaux = document.getElementById("memo-liste-btn-difficulte").children;

    for (let el of listeNiveaux) {
        if (isHidden(el)) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    }
}


// récupération du bouton Niveau facile par l'ID
const memoButtonFacile = document.getElementById("memo-btn-facile");

// le clic sur le bouton Niveau de difficilté appelle la fonction callMemoryAPI
memoButtonFacile.addEventListener("click", () => callMemoAPI('facile'));

// récupération du bouton Niveau moyen par l'ID
const memoButtonMoyen = document.getElementById("memo-btn-moyen");

// le clic sur le bouton Niveau de difficilté appelle la fonction callMemoryAPI
memoButtonMoyen.addEventListener("click", () => callMemoAPI('moyen'));

// récupération du bouton Niveau facile par l'ID
const memoButtonDifficile = document.getElementById("memo-btn-difficile");

// le clic sur le bouton Niveau de difficilté appelle la fonction callMemoryAPI
memoButtonDifficile.addEventListener("click", () => callMemoAPI('difficile'));

// Appel API selon difficulté choisie puis apelle setMemoryPlateau
function callMemoAPI(level) {
    let lienApi = "";
    choixDifficulte();

    switch (level) {
        case 'facile':
            lienApi = "https://mocki.io/v1/f3ce40d6-4423-4de6-a4d1-45bc5ba25251";
            break;
        case 'moyen':
            lienApi = "https://mocki.io/v1/57775561-3329-4298-b2b6-9c9232270e32";
            break;
        case 'difficile':
            lienApi = "https://mocki.io/v1/66ffedd0-79a6-4750-a21b-a6ad5876a4f7";
            break;
    }

    fetch(lienApi).then(objet => objet.json()).then(result => setMemo(result));
}

function setMemo(objet) {

    const divPlateauMemo = document.getElementById("plateauMemo")

    // Récupération des images et doublement de chaque
    let listeImages = Object.values(objet.images);
    listeImages = listeImages.concat(listeImages);

    console.log("ma liste ", listeImages);

    const listeImagesMelangees = new Array;

    console.log("ma liste melangée ", listeImagesMelangees);

    while (listeImages.length > 0) {
        let k = Math.floor(Math.random() * listeImages.length);
        console.log(listeImages, k);
        listeImagesMelangees.push(listeImages[k]);
        listeImages.splice(k, 1);
    }
    console.log(listeImagesMelangees);

    // Objet qui contient toutes les infos du jeu
    const memoGame = {
        status: "playing",
        tentatives: 0,
        guessing: [],
        cards: [],
        click: function (clicID) {
            console.log("clic sur ", clicID);
            if (memoGame.status == "playing") {

                if (memoGame.guessing.length == 2) {
                    memoGame.clean();
                }

                let currentCard;
                for (card of memoGame.cards) {
                    if (card.id == clicID) {
                        currentCard = card;
                    }
                }

                if (currentCard.status == "hidden") {
                    currentCard.return();
                    console.log("test ", memoGame.guessing);
                    memoGame.guessing.push(currentCard.image);

                    if (memoGame.guessing.length == 2) {
                        memoGame.tentatives = memoGame.tentatives + 1;
                        if (memoGame.guessing[0] == memoGame.guessing[1]) {
                            memoGame.success();
                        } else {
                            memoGame.failure();
                        }
                    }
                }
            }
        },
        success: function () {
            console.log("success");
            for (card of memoGame.cards) {
                if (card.status == "guessing") {
                    card.found();
                }
            }
        },
        failure: function () {
            console.log("failure");

            for (card of memoGame.cards) {
                if (card.status == "guessing") {
                    card.error();
                }
            }
        },
        clean: function () {
            console.log("clean");

            for (card of memoGame.cards) {
                card.clean();
                memoGame.guessing = [];
            }
        },
    }

    // On boucle pour créer chaque carte
    for (let i = 0; i < listeImagesMelangees.length; i++) {
        const card = {
            id: i,
            image: listeImagesMelangees[i],
            color: "black",
            status: "hidden",
            display: "none",
            return: function () {
                console.log("return");

                this.status = "guessing";
                this.color = "yellow";
                this.display = "block";
                displayMemo(memoGame, divPlateauMemo);
            },
            found: function () {
                console.log("found", this.id);

                this.status = "found",
                    this.color = "green";
                this.display = "block";
                displayMemo(memoGame, divPlateauMemo);
            },
            error: function () {
                console.log("error", this.id);

                this.status = "error";
                this.color = "red";
                this.display = "block";
                displayMemo(memoGame, divPlateauMemo);
            },
            clean: function () {
                console.log("cardclean", this.id);

                if (this.status == "error") {
                    this.status = "hidden";
                    this.color = "black";
                    this.display = "none";
                    displayMemo(memoGame, divPlateauMemo);
                }
            }
        };
        memoGame.cards.push(card);
    }
    console.log("mémoGame ", memoGame);
    console.log(document.getElementById("plateauMemo"));
    displayMemo(memoGame, divPlateauMemo);
}

function displayMemo(memoGame, memoDiv) {
    // On efface le plateau de jeu
    while (memoDiv.firstChild) {
        memoDiv.removeChild(memoDiv.firstChild);
    };

    // On boucle pour chaque carte pour créer les Div
    for (card of memoGame.cards) {
        const cardDiv = document.createElement("div");
        const imgDiv = document.createElement("div");

        cardDiv.style.backgroundColor = card.color;
        cardDiv.id = card.id;
        cardDiv.className = "memoCard";
        cardDiv.addEventListener("click", () => memoGame.click(cardDiv.id));

        imgDiv.style.display = card.display;
        imgDiv.innerText = card.image;
        imgDiv.className = "memoImg";

        cardDiv.appendChild(imgDiv);
        memoDiv.appendChild(cardDiv);
    }

    const message = document.getElementById("memoMessage");
    message.innerText = `nombres de tentatives : ${memoGame.tentatives}`;
}