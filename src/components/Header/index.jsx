import React from "react";
import { 
    Header,
    Image,
    Segment
 } from "semantic-ui-react";

const HomeHeader = () => {
    return (
        <Segment basic inverted>
            <Header as='h1' className="ui center aligned">POKEMON!</Header>
            <Image src={'anime.png'} size={'small'} centered/>
            {/* <Header as='h3'>Author: {author}</Header> */}
        </Segment>
    )
}

export default HomeHeader;

