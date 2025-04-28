

async function getJoke() {

    // Récupération de la blague depuis l'API
    const reponse = await fetch("https://v2.jokeapi.dev/joke/Any?lang=fr");

    // Récupération de la réponse en Json
    const joke = await reponse.json();
  
    const jokeList = document.getElementById("joke-list");

    // Vérification du type de joke
    if (joke.type === "single") {
        jokeList.append(joke.joke);
     } else {
        jokeList.append(`${joke.setup} <br> ${joke.delivery}`);
    }

}


// Appel de la fonction pour afficher la blague
getJoke();
