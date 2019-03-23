import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SingleCheese from './SingleCheese.js'
import NavBar from './NavBar.js'
import axios from 'axios'

class CheeseList extends Component {
    state = {
        user: {
            name: '',
            savedCheeses: []
        }
    }

    componentDidMount = () => {
        if (this.props.match.params) {
            axios.get(`/api/fromage/${this.props.match.params.userId}`)
                .then(res => {
                    this.setState({
                        user: {
                            _id: res.data._id,
                            name: res.data.name,
                            savedCheeses: res.data.savedCheeses,
                        }
                    })
                })

        }
    }

    render() {
        return (
            <div>
                {/* <NavBar /> */}
                <h1>cheese list</h1>
                {
                    this.state.user.savedCheeses.map(cheese => {
                        return (
                            <div key={cheese._id}>
                                <Link
                                    to={`/${this.props.match.params.userId}/cheeses/${cheese._id}`}
                                >
                                    {cheese.name}
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default CheeseList