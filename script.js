
// Ajoute au feed un bloc contenant le texte de Joke
function addJoke(joke) {


    // Récupération du noeud de joke-list
    const jokeList = document.getElementById("joke-list");

    // Récupération du texte de Joke
    const text = JokeToText(joke);

    // Création nouvel élément div
    const newDiv = document.createElement("div");

    // Création nouvel élément div
    newDiv.innerHTML = `<div>
                          <p>${text}</p>
                       </div> `;
    console.log(newDiv);
    console.log(newDiv.innerHTML);


    /*
    // Création du nouveau noeud texte
    const newContent = document.createTextNode(text);

    // On attache le noeud texte à la div créée
    newDiv.appendChild(newContent);
    */


    // Récupération de la première joke de la liste
    const firstJoke = jokeList.firstChild;

    // On insère la div créée juste avant la première joke
    jokeList.insertBefore(newDiv, firstJoke);

    console.log("jokeList");
    console.log(jokeList.children);

    console.log(jokeList);

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

// récupération du bouton Menu par l'ID
const formButton = document.getElementById("btn-form-feed");

// le clic sur le bouton Menu appelle la fonction form
formButton.addEventListener("click", clicOnForm);


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
submitform.addEventListener("click", submitFeedForm);

// récupération du bouton par l'ID
const resetform = document.getElementById("reset-form");

// le clic sur le bouton reset appelle la fonction reset form
resetform.addEventListener("click", resetFeedForm);

function resetFeedForm() {
    document.getElementById("jokeFromForm").value="";
}


//La fonction récupère les entrées du formulaire et les envoie à addJoke
function submitFeedForm() {

    const textForm = document.getElementById("jokeFromForm");
    if (textForm) {
        const jokeFromForm = {
            type: "single",
            joke: textForm.value,
        }

        console.log("apres");
        console.log(jokeFromForm);
        console.log(textForm.value);

        addJoke(jokeFromForm);
        resetFeedForm();
    }
}


