import React, { Component } from 'react';
import { ShelfChanger } from './ShelfChanger';

export const Book = (props) => {
    const {book, moveBook} = props;
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" 
                    style={
                        { 
                            width: 128, 
                            height: 193, 
                            backgroundImage: `url("${book.imageLinks.thumbnail}")`
                        }
                    }>
                </div>
                <ShelfChanger 
                    book={book} 
                    moveBook={moveBook} 
                />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );
}