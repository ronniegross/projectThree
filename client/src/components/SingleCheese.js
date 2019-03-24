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
            // console.log(this.props)
            const singleCheese = res.data.savedCheeses.filter(cheese => {
                return (
                    cheese._id === this.props.match.params.cheeseId
                )
            })
            this.setState({
                user: {
                    _id: res.data._id,
                    name: res.data.name,
                    savedCheeses: singleCheese,
                }
            })
        })
    }

    handleChange = (event) => {
        const clonedCheese = { ...this.state.user.savedCheeses }
        clonedCheese[event.target.name] = event.target.value
        this.setState({ user: clonedCheese })
    }

    updateCheese = (event) => {
        event.preventDefault()
        axios.put(`/api/fromage/${this.props.match.params.userId}/cheeses/${this.props.match.params.cheeseId}`, { savedCheeses: this.state.user.savedCheeses })
    }

    deleteCheese = (event) => {
        event.preventDefault()
        axios.delete(`/api/fromage/${this.props.match.params.userId}/cheeses/${this.props.match.params.cheeseId}`).then(res => {
            this.setState({ redirectToCheeseList: true })
        })
    }

    render() {
        // console.log(this.props);
        // console.log(this.state)
        // display the one cheese on user where that cheese's id in the array on the user === this.props.match.params.cheeseId
        if (this.state.redirectToCheeseList === true) {
            return (<Redirect to={`/${this.props.match.params.userId}/cheeses`} />)
        }
        return (
            <div>
                {this.state.user.savedCheeses.length > 0 ?
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
                        <h2>edit cheese</h2>
                        <form onSubmit={this.UpdateCheese}>
                            <h2>edit current cheese</h2>
                            <label htmlFor="cheeseName">cheese name</label>
                            <input
                                id="cheeseName"
                                type="text"
                                name="cheeseName"
                                onChange={this.handleChange}
                                value={this.state.user.savedCheeses[0].cheeseName}
                            />
                            <label htmlFor="type">type</label>
                            <input
                                id="type"
                                type="text"
                                name="type"
                                onChange={this.handleChange}
                            // value={this.state.createdCheese.type}
                            />
                            <label htmlFor="hardness">hardness</label>
                            <input
                                id="hardness"
                                type="text"
                                name="hardness"
                                onChange={this.handleChange}
                            // value={this.state.createdCheese.hardness}
                            />
                            <label htmlFor="price">price</label>
                            <input
                                id="price"
                                type="text"
                                name="price"
                                onChange={this.handleChange}
                            // value={this.state.createdCheese.price}
                            />
                            <label htmlFor="region">region</label>
                            <input
                                id="region"
                                type="text"
                                name="region"
                                onChange={this.handleChange}
                            // value={this.state.createdCheese.region}
                            />
                            <label htmlFor="purchaseLocation">purchased at</label>
                            <input
                                id="purchaseLocation"
                                type="text"
                                name="purchaseLocation"
                                onChange={this.handleChange}
                            // value={this.state.createdCheese.purchaseLocation}
                            />
                            <label htmlFor="winePairing">paired with (drink)</label>
                            <input
                                id="winePairing"
                                type="text"
                                name="winePairing"
                                onChange={this.handleChange}
                            // value={this.state.createdCheese.winePairing}
                            />
                            <label htmlFor="image">image link</label>
                            <input
                                id="image"
                                type="text"
                                name="image"
                                onChange={this.handleChange}
                            // value={this.state.createdCheese.image}
                            />
                            <label htmlFor="buyAgain">buy again?</label>
                            <input
                                id="buyAgain"
                                type="text"
                                name="buyAgain"
                                onChange={this.handleChange}
                            // value={this.state.createdCheese.buyAgain}
                            />
                            <button>update cheese</button>
                        </form>

                    </div>
                    : null
                }
            </div>
        )
    }
}

export default SingleCheese