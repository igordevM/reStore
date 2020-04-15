export const updateShoppingCart = (state, action) => {
    const bookId = action.payload;
    const book = state.booksList.books.find((book) => book.id === bookId );
    
    switch (action.type) {
        case 'BOOK_ADDED_TO_CART': {
            if (state.shoppingCart.cartItems.some((item) => item.id === bookId)) {
                const newArr = state.shoppingCart.cartItems.map((item) => {
                    if (item.id === bookId) {
                        item.count++;
                        item.price += book.price;
                        state.shoppingCart.orderTotal += book.price;   
                    };
                    return item;
                });
                return {
                    ...state.shoppingCart,
                    cartItems: newArr
                };
            };

            const newItem =  {
                name: book.title,
                id: bookId,
                count: 1,
                price: book.price
            };
         
            state.shoppingCart.orderTotal += book.price;

            return {
                ...state.shoppingCart,
                cartItems: [ ...state.shoppingCart.cartItems, newItem ]
            };
        }
        case 'DELETE_CART_ITEM': {
                const newArr = state.shoppingCart.cartItems.filter((el) => {
                    if (!(el.id !== bookId)) {
                        state.shoppingCart.orderTotal -= el.price;    
                    }
                    return el.id !== bookId;
                });
                return {
                    ...state.shoppingCart,
                    cartItems: newArr
                }
        }
        case 'INC_CART_ITEM':{
            if (state.shoppingCart.cartItems.some((item) => item.id === bookId)) {
                const newArr = state.shoppingCart.cartItems.map((item) => {
                    if (item.id === bookId) {
                        item.count++;
                        item.price += book.price;
                    };
                    return item;
                })

                state.shoppingCart.orderTotal += book.price;

                return {
                    ...state.shoppingCart,
                    cartItems: newArr
                };
            };
            break;
        }
        case 'DEC_CART_ITEM':{  
            if (state.shoppingCart.cartItems.some((item) => item.id === bookId)) {
                const newArr = state.shoppingCart.cartItems.map((item) => {
                    if (item.id === bookId && item.count !== 0) {
                        item.count--;
                        item.price -= book.price;
                        state.shoppingCart.orderTotal -= book.price;
                    };
                    return item;
                })
                
                return {
                    ...state.shoppingCart,
                    cartItems: newArr
                };
            };
            break;
        }
        default :
            return state.shoppingCart;
    }    
}