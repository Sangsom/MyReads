import React from 'react';

export const ShelfChanger = (props) => {
    const {book, moveBook} = props;

    return (
        <div className="book-shelf-changer">
            <select onChange={(e) => moveBook(book, e.target.value)}>
            <option value="none">Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
        </div>
    );
}