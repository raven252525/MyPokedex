import { first151Pokemon, getFullPokedexNumber } from '../utils'
//index is automatically imported if only file in fodlder


export default function SideNav() {
    return (
        <nav>
            <div className={"header"}>
                <h1 className='text-gradient'>Pokédex</h1>
            </div>
            <input placeholder='**allows user to search for specific Pokemon' />
            {first151Pokemon.map((pokemon, pokemonIndex) => {
                return (
                    <button key={pokemonIndex} className={`nav-card `}>
                        <p>{getFullPokedexNumber(pokemonIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}// renders out all the pokemon, for the user to then select.