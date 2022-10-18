import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button, Header, Image, Grid, Segment } from "semantic-ui-react";


const Card = ({pokemon, loading}) => {
    const [showModal, setShowModal] = useState(false);
    const [pokeName, setPokeName] = useState('');
    const [pokeHeight, setPokeHeight] = useState('');
    const [pokeWeight, setPokeWeight] = useState('');
    const [pokeImg, setPokeImg] = useState();
    const [searchPoke, setSearchPoke] = useState('');
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

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