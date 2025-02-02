import {saveToFavorites,getFavorites,removeFromFavorites} from "./localStorage.js";

let pokeID = 0;
const limitPokeID= 650; // to cap pokemon search to only 1-5gen
let searchInput = document.getElementById("search-navbar1");// for smaller screens
let searchInputlg = document.getElementById("search-navbar2");// for bigger screens
let pokeImg = document.getElementById("pokeImg");
let pokeImgShiny = document.getElementById("pokeImgShiny");
let pokeName = document.getElementById("pokeName");
let pokeType= document.getElementById("pokeType");
let pokeLocation=document.getElementById("pokeLocation");
let pokeAbilities = document.getElementById("pokeAbilities");
let pokeMoves = document.getElementById("pokeMoves");
let randomPokemonlink = document.getElementById("randomPokemonlink");
let starSolidIcon = document.getElementById("starSolidIcon");
let starRegularIcon = document.getElementById("starRegularIcon");
let evoPathHeader = document.getElementById("evoPathHeader");
let closeModalBtn = document.getElementById("closeModalBtn");
const favoriteitemsSection =document.getElementById("favoriteitemsSection"); // the whole div for ul




async function getPokemon(userInput){
            
            const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/`+userInput);
            const data = await promise.json();
        
                    pokeID = data.id;
                    console.log("POKE ID "+ `${data.id}`);
                    console.log("POKENAME "+ `${data.name}`);
        
                 
                    console.log("POKEIMG "+ `${data.sprites.other["official-artwork"].front_default}`);
                    console.log("POKE IMG SHINY "+ `${data.sprites.other["official-artwork"].front_shiny}`);
                    
                    //iterate through all types
                    let strType="N/A";
                    if (data.types.length>0)
                        {
                            strType = data.types.map(types=> types.type.name).join(', ');
                            data.types.map(types => console.log(`types: ${types.type.name}`));
                        }
                    else {
                        console.log ("Doesnt have type");
                    }
                    
                    //iterate through all abilities

                    let strAbilities ="N/A"
                    if (data.abilities.length>0)
                        {
                            
                            strAbilities = data.abilities.map(abilities=> abilities.ability.name).join(', ');
                            data.abilities.map(abilities => console.log(`abilities: ${abilities.ability.name}`));
                        }
                    else {
                        console.log ("Doesnt have ability");
                    }
                    
                    let strMoves  ="N/A";
                    if (data.moves.length>0)
                        {
                            strMoves = data.moves.map(moves=> moves.move.name).join(', ');
                            console.log(strMoves);
                        }
                        else {
                         
                            console.log("Doesnt have a move");
                        }
                   let  strLocation = getLocation(pokeID);
                
                        

        // display on the UI only if it is less than 650 (1-5 gen pokemon)
        if (pokeID<limitPokeID)
            {
               
                //display in UI
                pokeImg.src =data.sprites.other["official-artwork"].front_default;
                pokeImgShiny.src= data.sprites.other["official-artwork"].front_shiny;
                pokeName.innerText = (`# ${data.id}:  ${data.name}`).toUpperCase();
                pokeType.innerText =  strType;
                pokeLocation.innerText = await strLocation;
                pokeAbilities.innerText =strAbilities;
                pokeMoves.innerText =   strMoves;
                carouselSection.innerHTML = "";  // clear the image path
                getEvolutionPath(pokeID);

                let favoritesArr= getFavorites();
                if (favoritesArr.includes(pokeID))
                    {
                        starSolidIcon.classList.remove("inactive");
                        starRegularIcon.classList.add("inactive");
                        
                    }
                else{
                    starSolidIcon.classList.add("inactive");
                    starRegularIcon.classList.remove("inactive");
                    
                }


             //create an event listener for every star icon
             starSolidIcon.addEventListener( `click`,function(){
                 console.log("ENTER remove");
                 removeFromFavorites(pokeID);
                 starSolidIcon.classList.add("inactive");
                 starRegularIcon.classList.remove("inactive");
                 favoriteitemsSection.innerHTML="";
                 populateSidebar();
                });
                
                //create an event listener for every star icon
                starRegularIcon.addEventListener( `click`,function(){
                    console.log("ENTER add");
                    saveToFavorites(pokeID);
                     starSolidIcon.classList.remove("inactive");
                    starRegularIcon.classList.add("inactive");
                    favoriteitemsSection.innerHTML="";
                    populateSidebar();
            });

                

            }
            else{
            console.log("ERROR : You can only search pokemon from Gen 1-5");
            // Open the Flowbite modal
            const modal = document.getElementById("popup-modal");
            modal.classList.remove("hidden");
            modal.classList.add("flex"); 
         
            }

   
                

}          

async function getLocation(pokeID){

    const promise = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeID}/encounters`);
    const data = await promise.json();
    let strLocation="N/A";
    if (data.length>0)
        {
            console.log("LOC COUNT#" + data.length)
            strLocation = data.map(info=> info.location_area.name).join(', ');
            console.log(strLocation);
        }
        else 
        {console.log("NO LOCATION")};

        return strLocation;
}

async function getEvolutionPath(pokeID)
{
    
    const speciesPromise = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`);
    const speciesData = await speciesPromise.json();

    //get evolution path
    console.log(`EVO PATH : ${speciesData.evolution_chain.url}`);

    const evoPathPromise = await fetch(`${speciesData.evolution_chain.url}`);
    const evoPathData = await evoPathPromise.json();

    let evoPathArr= [];
    if (evoPathData.chain.evolves_to.length>0)
        {

            console.log(`BABY ${evoPathData.chain.species.name}`);
            evoPathArr.push(evoPathData.chain.species.name);
            for (let i =0 ; i< evoPathData.chain.evolves_to.length;i++)
                {   
                    evoPathArr.push(evoPathData.chain.evolves_to[i].species.name);
                    console.log(` EVOLVES 1st loop  ${evoPathData.chain.evolves_to[i].species.name}`);  
                    if (evoPathData.chain.evolves_to[i].evolves_to.length>0) 
                        {
                            for (let j=0; j < evoPathData.chain.evolves_to[i].evolves_to.length;j++)
                                {
                                    evoPathArr.push(evoPathData.chain.evolves_to[i].evolves_to[j].species.name);
                                    console.log(` EVOLVES 2nd loop  ${evoPathData.chain.evolves_to[i].evolves_to[j].species.name}`);  

                                    console.log(`${evoPathData.chain.evolves_to[i].evolves_to[j].evolves_to.length}`);   

                                    for (let k=0; k<evoPathData.chain.evolves_to[i].evolves_to[j].evolves_to.length;k++ )
                                        {
                                            evoPathArr.push(evoPathData.chain.evolves_to[i].evolves_to[j].evolves_to[k].species.name);
                                            console.log(` EVOLVES 3rd loop  ${evoPathData.chain.evolves_to[i].evolves_to[j].evolves_to[k].species.name}`);  

                                        }

                                }
                        }
                        else
                        {
                            console.log("no evolution path 2");
                        }
                    
                }
        }
        else {
            console.log("no evolution path 1");
        }

        console.log ("EVO PATHS:" +evoPathArr);
        
        
        // if no evolution path set it to N/A
        if (evoPathArr.length==0)
        { 
                    evoPathHeader.innerText= "EVOLUTION PATH: N/A"
        }
        //create element and display image of thhe pokemon evolution
        else{
            //reset header and generate img values
            evoPathHeader.innerText ="EVOLUTION PATH";
            for(let m=0;m<evoPathArr.length;m++)
                {
                
                    const pokeIdPromise= await fetch ("https://pokeapi.co/api/v2/pokemon/"+evoPathArr[m]);
                    console.log (evoPathArr[m]);
                    const pokeIdData = await pokeIdPromise.json();
    
                    let carouselSection = document.getElementById("carouselSection");
    
                    const imgDivItem=document.createElement("div"); 
              
                    
                    const evoImgItem = document.createElement("img");
                    evoImgItem.src=pokeIdData.sprites.other["official-artwork"].front_default;
               
                    evoImgItem.alt = pokeIdData.name;
                    imgDivItem.appendChild(evoImgItem);
                    carouselSection.appendChild(imgDivItem);
                    console.log("POKEEVOIMGS "+ pokeIdData.sprites.other["official-artwork"].front_default);
    
                    console.log(evoImgItem);
                    
                }
    
        }
     

         

            
}




//search bar for smaller screen
searchInput.addEventListener("keypress", (event)=>{
    if (event.key == "Enter"){
        console.log("DISPLAY"+ searchInput.value);
        console.log("ENTER");
        // Remove all child elements by clearing innerHTML
      
        getPokemon(searchInput.value);


    }

})

//search bar for large screens
searchInputlg.addEventListener("keypress", (event)=>{
    if (event.key == "Enter"){
        console.log("DISPLAY"+ searchInputlg.value);
        console.log("ENTER");
        // Remove all child elements by clearing innerHTML
      
        getPokemon(searchInputlg.value);


    }

})


randomPokemonlink.addEventListener('click',()=>{
   let randomNum = Math.floor(Math.random() * (limitPokeID - 1 + 1)) + 1;
   console.log(randomNum);
   getPokemon(randomNum);
})


async function populateSidebar()
{
    // clears the parent to avoid appending on the div everytime the favorites icon is clicked
    favoriteitemsSection.innerHTML="";
    console.log("FAVEITEM SECTION:" +favoriteitemsSection.innerHTML);
    let favoritesArr  =await getFavorites();
    console.log("FAVE ARR:"+favoritesArr);
    
    for (let j=0; j<favoritesArr.length ;j++) // displays items 
    {
        const pokeIdPromise= await fetch ("https://pokeapi.co/api/v2/pokemon/"+favoritesArr[j]);
        const pokeIdData = await pokeIdPromise.json();
    
    //creates an element on the fly for each item on the list of favoritesArr
  

        const favoriteSectionItem=document.createElement('li'); // favorite item  create
        favoriteSectionItem.classList.add("flex", "items-center", "p-2", "text-gray-900", "rounded-lg", "dark:text-white" ,"hover:bg-amber-100", "dark:hover:bg-amber-700", "group");
        
        // Create a <span> for the text to separate it from the icon
        const favoriteText = document.createElement('span');
        favoriteText.innerText = `${pokeIdData.name}`;
        favoriteText.classList.add("flex-1", "ms-3", "whitespace-nowrap")
        favoriteSectionItem.appendChild(favoriteText); // Add the text to the <li>

        
        //create an <i> for the icon
        const favoriteItemIcon = document.createElement('i');
        favoriteItemIcon.classList.add("fa-solid", "fa-star");


        favoriteSectionItem.appendChild (favoriteItemIcon);
        

        const removeFavoriteItemIcon = document.createElement('i');
        removeFavoriteItemIcon.classList.add("fa-regular", "fa-star","inactive");
      
        favoriteSectionItem.appendChild (removeFavoriteItemIcon);

        
        // Append the <li> to the parent container
        favoriteitemsSection.appendChild (favoriteSectionItem);

        //creates an event listener for each item in the list     
        favoriteText.addEventListener('click',function(){
            console.log("ENTER favorites"+favoritesArr[j]);
            getPokemon(favoritesArr[j]);
            // favoriteSection.classList.add("inactive");
            // currentSection.classList.remove("inactive");
            // forecastSection.classList.remove("inactive");
        
        });       

        //create an event listener for every bookmark icon
        favoriteItemIcon.addEventListener( `click`,function(){
            removeFromFavorites(favoritesArr[j]);
            console.log("ENTER remove");
            favoriteItemIcon.classList.add("inactive");
            removeFavoriteItemIcon.classList.remove("inactive");
        
        });

     }
}

closeModalBtn.addEventListener("click", function () {
    document.getElementById("popup-modal").classList.add("hidden");
});
getPokemon(1); //default pokemon is balbausar
populateSidebar();