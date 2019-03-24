import React, { Component } from 'react'
import NavBar from './NavBar.js'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'

class SingleCheese extends Component {
    state = {
        user: {
            name: '',
            savedCheeses: []
        },
        redirectToCheeseList: false
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
            console.log(this.props)
            this.setState({
                user: {
                    _id: res.data._id,
                    name: res.data.name,
                    savedCheeses: res.data.savedCheeses,
                }
            })
        })
    }

    deleteCheese = (event) => {
        event.preventDefault()
        axios.delete(`/api/fromage/${this.props.match.params.userId}/cheeses/${this.props.match.params.cheeseId}`).then(res => {
            this.setState({redirectToCheeseList: true})
        })
    } 

    render() {
        // console.log(this.props);
        // console.log(this.state)
        // display the one cheese on user where that cheese's id in the array on the user === this.props.match.params.cheeseId
        // if (this.state.redirectToSignUp === true ) {
        //     return(<Redirect to=`/api/fromage/${this.props.match.params.userId}/cheeses` />)
        // }
        return (
            <div>
                {/* <NavBar /> */}
                <h2>single cheese</h2>
                {
                    this.state.user.savedCheeses.map(cheese => {
                        if (cheese._id === this.props.match.params.cheeseId) {
                            return (
                                <div>
                                    <h2>name: {cheese.cheeseName}</h2>
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
            <button onClick={this.deleteCheese}>delete cheese</button>
            </div>
        )
    }
}

export default SingleCheese