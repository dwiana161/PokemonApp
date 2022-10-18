import React from "react";
import { useState } from "react";
import { Modal, Button, Header, Image, Grid, Segment } from "semantic-ui-react";
import { Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import  {bookmark, unBookmarkItem } from "../../actions/bookmark";
import Bookmark from "../Bookmark";


const Card = ({pokemon, loading}) => {
    const [showModal, setShowModal] = useState(false);
    const [pokeName, setPokeName] = useState('');
    const [pokeHeight, setPokeHeight] = useState('');
    const [pokeWeight, setPokeWeight] = useState('');
    const [pokeImg, setPokeImg] = useState();
    const [searchPoke, setSearchPoke] = useState('');
    const handleShow = () => setShowModal(true);
   
    const bookmarks = useSelector((state) => state.bookmark.bookmarkItems);
    console.log(bookmarks.length);
    const dispatch = useDispatch();

    const isBookmark = item => {
    if (bookmarks === 0) {
        // bookmarks = JSON.parse(bookmarks)
        return (
        bookmarks.findIndex(bookmark => bookmark.id=== item.id) > -1
        )
    }
    }
    
    const bookmarkItem = item => {
    dispatch(bookmark(item));
    };

    const unBookmark = item => {
    dispatch(unBookmarkItem(item));
    };

    const openPokeInfo = async(res) => {
        setPokeName(res.name);
        setPokeHeight(res.height);
        setPokeWeight(res.weight);
        setPokeImg(res.sprites.front_default);
        handleShow();

    }

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
        <Image size='medium' src={pokeImg} wrapped />
        <Modal.Description>
          <Header>{pokeName}</Header>
          <p>
           Height : {pokeHeight}
          </p>
          <p>Weight : {pokeWeight}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Actions>
        </Modal>

        {/* List of Pokemon */}
        <div className="ui icon input" style={{width: '30%', marginRight:'0', marginLeft:'0', margin:'auto', display:'block', marginBottom:'20px'}}>
            <input type="text" 
                    placeholder="Search..." 
                    onChange={event => {setSearchPoke(event.target.value)}}
                />
            <i class="circular search link icon"></i>
        </div>

            {
            bookmarks.length !== 0 &&(
            <>
            <Header as='h1'>Your Favorite Pokemons</Header>
                <Grid>
                    <Bookmark
                        BookmarkType={bookmarks}
                    />
                </Grid>
            </>
                )
            }

        <Grid columns={3} style={{padding:'20px'}}>
        <Grid.Row>
            {
                loading ? <Header as='h1'>Loading...</Header> :
                pokemon.filter((item) => {
                    if (searchPoke === "") {
                        return item
                    } else if (
                        item.name.toLowerCase().includes(searchPoke.toLowerCase())){
                            return item
                        }
                }).map((item) => {
                    return (
                        
                        <Grid.Column key={item.id}>
                              {isBookmark(item) ? (
                                <Icon 
                                    name="like" 
                                    color='red'
                                    onClick={() => unBookmark(item)}
                                />
                            ) :
                                <Icon 
                                    name="like" 
                                    onClick={() => bookmarkItem(item)}
                                />
                            }
                            <Segment style={{width:'50%', marginBottom:'20px'}} onClick={()=> openPokeInfo(item)}>
                            <Image src={item.sprites.front_default} size={'small'} centered/>
                            <Header as='h5' className="ui center aligned">{item.name}</Header>
                            </Segment>    
                        </Grid.Column>
                    )
                })
            }
               </Grid.Row>
            </Grid>

        </>
    )
}

export default Card;