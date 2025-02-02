function saveToFavorites(pokeId) {
    //get the current values that are saved into local storage
  
    let pokeArr = getFavorites();

    //add new name into our pokeArr array
    if (!pokeArr.includes(pokeId)) {
        pokeArr.push(pokeId);
    }
    

    //save updated array to local storage
    //JSON.stringify: Converts the array (or object) into a JSON string that can be stored in local storage.
    localStorage.setItem('PokeIds', JSON.stringify(pokeArr));

}



function getFavorites(){
    // get all of the values that are stored in cityArr in local storage
    let favoritesData = localStorage.getItem('PokeIds');
    // console.log("FAVORITES DATA" +JSON.stringify(favoritesData));

    if (favoritesData == null) {
        return [];
    }
    //JSON.parse: Converts the JSON string back into an array (or object) so you can work with it.
    return JSON.parse(favoritesData);
}

function removeFromFavorites(pokeId){
    let pokeArr = getFavorites();

    // find the index of the name in local storage

    let pokeIdIndex = pokeArr.indexOf(pokeId);

    //remove the name from the array using the splice method.
    //Start at the index of name and remove 1 item
    pokeArr.splice(pokeIdIndex, 1);

    // save updated array to local storage
    localStorage.setItem('PokeIds', JSON.stringify(pokeArr));
}


export{saveToFavorites, getFavorites,removeFromFavorites}