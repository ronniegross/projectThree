import React, { Component } from 'react'
import NavBar from './NavBar.js'
import axios from 'axios'

class SingleCheese extends Component {
    state = {
        user: {
            name: '',
            savedCheeses: []
        }
    }


    // componentDidMount = () => {
    //     axios.get(`api/fromage/${this.props.match.params.userId}`).then(res => {
    //         this.setState({
    //             user: {
    //                 _id: res.data._id,
    //                 name: res.data.name,
    //                 savedCheeses: res.data.savedCheeses,
    //             }
    //         })
    //     })
    // }

    componentDidMount = () => {
        axios.get(`/api/fromage/${this.props.match.params.userId}`).then(res => {
            // console.log(res.data)
            this.setState({
                user: {
                    _id: res.data._id,
                    name: res.data.name,
                    savedCheeses: res.data.savedCheeses,
                }
            })
        })
    }

    render() {
        // console.log(this.props);
        // console.log(this.state)
        // display the one cheese on user where that cheese's id in the array on the user === this.props.match.params.cheeseId
        return (
            <div>
                {/* <NavBar /> */}
                <h2>single cheese</h2>
                {
                    this.state.user.savedCheeses.map(cheese => {
                        if (cheese._id === this.props.match.params.cheeseId) {
                            return (
                                <div>
                                    <h2>name: {cheese.name}</h2>
                                    <h3>type: {cheese.type}</h3>
                                    <h3>hardness: {cheese.hardness}</h3>
                                    <h3>price: {cheese.price}</h3>
                                    <h3>region: {cheese.region}</h3>
                                    <h3>purchase location: {cheese.purchaseLocation}</h3>
                                    <h3>wine pairing: {cheese.winePairing}</h3>
                                    <h3>image: {cheese.image}</h3>
                                    <h3>buy again: {cheese.buyAgain}</h3>
                                </div>
                            )
                        }
                    })
                }

                {/* {
                    this.state.user.savedCheeses.map(cheese => {
                        if (targetedCheese._id === this.props.match.params.cheeseId) {

                            return (
                                <div>
                                    <h2>name: {cheese.name}</h2>
                                    <h3>type: {cheese.type}</h3>
                                    <h3>hardness: {cheese.hardness}</h3>
                                    <h3>price: {cheese.price}</h3>
                                    <h3>region: {cheese.region}</h3>
                                    <h3>purchase location: {cheese.purchaseLocation}</h3>
                                    <h3>wine pairing: {cheese.winePairing}</h3>
                                    <h3>image: {cheese.image}</h3>
                                    <h3>buy again: {cheese.buyAgain}</h3>
                                </div>
                            )
                        }
                    })
                    ))
            } */}
                {/* <div>
                    <h2>name: {this.match.params.cheese.name}</h2>
                    <h3>type: {this.props.cheese.type}</h3>
                    <h3>hardness: {this.props.cheese.hardness}</h3>
                    <h3>price: {this.props.cheese.price}</h3>
                    <h3>region: {this.props.cheese.region}</h3>
                    <h3>purchase location: {this.props.cheese.purchaseLocation}</h3>
                    <h3>wine pairing: {this.props.cheese.winePairing}</h3>
                    <h3>image: {this.props.cheese.image}</h3>
                    <h3>buy again: {this.props.cheese.buyAgain}</h3>
                </div> */}
                {/* <h3>name: {this.state.user.savedCheeses.name}</h3>
                <h3>type: {this.state.user.savedCheeses.type}</h3>
                <h3>hardness: {this.state.user.savedCheeses.hardness}</h3>
                <h3>price: {this.state.user.savedCheeses.price}</h3>
                <h3>region: {this.state.user.savedCheeses.region}</h3>
                <h3>purchase location: {this.state.user.savedCheeses.purchaseLocation}</h3>
                <h3>wine pairing: {this.state.user.savedCheeses.winePairing}</h3>
                <h3>image: {this.state.user.savedCheeses.image}</h3>
                <h3>buy again: {this.state.user.savedCheeses.buyAgain}</h3> */}
            </div>
        )
    }
}

export default SingleCheese