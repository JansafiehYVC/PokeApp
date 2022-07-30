import React, { useEffect, useRef, useState } from 'react'
import './Midd.css'

export default function Home() {
    const [pokemons, setpokemons] = useState([]);
    const [limit , setlimit] = useState(20);
    const [offest , setoffest] = useState(0);
    const shouldFetch = useRef(true);

    const getData = () => {
        const fetchData = async () => {
            const Data = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + offest).then(data => data.json());
            const pokemon_Namer_Url = Data.results;
            pokemon_Namer_Url.forEach(async pokemonURL => {
                var pokemon = {
                    "name": '', "img_url": ''
                };


                const pokemonData = await fetch(pokemonURL.url).then(pokemon_data => pokemon_data.json());
                pokemon.name = pokemonData.name;
                pokemon.img_url = pokemonData.sprites.front_default;

                setpokemons(pokemons => [...pokemons, pokemon]);
            });

            setoffest(offest + limit);
        }
        fetchData();
    }

    useEffect(() => {
        try {
            if (shouldFetch.current) {
                getData();
            }
            return () => {
                shouldFetch.current = false;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <div>
            <div className='row'>
                {pokemons.map(data => (
                    <div className='column'>
                        <h2> {data.name} </h2>
                        <div className='img'>
                            <img className='img' src={data.img_url} alt=""></img>
                        </div>
                    </div>
                ))}
            </div>
            <div class  = 'button '>
                <button onClick={() => getData()}  >
                    <strong > Load More ...</strong>
                </button>
            </div>
        </div>
    )
}