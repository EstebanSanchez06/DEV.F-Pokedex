function goHome(){
    if(!searchPage.classList.contains('inactive')){
        searchPage.classList.add('inactive')
        header.classList.remove('inactive')
        searchHome.classList.remove('inactive')
        footer.classList.remove('inactive')
        pokemonContainer.classList.remove('inactive')        
        searchPokemonContainer.innerHTML=''
        searchPokemonContainer.classList.add('inactive')
        }
    if(!pokemonDetailsPage.classList.contains('inactive')){
        pokemonDetailsPage.classList.add('inactive')
        header.classList.remove('inactive')
        searchHome.classList.remove('inactive')
        footer.classList.remove('inactive')
        pokemonContainer.classList.remove('inactive')    
    }

}

function goSearchPage(){
    if(searchPage.classList.contains('inactive')){
        searchPage.classList.remove('inactive')
        header.classList.add('inactive')
        searchHome.classList.add('inactive')
        footer.classList.add('inactive')
        pokemonContainer.classList.add('inactive')
        searchPokemonContainer.classList.remove('inactive')
        console.log(homeSearchInput.value)
        getSearchPokemons(homeSearchInput.value)
    }
}

function goDetailsPage(){
    if(searchPage.classList.contains('inactive')){
        header.classList.add('inactive')
        searchHome.classList.add('inactive')
        footer.classList.add('inactive')
        pokemonContainer.classList.add('inactive')

        pokemonDetailsPage.classList.remove('inactive')
    }else{
        searchPage.classList.add('inactive')
        searchPokemonContainer.classList.add('inactive')
        pokemonDetailsPage.classList.remove('inactive')
    }
}