import React from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Icon, Image } from "semantic-ui-react";
import { SliderStyleBookmark, ViewBoxBookmark } from "./styles";
import  {bookmark, getBookmarkItems, unBookmarkItem } from "../../actions/bookmark";

const Bookmark = ({BookmarkType}) => {
    const bookmarks = useSelector((state) => state.bookmark.bookmarkItems);
    const dispatch = useDispatch();

    const isBookmark = item => {
    if (bookmarks.length !== 0) {
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

    return (
        <SliderStyleBookmark>
            {BookmarkType.map((value, key) => (
                <Fragment key={key}>
                    <ViewBoxBookmark>
                    <Image src={value.sprites.front_default} size={'small'} centered/>
                        <Header as='h5' className="ui center aligned">
                            {value.name} 
                        </Header>

                        <p>
                           Type : {value.types[0].type.name}
                        </p>
                        {isBookmark(value) ? (
                                <Icon 
                                    name="like" 
                                    color='red'
                                    onClick={() => unBookmark(value)}
                                />
                            ) :
                                <Icon 
                                    name="like" 
                                    onClick={() => bookmarkItem(value)}
                                />
                            }
                    </ViewBoxBookmark>
                </Fragment>
            ))
            }
        </SliderStyleBookmark>
    );
}

export default Bookmark;