import { FAVORITE_ITEM, UNFAVORITE_ITEM, GET_FAVORITE_ITEMS } from "../constants/actionTypes";

const initialState = {
    favoriteItems: []
};

const favorite = ( state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FAVORITE_ITEM:
            return { 
                ...state, 
                favoriteItems: [payload, ...state.favoriteItems]
            };
        case UNFAVORITE_ITEM:
            return {
                ...state,
                favoriteItems: state.favoriteItems.filter(
                    item => item.id !== payload.id
                )
            };
        case GET_FAVORITE_ITEMS:
            // bookmarks["favoriteItems"] = action.payload
            // return bookmarks;
            return {
                ...state,
                favoriteItems: payload
            };
            
            default:
                return state;
    }
};

export default favorite;