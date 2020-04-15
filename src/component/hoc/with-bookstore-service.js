import React from 'react';
import { BookstoreServiceConsumer } from '../bookstore-service-context';

const withBookstoreService = () => (Wrapped) => {

  return (props) => {
    return (
      <BookstoreServiceConsumer>
        {
          (BookstoreService) => {
            return (<Wrapped {...props}
                     bookstoreService={BookstoreService}/>);
          }
        }
      </BookstoreServiceConsumer>
    );
  }
};

export default withBookstoreService;