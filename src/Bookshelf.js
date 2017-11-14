import React from 'react';
import PropTypes from 'prop-types';
import { Book } from './Book';

export const Bookshelf = (props) => {
    const { title, moveBook, shelf } = props;
    const books = props.books.filter(e => e.shelf === shelf);
    
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    { books.map(book => (
                        <li key={book.id}>
                            <Book book={book} moveBook={moveBook} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
}