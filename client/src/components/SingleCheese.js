import React, { Component } from 'react'
import NavBar from './NavBar.js'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'
import update from 'immutability-helper';

class SingleCheese extends Component {
    state = {
        user: {
            name: '',
            savedCheese: {}
        },
        savedCheese: {},
        redirectToCheeseList: false
    }


    // componentDidMount = () => {
    //     axios.get(`api/fromage/${this.props.match.params.userId}`).then(res => {
    //         this.setState({
    //             user: {
    //                 _id: res.data._id,
    //                 name: res.data.name,
    //                 savedCheese: res.data.savedCheese,
    //             }
    //         })
    //     })
    // }

    componentDidMount = () => {
        axios.get(`/api/fromage/${this.props.match.params.userId}`).then(res => {
            const singleCheese = res.data.savedCheeses.filter(cheese => {
                return (
                    cheese._id === this.props.match.params.cheeseId
                )
            })
            this.setState({
                user: {
                    _id: res.data._id,
                    name: res.data.name,
                    savedCheese: singleCheese[0],
                }
            })
            this.setState({ savedCheese: singleCheese[0] })
        })
    }

    // handleChange = (event) => {
    //     const clonedUser = { ...this.state }
    //     clonedUser[event.target.name] = event.target.value
    //     this.setState({ user: clonedUser})
    // }


    handleChange = (event) => {
        const clonedCheese = { ...this.state.savedCheese }
        clonedCheese[event.target.name] = event.target.value
        this.setState({ savedCheese: clonedCheese })
    }

    updateCheese = (event) => {
        event.preventDefault()
        axios.put(`/api/fromage/${this.props.match.params.userId}/cheeses/${this.props.match.params.cheeseId}`, { savedCheese: this.state.savedCheese })
    }

    deleteCheese = (event) => {
        event.preventDefault()
        axios.delete(`/api/fromage/${this.props.match.params.userId}/cheeses/${this.props.match.params.cheeseId}`).then(res => {
            this.setState({ redirectToCheeseList: true })
        })
    }

    render() {
        // console.log(this.props);
        // console.log(this.state.savedCheese)
        // display the one cheese on user where that cheese's id in the array on the user === this.props.match.params.cheeseId
        if (this.state.redirectToCheeseList === true) {
            return (<Redirect to={`/${this.props.match.params.userId}/cheeses`} />)
        }
        return (
            <div>
                {this.state.savedCheese.cheeseName != null ?
                    <div>
                        {/* <NavBar /> */}
                        <h2>single cheese</h2>
                        {/* {
                            this.state.savedCheese.map(cheese => {
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
                        } */}
                        <button onClick={this.deleteCheese}>delete cheese</button>
                        <h2>edit cheese</h2>
                        <form onSubmit={this.updateCheese}>
                            <h2>edit current cheese</h2>
                            <label htmlFor="cheeseName">cheese name</label>
                            <input
                                id="cheeseName"
                                type="text"
                                name="cheeseName"
                                onChange={this.handleChange}
                                value={this.state.savedCheese.cheeseName}
                            />
                            <label htmlFor="type">type</label>
                            <input
                                id="type"
                                type="text"
                                name="type"
                                onChange={this.handleChange}
                                value={this.state.savedCheese.type}
                            />
                            <label htmlFor="hardness">hardness</label>
                            <input
                                id="hardness"
                                type="text"
                                name="hardness"
                                onChange={this.handleChange}
                                value={this.state.savedCheese.hardness}
                            />
                            <label htmlFor="price">price</label>
                            <input
                                id="price"
                                type="text"
                                name="price"
                                onChange={this.handleChange}
                                value={this.state.savedCheese.price}
                            />
                            <label htmlFor="region">region</label>
                            <input
                                id="region"
                                type="text"
                                name="region"
                                onChange={this.handleChange}
                                value={this.state.savedCheese.region}
                            />
                            <label htmlFor="purchaseLocation">purchased at</label>
                            <input
                                id="purchaseLocation"
                                type="text"
                                name="purchaseLocation"
                                onChange={this.handleChange}
                                value={this.state.savedCheese.purchaseLocation}
                            />
                            <label htmlFor="winePairing">paired with (drink)</label>
                            <input
                                id="winePairing"
                                type="text"
                                name="winePairing"
                                onChange={this.handleChange}
                                value={this.state.savedCheese.winePairing}
                            />
                            <label htmlFor="image">image link</label>
                            <input
                                id="image"
                                type="text"
                                name="image"
                                onChange={this.handleChange}
                                value={this.state.savedCheese.image}
                            />
                            {/* <label htmlFor="buyAgain">buy again?</label>
                            <input
                                id="buyAgain"
                                type="text"
                                name="buyAgain"
                                onChange={this.handleChange}
                                value={this.state.savedCheese.buyAgain}
                            /> */}
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="buyAgain"
                                        value="yes"
                                        checked={true}
                                        className="form-check-input"
                                    />
                                    Yes
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="doNotBuyAgain"
                                        value="no"
                                        checked={true}
                                        className="form-check-input"
                                    />
                                    no
                                </label>
                            </div>
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