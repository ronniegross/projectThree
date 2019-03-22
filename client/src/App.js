import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar.js'
import CheeseList from './components/CheeseList.js'
import SingleCheese from './components/SingleCheese'

export default class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Switch>
                        <Route exact path="/:userId" component={CheeseList} />
                        <Route exact path="/:userId/cheeses/:cheeseId" component={SingleCheese}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
