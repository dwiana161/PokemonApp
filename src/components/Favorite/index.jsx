import React from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Icon, Image } from "semantic-ui-react";
import { ViewBoxFavorite } from "./styles";
import  {favoritePoke, unFavoritePoke } from "../../actions/favorite";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

const Favorite = ({FavoriteType}) => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        arrows: false,
        centerPadding: "90",
        slidesPerRow: 1,
        slidesToShow: 1,
        centerMode: true,
        slidesToScroll: 1,
        adaptiveHeight: false,
      };

    const favorites = useSelector((state) => state.favorite.favoriteItems);
    const dispatch = useDispatch();

    const isFavorite = item => {
    if (favorites.length !== 0) {
        // favorites = JSON.parse(favorites)
        return (
        favorites.findIndex(fav => fav.id=== item.id) > -1
        )
    }
    }
    
    const addFavorite = item => {
    dispatch(favoritePoke(item));
    };

    const removeFavorite = item => {
    dispatch(unFavoritePoke(item));
    };

    return (
            <Slider {...settings}>
            {FavoriteType.map((value, key) => (
                <Fragment key={key}>
                    <ViewBoxFavorite>
                    <Image src={value.sprites.front_default} size={'small'} centered/>
                        <Header as='h5' className="ui center aligned">
                            {value.name} 
                        </Header>

                        <p>
                           Type : {value.types[0].type.name}
                        </p>
                        <p>Move : {value.moves[0].move.name}</p>
                        {isFavorite(value) ? (
                                <Icon 
                                    name="like" 
                                    color='red'
                                    onClick={() => removeFavorite(value)}
                                />
                            ) :
                                <Icon 
                                    name="like" 
                                    onClick={() => addFavorite(value)}
                                />
                            }
                    </ViewBoxFavorite>
                </Fragment>
            ))
            }
            </Slider>
    );
}

export default Favorite;