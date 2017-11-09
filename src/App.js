import React from 'react';
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { SearchBooks } from './SearchBooks';
import { Bookshelf } from './Bookshelf';
import sortBy from 'sort-by';
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  moveBook = (book, shelf) => {
    book.shelf = shelf;
    this.setState((state) => ({
      books: state.books.map(book => book)
    }))
    BooksAPI.update(book, shelf);
  }

  moveFromSearch = (book, shelf) => {
    book.shelf = shelf;
    this.setState((state) => ({
      books: [...state.books, book]
    }))
    BooksAPI.update(book, shelf);
  }

  render() {
    const bookShelfs = {
      'currentlyReading': 'Currently Reading',
      'wantToRead': 'Want to Read',
      'read': 'Read'
    }

    let showingBooks = this.state.books;
    showingBooks.sort(sortBy('title'));

    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf 
                    books={showingBooks} 
                    shelf='currentlyReading'
                    title={bookShelfs.currentlyReading}
                    moveBook={this.moveBook} 
                  />
                  <Bookshelf 
                    books={showingBooks} 
                    shelf='wantToRead'
                    title={bookShelfs.wantToRead}
                    moveBook={this.moveBook}
                  />
                  <Bookshelf 
                    books={showingBooks} 
                    shelf='read'
                    title={bookShelfs.read}
                    moveBook={this.moveBook}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )} />

          <Route path="/search" render={() => (
            <SearchBooks mainBooks={showingBooks} moveBook={this.moveFromSearch} />
          )} />
      </div>
    )
  }
}

export default BooksApp
