const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 0
};

const reducer = (state = initialState, action) => {
    console.log('action.type: ', action.type);
    const bookId = action.payload;
    const book = state.books.find((book) => book.id === bookId );
    switch (action.type) {
        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            };
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            };
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            };
        case 'BOOK_ADDED_TO_CART':
            if (state.cartItems.some((item) => item.id === bookId)) {

                const newArr = state.cartItems.map((item) => {
                    if (item.id === bookId) {
                        item.count++;
                        item.price += book.price;
                        state.orderTotal += book.price;
                    };
                    return item;
                })

                return {
                    ...state,
                    cartItems: newArr
                }
            };

            const newItem =  {
                name: book.title,
                id: bookId,
                count: 1,
                price: book.price
            };
            
            state.orderTotal += book.price;

            return {
                ...state,
                cartItems: [ ...state.cartItems, newItem ]
            };
        case 'DELETE_CART_ITEM':
            const newArr = state.cartItems.filter((el) => {
                if (!(el.id !== bookId)) {
                    state.orderTotal -= el.price;    
                }
                return el.id !== bookId;
            });
            return {
                ...state,
                cartItems: newArr
            }
        case 'INC_CART_ITEM':
            if (state.cartItems.some((item) => item.id === bookId)) {
                const newArr = state.cartItems.map((item) => {
                    if (item.id === bookId) {
                        item.count++;
                        item.price += book.price;
                    };
                    return item;
                })

                state.orderTotal += book.price;

                return {
                    ...state,
                    cartItems: newArr
                };
            };
            break;
        case 'DEC_CART_ITEM':
            if (state.cartItems.some((item) => item.id === bookId)) {
                const newArr = state.cartItems.map((item) => {
                    if (item.id === bookId && item.count !== 0) {
                        item.count--;
                        item.price -= book.price;
                    };
                    return item;
                })
                state.orderTotal -= book.price;
                return {
                    ...state,
                    cartItems: newArr
                };
            };
            break;

        default :
            return state;    
    };
};

export default reducer;