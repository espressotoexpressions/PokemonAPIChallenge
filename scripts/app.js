let pokeID = 0;
const limitPokeID= 650; // to cap pokemon search to only 1-5gen
let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("default-search");

console.log(searchInput.innerText);

async function getPokemon(userInput){

            const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/`+userInput);
            const data = await promise.json();
        
                    pokeID = data.id;
                    console.log("POKE ID "+ `${data.id}`);
                    console.log("POKENAME "+ `${data.name}`);
        
                    //couldnt find this data official-artwork?
                    // console.log("IMG "+ `${data.sprites.other.official-artwork.front_shiny}`); /
                    console.log("POKEIMG "+ `${data.sprites.other["official-artwork"].front_default}`);
                    console.log("POKE IMG SHINY "+ `${data.sprites.other["official-artwork"].front_shiny}`);
                    
                    //iterate through all types
                    if (data.types.length>0)
                        {
        
                            data.types.map(types => console.log(`types: ${types.type.name}`));
                        }
                    else {
                        console.log ("Doesnt have type");
                    }
                    
                    //iterate through all abilities
                    if (data.abilities.length>0)
                        {
                            // console.log(data.abilities[0]);
                       
                            data.abilities.map(abilities => console.log(`abilities: ${abilities.ability.name}`));
                        }
                    else {
                        console.log ("Doesnt have ability");
                    }
        
                    if (data.moves.length>0)
                        {
                           let strMoves = data.moves.map(moves=> moves.move.name).join(', ');
                            console.log(strMoves);
                        }
                        else {
                            console.log("Doesnt have a move");
                        }
        
                        

        // display on the UI only if it is less than 650 (1-5 gen pokemon)
        if (pokeID<limitPokeID)
            {
                //display in UI
                getLocation(pokeID);
                getEvolutionPath(pokeID);

            }
            else{
                console.log("ERROR : You can only search pokemon from Gen 1-5");

            }

   
                

}          

async function getLocation(pokeID){
   
    const promise = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeID}/encounters`);
    const data = await promise.json();

    if (data.length>0)
        {

            console.log(`LOCATION : ${data[0].location_area.name}`);
        }
        else 
        {console.log("NO LOCATION")};
}

async function getEvolutionPath(pokeID)
{

    const speciesPromise = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`);
    const speciesData = await speciesPromise.json();

    //get evolution path
    console.log(`EVO PATH : ${speciesData.evolution_chain.url}`);

    const evoPathPromise = await fetch(`${speciesData.evolution_chain.url}`);
    const evoPathData = await evoPathPromise.json();

    if (evoPathData.chain.evolves_to.length>0)
        {

            console.log(`BABY ${evoPathData.chain.species.name}`);

            for (let i =0 ; i< evoPathData.chain.evolves_to.length;i++)
                {   
                    
                    console.log(` EVOLVES 1st loop  ${evoPathData.chain.evolves_to[i].species.name}`);  
                    if (evoPathData.chain.evolves_to[i].evolves_to.length>0) 
                        {
                            for (let j=0; j < evoPathData.chain.evolves_to[i].evolves_to.length;j++)
                                {
                                    console.log(` EVOLVES 2nd loop  ${evoPathData.chain.evolves_to[i].evolves_to[j].species.name}`);  

                                    console.log(`${evoPathData.chain.evolves_to[i].evolves_to[j].evolves_to.length}`);   

                                    for (let k=0; k<evoPathData.chain.evolves_to[i].evolves_to[j].evolves_to.length;k++ )
                                        {
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



    
}




searchBtn.addEventListener('click', ()=>{
console.log("DISPLAY"+ searchInput.value);
    console.log("ENTER");
    getPokemon(searchInput.value);
})