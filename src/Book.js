import React from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, List } from 'semantic-ui-react';
import { ShelfChanger } from './ShelfChanger';

export const Book = (props) => {
    const {book, moveBook} = props;
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover';

    return (
        <div className="book">
            <div className="book-top">
                <Modal dimmer='blurring' trigger={
                    <div className="book-cover" style={{ backgroundImage: `url("${thumbnail}")` }} />
                }>
                    <Modal.Header>{book.title}</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped src={thumbnail} />
                        <Modal.Description>
                            <p>{book.description}</p>
                            <p><strong>Publisher: </strong>{book.publisher}</p>
                            <p><strong>Published: </strong>{book.publishedDate}</p>
                            <p><strong>Pages: </strong>{book.pageCount}</p>
                            <p><strong>Authors:</strong></p>
                            <List>
                                {(book.authors) && (
                                    book.authors.map((author, index) => (
                                        <List.Item key={index}>
                                            <List.Icon name='users' />
                                            <List.Content>{author}</List.Content>
                                        </List.Item>
                                    ))
                                )}
                            </List>
                            <p><strong>Categories:</strong></p>
                            <List bulleted>
                                {(book.categories) && (
                                    book.categories.map((category, index) => (
                                        <List.Item key={index}>{category}</List.Item>
                                    ))
                                )}
                            </List>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
                <ShelfChanger 
                    book={book} 
                    moveBook={moveBook}
                />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
                {(book.authors ? book.authors.join(', ') : '') && (
                    book.authors.map((author, index) => (
                        <span key={index}>{author}<br/></span>
                    ))
                )}
            </div>
        </div>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
}