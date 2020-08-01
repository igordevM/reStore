import { updateBookList } from './update-books-list';
import { updateShoppingCart } from './update-shopping-cart';

const initialState = {
    booksList: {
        books: [],                      
        loading: true,
        error: null,
    },
    shoppingCart: {
        cartItems: [],
        orderTotal: 0
    }
};

const reducer = (state = initialState, action) => {
    return {
        booksList: updateBookList(state, action),
        shoppingCart: updateShoppingCart(state, action)
    }
};

export default reducer;
