import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar.js'
import CheeseList from './components/CheeseList.js'

export default class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Switch>
                        <Route exact path="/:userId" component={CheeseList} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
