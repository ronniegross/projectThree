import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SingleCheese from './SingleCheese.js'
import axios from 'axios'

class CheeseList extends Component {
    state = {
        user: {
            name: '',
            savedCheeses: []
        }
    }

    // componentDidMount = () => {
    //     axios.get('/api/fromage').then(res => {
    //         this.setState({ savedCheeses: res.data })
    //     })
    // }

    componentDidMount = () => {
        // console.log(this.props)
        if (this.props.match.params) {
            axios.get(`api/fromage/${this.props.match.params.userId}`)
                .then(res => {
                    console.log(res)
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
                <h1>cheese list</h1>
                <SingleCheese />
                {
                    this.state.user.savedCheeses.map(cheese => {
                        return (
                            <div key={cheese._id}>
                                <Link
                                    to={`/${cheese._id}`}
                                >
                                    {cheese.name}
                                </Link>
                            </div>
                            // <div>
                            //     <h2>name: {cheese.name}</h2>
                            //     <h3>type: {cheese.type}</h3>
                            //     <h3>hardness: {cheese.hardness}</h3>
                            //     <h3>price: {cheese.price}</h3>
                            //     <h3>region: {cheese.region}</h3>
                            //     <h3>purchase location: {cheese.purchaseLocation}</h3>
                            //     <h3>wine pairing: {cheese.winePairing}</h3>
                            //     <h3>image: {cheese.image}</h3>
                            //     <h3>buy again: {cheese.buyAgain}</h3>
                            // </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default CheeseList