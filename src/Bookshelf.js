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
                        { books.map((book, index) => (
                            <li key={index}>
                                <Book book={book} moveBook={this.props.moveBook} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}