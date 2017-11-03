import React, { Component } from 'react';
import { Book } from './Book';

export class Bookshelf extends Component {
    render() {
        const books = this.props.books.filter(e => e.shelf === this.props.shelf);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { books.map(book => (
                            <li key={book.id}>
                                <Book book={book} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}