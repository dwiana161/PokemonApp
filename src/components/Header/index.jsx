import React from "react";
import { 
    Header,
    Image,
    Segment
 } from "semantic-ui-react";

const HomeHeader = () => {
    return (
        <Segment basic inverted style={{display: 'flex'}}>
            <Header as='h1' style={{marginTop:'12vh', marginLeft:'35vw', width:'15%'}}>WELCOME TO POKEMONS WORLD!</Header>
            <Image src={'anime.png'} size={'small'} style={{ boxShadow: '0rem 0.688rem 2.438rem var(--primary-black)'}}/>
            {/* <Header as='h3'>Author: {author}</Header> */}
        </Segment>
    )
}

export default HomeHeader;

