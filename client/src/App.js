import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Nav from './components/Nav'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
            {/* <h1>butts</h1> */}
                <Switch>
                    <Route exact path="/" component={Nav} />
                </Switch>
            </BrowserRouter>
        )
    }
}
