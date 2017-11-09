import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { Book } from './Book';
import sortBy from 'sort-by';

/**
 * TODO: If in search page book is also in main page let it show current shelf it is
 */

export class SearchBooks extends Component {
    state = {
        found: [],
        query: ''
    }

    updateQuery (query) {
        this.setState({ query: query.trim() });

        BooksAPI.search(this.state.query).then(books => {
            if (books && !books.error) {
                this.setState({ found: books });
            }
        })
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log(nextProps.mainBooks);
        // console.log(nextState.found);
    }

    render() {
        const {query, found} = this.state;

        let booksFound = found.sort(sortBy('title'));

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