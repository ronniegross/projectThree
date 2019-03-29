import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    .nav-wrapper {
        background-color: #FEFFA6;
    }
    a {
        color: #282828;
    }
    nav ul li:hover {
        background-color: white;
    }
`

class NavBar extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <nav>
                        <div className="nav-wrapper">
                            <ul className="left hide-on-med-and-down">
                                <li><Link to={`/${this.props.userId}/cheeses`}> cheese list </Link></li>
                                <li><Link to={`/${this.props.userId}`}> account info </Link></li>
                            </ul>
                        </div>
                    </nav>
                </Wrapper>
            </div>
        )
    }
}

export default NavBar