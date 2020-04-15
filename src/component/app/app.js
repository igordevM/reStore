import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './app.css';

import { HomePage, CartPage } from '../pages';
import ShopHeader from '../shop-header';


export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="container">
                    <ShopHeader numItems={5} total={210}/>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/cart-page" component={CartPage} />
                    </Switch>
                </div>
            </div>
        );
    };
};