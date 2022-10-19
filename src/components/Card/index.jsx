import React from "react";
import { useState } from "react";
import { Modal, Button, Header, Image, Grid, Card } from "semantic-ui-react";
import { Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import  {favoritePoke, getFavoriteItems, unFavoritePoke } from "../../actions/favorite";
import Favorite from "../Favorite";
import { useEffect } from "react";


const CardList = ({pokemon, loading}) => {
    const [showModal, setShowModal] = useState(false);
    const [pokeName, setPokeName] = useState('');
    const [pokeHeight, setPokeHeight] = useState('');
    const [pokeWeight, setPokeWeight] = useState('');
    const [pokeImg, setPokeImg] = useState();
    const [pokeType, setPokeType] = useState('');
    const [pokeMove, setPokeMove] = useState('');
    const [searchPoke, setSearchPoke] = useState('');
    const [gameIndices, setGameIndices] = useState('');
    const handleShow = () => setShowModal(true);
   
    const favorites = useSelector((state) => state.favorite.favoriteItems);
    console.log(favorites);
    const dispatch = useDispatch();

    const isFavorite = item => {
        if (favorites.length !== 0) {
        return (
        favorites.findIndex(favorite => favorite.id === item.id) > -1
        )
    }
    }
    
    const addFavorite = item => {
        dispatch(favoritePoke(item));
    };

    const removeFavorite = item => {
        dispatch(unFavoritePoke(item));
    };

    const openPokeInfo = async(res) => {        //detail info pokemon
        setPokeName(res.name);
        setPokeHeight(res.height);
        setPokeWeight(res.weight);
        setPokeImg(res.sprites.front_default);
        setPokeType(res.types[0].type.name);
        setPokeMove(res.moves[0].move.name);
        setGameIndices(res.game_indices[0].version.name);
        handleShow();

    }

    useEffect(() => {
        dispatch(getFavoriteItems());
    }, []);

    return(
        <>
        {/* Info Detail of Pokemon */}
        <Modal
            onClose={() => setShowModal(false)}
            onOpen={() => setShowModal(true)}
            open={showModal}
        >
            <Modal.Header>Pokemon</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={pokeImg} />
                <Modal.Description>
                    <Header>{pokeName}</Header>
                    <p>
                    Height : {pokeHeight}
                    </p>
                    <p>Weight : {pokeWeight}</p>
                    <p>Type : {pokeType}</p>
                    <p>Move : {pokeMove}</p>
                    <p>Game Indice : {gameIndices}</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>

        {/* Search Bar Pokemon */}
        <div className="ui icon input" style={{width: '30%', marginRight:'0', marginLeft:'0', margin:'auto', display:'block', marginBottom:'20px'}}>
            <input type="text" 
                    placeholder="Search..." 
                    onChange={event => {setSearchPoke(event.target.value)}}
                    style={{width: '100%'}}
                />
            <i class="circular search link icon"></i>
        </div>

        {/* Favorite Pokemon List */}
        <Grid centered columns={3}>
            <Grid.Row>
                <Grid.Column>
            {
            favorites.length !== 0 &&(
            <>
                <Header as='h1' className="ui center aligned">Your Favorite Pokemons</Header>
                <Favorite FavoriteType={favorites}/>
            </>
                )
            }
                </Grid.Column>
            </Grid.Row>
        </Grid>

        {/* List of Pokemon */}
        <Grid centered columns={3} style={{marginLeft:'10%'}}>
        <Grid.Row>
            {
                loading ? <Header as='h1'>Loading...</Header> :
                pokemon.filter((item) => {              //filter by searchPoke results
                    if (searchPoke === "") {
                        return item
                    } else if (
                        item.name.toLowerCase().includes(searchPoke.toLowerCase())){
                            return item
                        }
                }).map((item) => {
                    return (
                        
                        <Grid.Column key={item.id}>
                            <Card style={{width:'50%', marginBottom:'20px', cursor:'pointer'}}>
                            <Image 
                                src={item.sprites.front_default} 
                                size={'small'} 
                                centered  
                                onClick={()=> openPokeInfo(item)}       //open detail info
                                style={{cursor:'pointer'}}/>
                            <Card.Content className="ui center aligned" style={{backgroundColor:' #ada397'}}>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Description>
                                    Type: {item.types[0].type.name}
                                </Card.Description>
                                <Card.Description>
                                    Move: {item.moves[0].move.name}
                                </Card.Description>
                            </Card.Content>
                                <Card.Content extra>
                                    {isFavorite(item) ? (       //addfavorite & removefavorite pokemon
                                    <Icon 
                                        name="like" 
                                        color='red'
                                        onClick={() => removeFavorite(item)}
                                    />
                                    ) :
                                        <Icon 
                                            name="like" 
                                            onClick={() => addFavorite(item)}
                                        />
                                    }
                                </Card.Content>
                            </Card>    
                        </Grid.Column>
                    )
                })
            }
               </Grid.Row>
            </Grid>

        </>
    )
}

export default CardList;