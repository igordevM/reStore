import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import compose  from '../../utils';

import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import Error from '../error';

import './book-list.css';


const BookList = ({ books, onAddedToCart }) => {
    return (
        <div className="book-list">
            <ul>
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}>
                                <BookListItem book={book} 
                                onAddedToCart={() => onAddedToCart(book.id)}/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const { books, loading, error, onAddedToCart } = this.props;
        
        if (loading) {
            return (
                <Spinner />
            );
        };

        if (error) {
            return (
                <Error />
            );
        };

        return (
            <BookList books={books} onAddedToCart={onAddedToCart}/>
        );
    };
};




const mapStateToProps = ({booksList: { books, loading, error }}) => {
  return { books, loading, error };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return {
       fetchBooks: fetchBooks(dispatch, bookstoreService),
       onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);


