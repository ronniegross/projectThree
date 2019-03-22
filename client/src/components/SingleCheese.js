import React, { Component } from 'react'

class SingleCheese extends Component {
    state = {
        user: {
            name: '',
            savedCheeses: []
        }
    }
    render() {
        return(
            <div>
                <h2>single cheese</h2>
                <h3>name: {this.state.user.savedCheeses.name}</h3>
                <h3>type: {this.state.user.savedCheeses.type}</h3>
                <h3>hardness: {this.state.user.savedCheeses.hardness}</h3>
                <h3>price: {this.state.user.savedCheeses.price}</h3>
                <h3>region: {this.state.user.savedCheeses.region}</h3>
                <h3>purchase location: {this.state.user.savedCheeses.purchaseLocation}</h3>
                <h3>wine pairing: {this.state.user.savedCheeses.winePairing}</h3>
                <h3>image: {this.state.user.savedCheeses.image}</h3>
                <h3>buy again: {this.state.user.savedCheeses.buyAgain}</h3>
            </div>
        )
    }
}

export default SingleCheese