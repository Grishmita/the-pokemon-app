import './App.css';
import { useState } from 'react';

function App() {
  const [pokemonname, setpokemonName] = useState('')
  const [pokemonfact, setPokemonFact] = useState({
    name: "",
    pokemonImg: "",
    species:"",
    weight:"",
    height:"",
    hp: "",
    attack:"",
    defense:"",
    element:"" 
  })

  const inputHandler = (e) =>{          
    setpokemonName(e.target.value.toLowerCase())
    
  }


  const searchPokemon= async() =>{

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`)
        const data = await response.json()
        console.log(data)

        const {name, height, weight, sprites, stats, types, species} = data

          setPokemonFact({
              name: name,
              pokemonImg: sprites.front_default,
              species:species.name,
              weight:weight,
              height:height,
              hp: stats[0].base_stat,
              attack:stats[1].base_stat,
              defense:stats[2].base_stat,
              element:types[0].type.name 
            })
      }catch (error){
        console.error('an error occured', error)
      } 

      console.log(pokemonfact)
  }

  return (
    <div className="App">
      <div className="pokemon-app">
          <input 
          type='text'
          value={pokemonname}
          onChange={inputHandler}/>
          <button onClick={searchPokemon} disabled={!pokemonname}>Search Pokemon</button>
      </div>

      {pokemonname === ""?  (
      <h2>Please enter a Pokemon name</h2>
      ):(
      <div className="listing-facts">
        {pokemonfact.name !== ""?(
          <div className="facts-div">
         <div className='upper-div'>   
          <h2>{pokemonfact.name}</h2>
              <img src={pokemonfact.pokemonImg} alt="Pokemon" />
           </div>   
              <div className="listing-div">
              <p>Species: {pokemonfact.species}</p>
              <p>Weight: {pokemonfact.weight}</p>
              <p>Height: {pokemonfact.height}</p>
              <p>HP: {pokemonfact.hp}</p>
              <p>Attack: {pokemonfact.attack}</p>
              <p>Defense: {pokemonfact.defense}</p>
              <p>Element: {pokemonfact.element}</p>
              </div>
          </div>
          ): null}
      </div>
      ) }
    </div>
  );
}

export default App;
