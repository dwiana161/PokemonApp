import { FAVORITE_ITEM, UNFAVORITE_ITEM, GET_FAVORITE_ITEMS } from "../constants/actionTypes";

export const favoritePoke = item => (dispatch, getState) => {
    const { favoriteItems } = getState().favorite;
    localStorage.setItem('favorites', JSON.stringify([item, ...favoriteItems]));        //save data to local storage
    dispatch({
        type: FAVORITE_ITEM,
        payload: item
    })
};

export const unFavoritePoke = item => (dispatch, getState) => {
    const { favoriteItems } = getState().favorite;
    const newFavoriteItems = favoriteItems.filter(
      favoriteItem => favoriteItem !== item
    );
    localStorage.setItem('favorites', JSON.stringify(newFavoriteItems));                //save data to local storage
    dispatch({
      type: UNFAVORITE_ITEM,
      payload: item
    });
};

export const getFavoriteItems = () => (dispatch) => {
    let favoriteItems = localStorage.getItem('favorites');          //get data from local storage
    if (favoriteItems === null) {
        favoriteItems = [];
    } else {
        favoriteItems = JSON.parse(favoriteItems);
    }
    dispatch({
        type: GET_FAVORITE_ITEMS,
        payload: favoriteItems
    })
}