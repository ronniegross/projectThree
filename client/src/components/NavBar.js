import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    .nav-wrapper {
        background-color: #FEFFA6;
    }
    a {
        color: #282828;
    }
    nav ul li:hover {
        /* background-color: rgba(255, 255, 255, 40); */
        background-color: white;
    }
`

class NavBar extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <Wrapper>
                    <nav>
                        <div className="nav-wrapper">
                            {/* <a href="#" class="brand-logo right">Logo</a> */}
                            <ul id="nav-mobile" className="left hide-on-med-and-down">
                                <li><Link to={`/${this.props.userId}/cheeses`}> cheese list </Link></li>
                                <li><Link to={`/${this.props.userId}`}> account info </Link></li>
                                {/* <li><Link to={`/${this.props.userId}/cheeses`}> add new cheese </Link></li> */}
                            </ul>
                        </div>
                    </nav>
                </Wrapper>
            </div>
        )
    }
}

export default NavBar