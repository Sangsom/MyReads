import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import { Book } from './Book';
import sortBy from 'sort-by';

export class SearchBooks extends Component {
    static propTypes = {
        mainBooks: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired
    }

    state = {
        found: [],
        query: '',
        mainBooks: []
    }

    updateQuery (query) {
        this.setState({ query: query.trim() });

        BooksAPI.search(this.state.query).then(books => {
            if (books && !books.error) {
                this.setState({ found: books });
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mainBooks) {
            this.setState({ mainBooks: nextProps.mainBooks });
        }
    }

    // Helper function for finding book shelf from main page
    getShelf(id) {
        let bookshelf;
        this.state.mainBooks.map(book => {
            if(book.id === id) {
                bookshelf = book.shelf
            }
        })
        return bookshelf;
    }

    render() {
        const {query, found} = this.state;
        let booksFound = found.sort(sortBy('title'));

        // Iterate through found books and compare to books from main page and add correct book shelfs
        booksFound.map(book => {
            return this.getShelf(book.id) != undefined ? book.shelf = this.getShelf(book.id) : book;
        });

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link   
                        to="/"
                        className="close-search">Close</Link>
                        { JSON.stringify(query)}
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="search-books-results">
                    <ol className="books-grid">
                        { booksFound.map((book, index) => (
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