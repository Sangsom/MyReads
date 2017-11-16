import React from 'react';
import { Route } from 'react-router-dom';
import { Main } from './Main';
import * as BooksAPI from './BooksAPI';
import { SearchBooks } from './SearchBooks';

import './App.css'

class BooksApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      books: []
    }
  }
  

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  moveBook = (book, shelf) => {
    book.shelf = shelf;
    this.setState((state) => {
      return { books: state.books.map(book => book) }
    })
    BooksAPI.update(book, shelf);
  } 

  moveFromSearch = (book, shelf) => {
    let newBooks = this.state.books.push(book);
    newBooks = this.state.books.map(newBook => {
      if (newBook.id === book.id) newBook.shelf = shelf;
      return newBook;
    });

    this.setState((state) => {
      return { books: newBooks }
    });

    BooksAPI.update(book, shelf);
  }

  render() {
    const books = this.state.books;

    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <Main books={books} moveBook={this.moveBook} />
          )} />
          <Route path="/search" render={() => (
            <SearchBooks mainBooks={books} moveBook={this.moveFromSearch} />
          )} />
      </div>
    )
  }
}

export default BooksApp
