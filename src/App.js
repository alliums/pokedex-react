import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import './App.css';

const App = () => {


  var defaultPokemon = Math.floor(Math.random() * 1008);
  const [pokemon, setPokemon] = useState(defaultPokemon);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  var pokeID = "";
  var [count, setCount] = useState(25);

  const getPokemon = async () => {
    const toArray = [];

    try {
      if (!isNaN(pokeID)){
        console.log("number");
      } else {
        pokeID = pokemon;
        if (/\s/.test(pokemon)) {
            console.log("whitespace")
            pokeID = pokemon.replace(/\s/g, '-')
        }
    }

      console.log(pokeID);
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
      console.log(res.data.id);
      setCount(res.data.id);
      console.log(res);
    } catch(e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    console.log(e);
    pokeID = e;
    e.preventDefault();
    getPokemon();
  }

  const increment = () => {
    if (count < 1010) {
        count++;
        pokeID = count;
        getPokemon();
    }
  }
  const decrement = () => {
    if (count > 1) {
        count--;
        pokeID = count;
        getPokemon();
    }
  }

  const pickRandom = () => {
    pokeID = Math.floor(Math.random() * 1008);
    getPokemon();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" onChange={handleChange} placeholder="Enter Pokemon Name"/>
        </label>
      </form>

      {pokemonData.map((data) =>{
        return(
            <div className="container">
                <div className="appContainer">
                <img className="sprite" src={data.sprites["front_default"]}/>
                <div className="divTable">
                    <div className="divTableBody">
                    <div className="divTableRow">
                        <div className="divTableCell"> Name</div>
                        <div className="divTableCell result">{data.species.name.replace("-", " ")}</div>
                    </div>
                    <div className="divTableRow">
                        <div className="divTableCell">Type</div>
                        <div className="divTableCell result">{pokemonType}</div>
                    </div>
                    <div className="divTableRow">
                        <div className="divTableCell">Height</div>
                        <div className="divTableCell result">{" "}{Math.round(data.height * 3.9)} "</div>
                    </div>
                    <div className="divTableRow">
                        <div className="divTableCell">Weight</div>
                        <div className="divTableCell result">{" "}{Math.round(data.weight / 4.3)} lbs</div>
                    </div>
                    <div className="divTableRow">
                        <div className="divTableCell">Game Index</div>
                        <div className="divTableCell result">{data.id}</div>
                    </div>
                    </div>
                </div>
                <div className="buttonContainer">
                    <button onClick={decrement}>Previous</button>
                    <button onClick={increment}>Next</button>
                    <button onClick={pickRandom}>Random</button>
                </div>
                </div>

            </div>
        )
      })}
    </div> 
  )

}

export default App;
