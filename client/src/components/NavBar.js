import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Redirect, Link } from 'react-router-dom'



class NavBar extends Component {
    render() {
        return(
            <div>
                <h1>nav bar</h1>
                {/* <Link to={`${this.promsuserId}/cheeses`}>cheese list</Link> */}
                <Link to={`:userId/cheeses`}>cheese list</Link>
                <Link to="/:id">account info</Link>
                <Link to="/:userId/cheeses">add cheese</Link>
            </div>
        )
    }
}

export default NavBar