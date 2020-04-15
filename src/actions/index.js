const booksLoaded = (newBooks) => {
    return {
      type: 'FETCH_BOOKS_SUCCESS',
      payload: newBooks
    };
  };

const booksRequest = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  };
};

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  };
};


export const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  };
};

export const fetchBooks = (dispatch, bookstoreService) => () => {
  dispatch(booksRequest());
  bookstoreService.getBooks()
      .then((data) => {
          dispatch(booksLoaded(data))
      })
      .catch((error) => {
          dispatch(booksError(error))
      })
};
  
export const onDelete = (id) => {
  return {
    type: 'DELETE_CART_ITEM',
    payload: id
  };
};

export const onDec = (id) => {
  return {
    type: 'DEC_CART_ITEM',
    payload: id
  };
};

export const onInc = (id) => {
  return {
    type: 'INC_CART_ITEM',
    payload: id
  };
};

