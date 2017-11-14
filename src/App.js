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
      books: [...state.books.filter(mainBook => mainBook.id !== book.id), book]
    }))
    BooksAPI.update(book, shelf);
  }

  render() {
    const books = this.state.books;

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
    ]

    return (
      <div className="app">
          <Route exact path="/" render={() => (
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
                      moveBook={this.moveBook} 
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )} />

          <Route path="/search" render={() => (
            <SearchBooks mainBooks={books} moveBook={this.moveFromSearch} />
          )} />
      </div>
    )
  }
}

export default BooksApp
