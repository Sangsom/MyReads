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
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the Book  sAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            booksFound.map((book, index) => (
                                <li key={index}>
                                    <Book book={book} moveBook={this.props.moveBook} />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}