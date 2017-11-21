import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main } from './Main';
import * as BooksAPI from './BooksAPI';
import { SearchBooks } from './SearchBooks';
import { ErrorPage } from './ErrorPage';

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
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({ // Filter out books so they don't repeat and add new book to an array
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  render() {
    const books = this.state.books;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <Main books={books} moveBook={this.moveBook} />
          )} />
          <Route path="/search" render={() => (
            <SearchBooks mainBooks={books} moveBook={this.moveBook} />
          )} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
