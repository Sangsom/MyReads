import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import { Book } from './Book';
import sortBy from 'sort-by';

export class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            found: [],
            query: ''
        }
    }

    static propTypes = {
        mainBooks: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired
    }

    updateQuery (query) {
        const cleanQuery = query.trim();

        this.setState({ query: cleanQuery });
        BooksAPI.search(cleanQuery).then(books => {
            if (books && !books.error) {
                this.setState({ found: books });
            } else if (query.length === 0 || books.error) {
                this.setState({ found: [] });
            }
        })
    }

    // Helper function for finding book shelf from main page
    getShelf(id) {
        let bookshelf;
        this.props.mainBooks.map(book => {
            if(book.id === id) {
                bookshelf = book.shelf
            }
            return book;
        })
        return bookshelf;
    }

    render() {
        const {found} = this.state;
        let booksFound = found.sort(sortBy('title'));
        
        // Iterate through found books and compare to books from main page and add correct book shelfs
        booksFound.map(book => {
            return this.getShelf(book.id) !== undefined ? book.shelf = this.getShelf(book.id) : book;
        });

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link   
                        to="/"
                        className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="100" handler="onChange">
                            <input 
                                type="text" 
                                placeholder="Search by title or author"
                                onChange={(e) => this.updateQuery(e.target.value)}
                            />
                        </Debounce>
                        
                    </div>
                </div>
                
                <div className="search-books-results">
                    <ol className="books-grid">
                        { booksFound.map((book, index) => (
                            <li key={book.id}>
                                <Book book={book} moveBook={this.props.moveBook} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}