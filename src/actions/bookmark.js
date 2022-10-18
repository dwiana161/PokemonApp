import { BOOKMARK_ITEM, UNBOOKMARK_ITEM, GET_BOOKMARK_ITEMS } from "../constants/actionTypes";

export const bookmark = item => (dispatch, getState) => {
    const { bookmarkItems } = getState().bookmark;
    localStorage.setItem('bookmarks', JSON.stringify([item, ...bookmarkItems]));
    dispatch({
        type: BOOKMARK_ITEM,
        payload: item
    })
};

export const unBookmarkItem = item => (dispatch, getState) => {
    const { bookmarkItems } = getState().bookmark;
    const newBookmarkItems = bookmarkItems.filter(
      bookmarkItem => bookmarkItem !== item
    );
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarkItems));
    dispatch({
      type: UNBOOKMARK_ITEM,
      payload: item
    });
};

export const getBookmarkItems = () => (dispatch) => {
    let bookmarkItems = localStorage.getItem('bookmarks');
    console.log('bookmarks', bookmarkItems);
    if (bookmarkItems === null) {
        bookmarkItems = [];
    } else {
        bookmarkItems = JSON.parse(bookmarkItems);
    }
    dispatch({
        type: GET_BOOKMARK_ITEMS,
        payload: bookmarkItems
    })
}