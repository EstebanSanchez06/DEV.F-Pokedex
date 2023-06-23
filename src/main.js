const URL_API= 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=10'
async function getPokemons (url){
    const res = await fetch(url)
    const data = await res.json()
    const pokemons= await data.results
    return pokemons
}

async function getPokemonCharacteristics(pokemon){
    const res = await fetch (pokemon.url)
    const data = await res.json()
    return data
}


async function pokemonCards(url){
    const pokemons = await getPokemons(url)
    pokemons.forEach(pokemon => {
        async function pokemonCreateCard(){
            const pokemonCharacteristics = await getPokemonCharacteristics(pokemon)

            const pokemonCard= document.createElement('article')
            pokemonCard.classList.add('pokemon-card')
            pokemonCard.style.background= `radial-gradient(circle at 50% 0%, var(--${pokemonCharacteristics.types[0].type.name}) 36%, var(--white-card) 36%)`
            //Imágen
            const pokemonImg= document.createElement('img')
            pokemonImg.classList.add('pokemon-card--img')
            pokemonImg.src= pokemonCharacteristics.sprites.front_default
            //Nombre
            const pokemonName= document.createElement('h2')
            pokemonName.classList.add('pokemon-card--name')
            pokemonName.textContent= pokemonCharacteristics.species.name
            //Types
            const pokemonTypes = document.createElement('div')
            if(pokemonCharacteristics.types.length == 1){
                pokemonTypes.classList.add('pokemon-card--types')
                const pokemonType1= document.createElement('span')
                pokemonType1.textContent= pokemonCharacteristics.types[0].type.name
                pokemonType1.style.backgroundColor = `var(--${ pokemonCharacteristics.types[0].type.name})`
                pokemonTypes.appendChild(pokemonType1)
            }
            if(pokemonCharacteristics.types.length == 2){
                for(let i=0; i< pokemonCharacteristics.types.length;i++){
                    pokemonTypes.classList.add('pokemon-card--types')
                    const pokemonType1= document.createElement('span')
                    pokemonType1.textContent= pokemonCharacteristics.types[i].type.name
                    pokemonType1.style.backgroundColor = `var(--${ pokemonCharacteristics.types[i].type.name})`
                    pokemonTypes.appendChild(pokemonType1)
                }
            } 
            //Stats 
            const pokemonStats= document.createElement('div')
            pokemonStats.classList.add('pokemon-card--stats')
            //Attack
            const pokemonStatsAttack =document.createElement('div')
            const pokemonAttackH3= document.createElement('h3')
            pokemonAttackH3.textContent= pokemonCharacteristics.stats[1].base_stat
            pokemonStatsAttack.appendChild(pokemonAttackH3)
            const pokemonAttackTitle = document.createElement('p')
            pokemonAttackTitle.innerHTML= 'Attack'
            pokemonStatsAttack.appendChild(pokemonAttackTitle)
            pokemonStats.appendChild(pokemonStatsAttack)
            //Defense
            const pokemonStatsDefense =document.createElement('div')
            const pokemonDefenseH3= document.createElement('h3')
            pokemonDefenseH3.textContent= pokemonCharacteristics.stats[2].base_stat
            pokemonStatsDefense.appendChild(pokemonDefenseH3)
            const pokemonDefenseTitle = document.createElement('p')
            pokemonDefenseTitle.innerHTML= 'Defense'
            pokemonStatsDefense.appendChild(pokemonDefenseTitle)
            pokemonStats.appendChild(pokemonStatsDefense)

            const pokemonStatsSpeed =document.createElement('div')
            const pokemonSpeedH3= document.createElement('h3')
            pokemonSpeedH3.textContent= pokemonCharacteristics.stats[5].base_stat
            pokemonStatsSpeed.appendChild(pokemonSpeedH3)
            const pokemonSpeedTitle = document.createElement('p')
            pokemonSpeedTitle.innerHTML= 'Speed'
            pokemonStatsSpeed.appendChild(pokemonSpeedTitle)
            pokemonStats.appendChild(pokemonStatsSpeed)
            
            //Append
            pokemonCard.appendChild(pokemonImg)
            pokemonCard.appendChild(pokemonName)
            pokemonCard.appendChild(pokemonTypes)
            pokemonCard.appendChild(pokemonStats)
            pokemonContainer.appendChild(pokemonCard)
            pokemonCard.addEventListener('click', ()=>{
                eventPokemonDetails(pokemonCharacteristics.species.name)
            })
        }
        pokemonCreateCard()

    });
}




//Slot change
var URL_Next= 1;
async function seeMorePokemons(){
    if(URL_Next<1281){ 
        if(URL_Next==1){
            pokemonContainer.innerHTML=''
            pokemonCards(`https://pokeapi.co/api/v2/pokemon?offset=${URL_Next}&limit=10`)
            footer.style.height= '100px'
            URL_Next+=10
        }else{
            URL_Next += 10
            pokemonContainer.innerHTML=''
            pokemonCards(`https://pokeapi.co/api/v2/pokemon?offset=${URL_Next}&limit=10`)
        }
    }else{
        URL_Next= 1;
    }
}
seeMore.addEventListener('click', ()=>{seeMorePokemons()})

//Search Page

async function getSearchPokemons(pokemonName){
    pokemonName= pokemonName.toLowerCase()
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const pokemon = await res.json()
            pokemonContainer.innerHTML=''
            createPokemonCard(pokemon)
    } catch{
        window.alert('No se puede encontrar este Pokemon!! Intenta escribir bien el nombre del pokemon u intenta buscar otro.')
    }
    
}

searchButton.addEventListener('click', ()=>{
    getSearchPokemons(searchInput.value)
})
searchRegreso.addEventListener('click', ()=>{
    goHome()
})


async function createPokemonCard(pokemon){
    searchPokemonContainer.innerHTML=''
    const pokemonCard= document.createElement('article')
    pokemonCard.classList.add('pokemon-card')
    pokemonCard.style.background= `radial-gradient(circle at 50% 0%, var(--${pokemon.types[0].type.name}) 36%, var(--white-card) 36%)`
    //Imágen
    const pokemonImg= document.createElement('img')
    pokemonImg.classList.add('pokemon-card--img')
    pokemonImg.src= pokemon.sprites.front_default
    //Nombre
    const pokemonName= document.createElement('h2')
    pokemonName.classList.add('pokemon-card--name')
    pokemonName.textContent= pokemon.species.name
    //Types
    const pokemonTypes = document.createElement('div')
    if(pokemon.types.length == 1){
        pokemonTypes.classList.add('pokemon-card--types')
        const pokemonType1= document.createElement('span')
        pokemonType1.textContent= pokemon.types[0].type.name
        pokemonType1.style.backgroundColor = `var(--${ pokemon.types[0].type.name})`
        pokemonTypes.appendChild(pokemonType1)
    }
    if(pokemon.types.length == 2){
        for(let i=0; i< pokemon.types.length;i++){
            pokemonTypes.classList.add('pokemon-card--types')
            const pokemonType1= document.createElement('span')
            pokemonType1.textContent= pokemon.types[i].type.name
            pokemonType1.style.backgroundColor = `var(--${ pokemon.types[i].type.name})`
            pokemonTypes.appendChild(pokemonType1)
        }
    } 
    //Stats 
    const pokemonStats= document.createElement('div')
    pokemonStats.classList.add('pokemon-card--stats')
    //Attack
    const pokemonStatsAttack =document.createElement('div')
    const pokemonAttackH3= document.createElement('h3')
    pokemonAttackH3.textContent= pokemon.stats[1].base_stat
    pokemonStatsAttack.appendChild(pokemonAttackH3)
    const pokemonAttackTitle = document.createElement('p')
    pokemonAttackTitle.innerHTML= 'Attack'
    pokemonStatsAttack.appendChild(pokemonAttackTitle)
    pokemonStats.appendChild(pokemonStatsAttack)
    //Defense
    const pokemonStatsDefense =document.createElement('div')
    const pokemonDefenseH3= document.createElement('h3')
    pokemonDefenseH3.textContent= pokemon.stats[2].base_stat
    pokemonStatsDefense.appendChild(pokemonDefenseH3)
    const pokemonDefenseTitle = document.createElement('p')
    pokemonDefenseTitle.innerHTML= 'Defense'
    pokemonStatsDefense.appendChild(pokemonDefenseTitle)
    pokemonStats.appendChild(pokemonStatsDefense)

    const pokemonStatsSpeed =document.createElement('div')
    const pokemonSpeedH3= document.createElement('h3')
    pokemonSpeedH3.textContent= pokemon.stats[5].base_stat
    pokemonStatsSpeed.appendChild(pokemonSpeedH3)
    const pokemonSpeedTitle = document.createElement('p')
    pokemonSpeedTitle.innerHTML= 'Speed'
    pokemonStatsSpeed.appendChild(pokemonSpeedTitle)
    pokemonStats.appendChild(pokemonStatsSpeed)
    
    //Append
    pokemonCard.appendChild(pokemonImg)
    pokemonCard.appendChild(pokemonName)
    pokemonCard.appendChild(pokemonTypes)
    pokemonCard.appendChild(pokemonStats)
    pokemonCard.addEventListener('click', ()=>{
        eventPokemonDetails(pokemon.species.name)})
    searchPokemonContainer.appendChild(pokemonCard)
}

//Home Page Search
homeSearchButton.addEventListener('click', ()=>{
    goSearchPage()
})


//Pokemon details
async function eventPokemonDetails(pokemonName){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const pokemon = await res.json()

    pokemonDetailsPage.innerHTML= ''

    //header falta agregarlo al contenedor
    const header = document.createElement('header')
    header.classList.add('pokemon-details--header')
    header.style.backgroundColor= `var(--${pokemon.types[0].type.name})`    
    const headerTitle = document.createElement('p')
    headerTitle.classList.add('pokemon-details--header-title')
    headerTitle.setAttribute('title', `${pokemon.species.name.toUpperCase()}`)
    headerTitle.innerText = `${pokemon.species.name.toUpperCase()}`
    const rootVariable=document.documentElement
    rootVariable.style.setProperty('--pokemonColor', `var(--${pokemon.types[0].type.name}2)`)
    console.log(rootVariable)
    const headerPseudo =  window.getComputedStyle(headerTitle, ':before')
    // headerPseudo.color= `--${pokemon.types[0].type.name}2`
    header.appendChild(headerTitle)

    //Segundo Section falta agregarlo al contenedor
    const pokemonDetails = document.createElement('section')
    pokemonDetails.classList.add('pokemon-details--pokemon')

    const pokemonBall = document.createElement('span')
    pokemonBall.classList.add('pokemon-details--pokemon-ball')
    pokemonDetails.appendChild(pokemonBall) //ya se agrego la pelota al details section
    //Main ya se agrego al section
    const mainDetails= document.createElement('div')
    mainDetails.classList.add('pokemon-details--main')
    //Imagen ya se agrego a main
    const pokemonImg = document.createElement('img')
    pokemonImg.src= `${pokemon.sprites.other.home.front_default}`
    mainDetails.appendChild(pokemonImg)

    //Types ya se agrego al main
    const typesContainer = document.createElement('div')
    typesContainer.classList.add('pokemon-details--types')

    if(pokemon.types.length == 1){
        const type1 = document.createElement('span')
        type1.classList.add('pokemon-details--type')
        type1.innerText = pokemon.types[0].type.name
        type1.style.backgroundColor = `var(--${pokemon.types[0].type.name})`
        typesContainer.appendChild(type1)
    }
    if(pokemon.types.length == 2){
        for(let i=0; i< pokemon.types.length;i++){
            const type1 = document.createElement('span')
            type1.classList.add('pokemon-details--type')
            type1.innerText = pokemon.types[i].type.name
            type1.style.backgroundColor = `var(--${pokemon.types[i].type.name})`
            typesContainer.appendChild(type1)
        }
    } 
    mainDetails.appendChild(typesContainer)

    //Stats ya se agrego al main
    const statsContainer = document.createElement('div')
    statsContainer.classList.add('pokemon-details--stats')

    //HP agregarlo en stats
    const HpContainer = document.createElement('div')
    HpContainer.classList.add('pokemon-details--stats-container')
    const HpH3 = document.createElement('h3')
    HpH3.classList.add('pokemon-details--stats-h3')
    HpH3.innerText= pokemon.stats[0].base_stat
    const HpSpan = document.createElement('span')
    HpSpan.classList.add('pokemon-details--stats-span')
    HpSpan.innerText= 'HP'
    
    HpContainer.appendChild(HpH3)
    HpContainer.appendChild(HpSpan)
    statsContainer.appendChild(HpContainer)
    //Attack  agregarlo en stats
    const AttackContainer = document.createElement('div')
    AttackContainer.classList.add('pokemon-details--stats-container')
    const AttackH3 = document.createElement('h3')
    AttackH3.classList.add('pokemon-details--stats-h3')
    AttackH3.innerText= pokemon.stats[1].base_stat
    const AttackSpan = document.createElement('span')
    AttackSpan.classList.add('pokemon-details--stats-span')
    AttackSpan.innerText= 'Attack'

    AttackContainer.appendChild(AttackH3)
    AttackContainer.appendChild(AttackSpan)
    statsContainer.appendChild(AttackContainer)
    //Defense agregarlo en stats
    const DefenseContainer = document.createElement('div')
    DefenseContainer.classList.add('pokemon-details--stats-container')
    const DefenseH3 = document.createElement('h3')
    DefenseH3.classList.add('pokemon-details--stats-h3')
    DefenseH3.innerText= pokemon.stats[2].base_stat
    const DefenseSpan = document.createElement('span')
    DefenseSpan.classList.add('pokemon-details--stats-span')
    DefenseSpan.innerText= 'Defense'

    DefenseContainer.appendChild(DefenseH3)
    DefenseContainer.appendChild(DefenseSpan)
    statsContainer.appendChild(DefenseContainer)

    //Speed agregarlo en stats
    const SpeedContainer = document.createElement('div')
    SpeedContainer.classList.add('pokemon-details--stats-container')
    const SpeedH3 = document.createElement('h3')
    SpeedH3.classList.add('pokemon-details--stats-h3')
    SpeedH3.innerText= pokemon.stats[5].base_stat
    const SpeedSpan = document.createElement('span')
    SpeedSpan.classList.add('pokemon-details--stats-span')
    SpeedSpan.innerText= 'Speed'
    SpeedContainer.appendChild(SpeedH3)
    SpeedContainer.appendChild(SpeedSpan)
    statsContainer.appendChild(SpeedContainer)

    mainDetails.appendChild(statsContainer)


    //Boton de regreso 
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('pokemon-details--button-container')
    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.classList.add('pokemon-details--return')
    button.innerHTML= 'Return'
    button.style.backgroundColor = `var(--${pokemon.types[0].type.name})`
    button.addEventListener('click', ()=>{
        goHome()
        console.log('home')
    })
    buttonContainer.appendChild(button)
    pokemonDetails.appendChild(mainDetails)
    pokemonDetails.appendChild(buttonContainer)

    pokemonDetailsPage.appendChild(header)
    pokemonDetailsPage.appendChild(pokemonDetails)
        goDetailsPage()
        console.log('listo')
}   
