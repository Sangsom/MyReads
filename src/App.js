import React from 'react';
import * as BooksAPI from './BooksAPI';
import { SearchBooks } from './SearchBooks';
import { Bookshelf } from './Bookshelf';
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  handleSearchPage = () => {
    this.setState((prevState) => ({
      showSearchPage: !prevState.showSearchPage
    }))
  }

  render() {

    const bookShelfs = {
      'currentlyReading': 'Currently Reading',
      'wantToRead': 'Want to Read',
      'read': 'Read'
    }

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks handleSearchPage={this.handleSearchPage} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf 
                  books={this.state.books} 
                  shelf='currentlyReading'
                  title={bookShelfs.currentlyReading} 
                />
                <Bookshelf 
                  books={this.state.books} 
                  shelf='wantToRead'
                  title={bookShelfs.wantToRead} 
                />
                <Bookshelf 
                  books={this.state.books} 
                  shelf='read'
                  title={bookShelfs.read} 
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={this.handleSearchPage}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
