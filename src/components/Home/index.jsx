import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card";
import HomeHeader from "../Header";
import { Button, Grid } from "semantic-ui-react";

const Home = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [disable, setDisable] = useState(true);


    const pokeFunc = async() => {
        const res = await axios.get(url);

        getPokemonData(res.data.results);
        setLoading(false);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous)

        console.log(res);
        console.log("PREV", res.data.previous);
        console.log("NEXT", res.data.next);

        if (res.data.previous != null) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    const getPokemonData = async(res) => {
        res.map(async(item) => {
            const result = await axios.get(item.url);

            setPokeData(state => {
                state = [...state, result.data]
                return state;
            })
        })
    }

    useEffect(() => {
        pokeFunc()
    }, [url])

    return(
        <>
            <HomeHeader/>
            <Grid.Row>
                <Grid.Column>
                    <Card pokemon={pokeData} loading={loading}></Card>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                <Button 
                    content='Previous' 
                    icon='left arrow' 
                    labelPosition='left' 
                    disabled={disable}
                    onClick={() => {
                        setPokeData([])
                        setUrl(prevUrl);
                    }}
                />
                <Button 
                    content='Next' 
                    icon='right arrow' 
                    labelPosition='right' 
                    onClick={() => {
                        setPokeData([])
                        setUrl(nextUrl);
                    }}
                />
                </Grid.Column>
            </Grid.Row>
        </>
    )
}

export default Home;

