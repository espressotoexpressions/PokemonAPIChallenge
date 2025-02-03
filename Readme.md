
// Submitted By: Karen Cadavos

// Date Revised: 02/02/2025

//Exercise Name: Pokedex API Challenge

// Brief Description of what I did:
using the Pokemon API https://pokeapi.co/
Ability to search by name and Pokedex Number
only Gen 1 - 5 pokemon
Ability to search by name and Pokedex Number
Ability to get a random pokemon
image of pokemon and shiny form
Pokemon Name
show 1 location from any game. If pokemon doesn't have a location, have it return "N/A"
Element Typing
All possible abilities
All possible moves
Show Evolutionary Paths, if pokemon doesn't have an evolutionary path, have it return "N/A"
And a Favorites list utilizing local storage
Fully Responsive using Tailwind CSS https://tailwindcss.com
Have a Prototype in Figma (Desktop, Tablet, Mobile)

Figma: https://www.figma.com/design/rcTeWu3FPbM376Tgv8ntvG/Karen-Anne-Cadavos's-team-library?node-id=3800-408&t=eHs5VaGCj6BHAlRz-1

//Peer Reviewed by: David Monterrosa
> Overall your application looks clean, simple, and meets most of the project requirements! Great use of flowbite modals for the out of bounds message. Your application is easy to navigate and I see no issues with accessibility as far as I can tell. However there are some functionality issues as you may already be aware. 
1. For one, your favorites list appears to display duplicate entries if the user favorites a pokemon, generates a random pokemon/ searches for a pokemon, and then favorites that pokemon. Interestingly, the actual local storage entries are not duplicated, so there is some issue with your function that creates the list items in the favorites list area. 
 - The favorites tab removes the duplicates when teh home button is clicked or when the page is refreshed. 
2. Another unexpected behavior is that if you favorite and then unfavorite a pokemon it removes that pokemon and whatever pokemon was favorited immediately before it from local storage. 
3. The other thing I noticed is that when you click on one of the fovorited pokemon in the favorites tab, go to its page, and then unfavorite it it empties local storage completely. 
4. Also removing a star from your favorited pokemon in the favorites area does not remove them from display. 
5. One issue with responsiveness that I noticed is that your home button disappears on screens smaller than 1695px wide.