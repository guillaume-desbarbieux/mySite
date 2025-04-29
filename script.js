
// Ajoute au feed un bloc contenant le texte de Joke
function addJoke(joke) {


    // Récupération du texte de Joke
    const text = JokeToText(joke);

    // Création nouvel élément div
    const newDiv = document.createElement("div");

    // Création du nouveau noeud texte
    const newContent = document.createTextNode(text);

    // On attache le noeud texte à la div créée
    newDiv.appendChild(newContent);

    // Récupération du noeud de joke-list
    const jokeList = document.getElementById("joke-list");

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

    return jokeText;
}


// Récupération depuis l'API et appel addJoke
function getJoke() {
    fetch("https://v2.jokeapi.dev/joke/Any?lang=fr")
        .then(objet => objet.json())
        .then(result => addJoke(result));
};


// Récupération du bouton refresh par l'ID
const refreshFeedButton = document.getElementById("btn-refresh-feed");



// le clic sur le bouton appelle la fonction getJoke
refreshFeedButton.addEventListener("click", () => {
    console.log("appel getJoke");
    getJoke();
});


// Fonction qui cache les éléments en surnombre dans une liste (paramètre max prend valeur 20 par défaut)
function hideOverflowList(list, max = 20) {

    console.log(list);

    let iterator = 0;

    for (div of list) {
          iterator++;

        if (iterator < max) {
            div.className = "display";
        }
        else {
            div.className = "hidden";
            
        }
        console.log("iterator = " + iterator);
        console.log("div = " + div);
        console.log("hidden = " + div.hidden);

    }

    return list;
}