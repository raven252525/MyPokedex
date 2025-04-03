import { pokemonTypeColors } from "../utils"

export default function TypeCard(props) {
    
    const { type } = props
    
    return ( // double obj in react, where inside obj is styling obj
        <div className="type-tile" style={{color: pokemonTypeColors?.[type]?.color, 
        background: pokemonTypeColors?.[type]?.background}}>
            <p>{type}</p>
        </div>
    )
}//returns pokemon type