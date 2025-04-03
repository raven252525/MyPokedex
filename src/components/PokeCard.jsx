import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import  TypeCard  from "./TypeCard"
import Modal from "./Modal"

export default function PokeCard(props) {
    const { selectedPokemon } = props
    
    // stateful variable for dynamic data change
    const [data, setData] = useState(null) // null bc makes it clear we do/dont have pokemond avail 
    const [loading, setLoading] = useState(false) // when we first make page, we not loading, we loading when we fetch info

    // destructuring values from JSON data
    const {name, height, abilities, stats, types, moves, sprites} = data || {} // {} is error in case data is null to not crash everything

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) { return false }
        if (['versions', 'other'].includes(val)) { return false }
        return true
    })

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
    
    if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    // anything you write in btwn modal becomes the children props in modal.jsx
    return (
        <div className="poke-card">
            <Modal handleCloseModal={() => { }}>
                <div>
                    <h6>Name</h6>
                    <h2></h2>
                </div>
                <div>
                    <h6>Description</h6>
                    <p>asdasd</p>
                </div>
            </Modal>
            <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj?.type?.name} /> // when nesting objects
                    )
                })}
            </div>
            <img className="default-img" src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'}
            alt={`${name}-large-img`} />
            <div className="img-container">
                {imgList.map((spriteURL, spriteIndex) => {
                    const imgURL = sprites[spriteURL]
                    
                    return (
                        <img key={spriteIndex} src={imgURL} alt={`${name}-img-${spriteURL}`} />
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj, statIndex) => {
                    const { stat, base_stat } = statObj
                    return (
                        <div key={statIndex} className="stat-item">
                            <p>{stat?.name.replaceAll('-', ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {moves.map((moveObj, moveIndex) => {
                    return (
                        <button className="button-card pokemon-move" key={moveIndex} 
                        onClick={() => {}}>
                            <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}


//cacheing is useful for when data changes infrequently, like only having 151 pokemon