import { useEffect, useState } from "react"
import { getPokedexNumber } from "../utils"

export function PokeCard(props) {
    const { selectedPokemon } = props
    
    // stateful variable for dynamic data change
    const [data, setData] = useState(null) // null bc makes it clear we do/dont have pokemond avail 
    const [loading, setLoading] = useState(false) // when we first make page, we not loading, we loading when we fetch info


    //dependency arr listens for change in val, and we want it to
    //activate when selectedPokemon changes
    useEffect(() => {
        //pseudocode for fetching and caching process

        //if loading: exit logic: only if false bc we dont wana perputually render info
        if (loading || !localStorage) { return }

        //define the cache
        let cache = {} // API is in JSON format, so cache is too
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        } 
        // check if selected pokemon data in cache:
        if (selectedPokemon in cache) {
            //read from cache
            setData(cache[selectedPokemon])
            return
        }// else fetch, return acting as guard clause

        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseURL = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                const finalURL = baseURL + suffix
                // asynchronos function, we await for data to be returned from API
                const res = await fetch(finalURL)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log(pokemonData)

                // cache data
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex', JSON.stringify(cache))
            } catch (err){
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()
        //if we fetch from API, save info to cache(in try catch block)


    }, [selectedPokemon])
    
    return (
        <div></div>
    )
}


//cacheing is useful for when data changes infrequently, like only having 151 pokemon