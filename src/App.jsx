import  Header  from "./components/Header"
import  PokeCard  from "./components/PokeCard"
import  SideNav  from "./components/SideNav"
// default keyword allows us to not need to destruct


import { useState } from "react"

function App() {

  const [selectedPokemon, setSelectedPokemon] = useState(0)

  return (
    <>
      <Header />
      <SideNav selectedPokemon={selectedPokemon} 
      setSelectedPokemon={setSelectedPokemon} />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  )
}

export default App

//New concept, fetching API data-external source  PokiAPI is a 
// RESTful API--reads info from db using useEffect hook

//--for API requests to fetch data, first ask, what componenets need the data?
//header X modal X PokeCard Yes SideNav X Typecard X(subset of Pokecard)--so all 
// logic in Pokecard

//ALSO since data generated is dependended on pokemon SELECTED -> useState is involved in API logic
//-- however useStatelogic requires header search, and sidenav selected, 
// so multiple childs of prt App need it, therefore init in App to give to chld Card, Nav, and Head


//cache info attained from external site(API)--bc if u dont, you'll overwhelm API(doing a DDOS attack)

// for PC- sidenav is main nav, but for mobile, header is start of nav bc smaller size