import React from 'react';
import { Link } from 'react-router-dom';
import { Bookshelf } from './Bookshelf';
import sortBy from 'sort-by';

export const Main = (props) => {
    const books = props.books;
    
    const shelves = [
        {
            id: 'currentlyReading',
            title: 'Currently Reading',
            books: books.filter(book => book.shelf === 'currentlyReading')
        },
        {
            id: 'wantToRead',
            title: 'Want to Read',
            books: books.filter(book => book.shelf === 'wantToRead')
        },
        {
            id: 'read',
            title: 'Read',
            books: books.filter(book => book.shelf === 'read')
        }
    ];

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelves.map(shelf => (
                    <Bookshelf 
                        key={shelf.id} 
                        shelf={shelf.id} 
                        title={shelf.title} 
                        books={shelf.books.sort(sortBy('title'))} 
                        moveBook={props.moveBook} 
                    />
                    ))}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}