import React from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, List } from 'semantic-ui-react';
import { ShelfChanger } from './ShelfChanger';

export const Book = (props) => {
    const {book, moveBook} = props;

    return (
        <div className="book">
            <div className="book-top">
                <Modal trigger={
                    <div className="book-cover" 
                        style={
                            { 
                                width: 128, 
                                height: 193, 
                                backgroundImage: `url("${book.imageLinks.thumbnail}")`
                            }
                        }>
                    </div>
                }>
                    <Modal.Header>{book.title}</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped src={book.imageLinks.thumbnail} />
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
            <div className="book-authors">{book.authors}</div>
        </div>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
}