import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar.js'
import CheeseList from './components/CheeseList.js'
import SingleCheese from './components/SingleCheese.js'
import CreateAccount from './components/CreateAccount.js'
import UserAccount from './components/UserAccount.js'

export default class App extends Component {
    render() {

        // const UserComponent = () => (
        //     <UserAccount
        //         // user={this.props.match.userId}
        //     />
        // )

        return (
            <Router>
                <div>
                    {/* <NavBar></NavBar> */}
                    <Switch>
                        <Route exact path="/" component={CreateAccount} />
                        <Route exact path="/:userId" component={UserAccount} />
                        <Route exact path="/:userId/cheeses" component={CheeseList} />
                        <Route exact path="/:userId/cheeses/:cheeseId" component={SingleCheese} />
                    </Switch>
                </div>
            </Router >
        )
    }
}
