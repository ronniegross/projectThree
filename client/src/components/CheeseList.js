import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SingleCheese from './SingleCheese.js'
import NavBar from './NavBar.js'
import axios from 'axios'

class CheeseList extends Component {
    state = {
        user: {
            name: '',
            // savedCheeses: []
        },
        // createdCheese: [],
        newCheeses: []
    }

    componentDidMount = () => {
        if (this.props) {
            // console.log(this.props.match.params)
            axios.get(`/api/fromage/${this.props.match.params.userId}`)
                .then(res => {
                    this.setState({
                        user: {
                            _id: res.data._id,
                            name: res.data.name,
                            savedCheeses: res.data.savedCheeses,
                        }
                    })
                    // console.log(res.data.savedCheeses)
                })

        }
    }


    // createUser = () => {
    //     axios.post('/api/fromage', { user: this.state.createdUser })
    //         .then(res => {
    //             this.setState({ redirectToHome: true, createdUser: res.data })
    //         })
    // }

    // #1
    // createCheese = () => {
    //     axios.post(`/api/fromage/${this.props.match.params.userId}/cheeses`, {savedCheeses : this.state.createdCheese})
    //         .then(res => {
    //             console.log(res.data)
    //             this.setState({ createdCheese: res.data})
    //         })

    // }

    // #3
    // createCheese = () => {
    //     const userId = this.props.match.params.userId
    //     axios.post(`/api/fromage/${userId}/cheeses`).then(res => {
    //         console.log(res)
    //         const newCheesesCopy = [...this.state.newCheeses]
    //         newCheesesCopy.unshift(res.data) //This will add the new Idea to the beginning of the array
    //         this.setState({newCheeses: newCheesesCopy})
    //     })
    // }


    createCheese = () => {
        const userId = this.props.match.params.userId
        axios.post(`/api/fromage/${userId}/cheeses`, { newCheeses: this.state.newCheeses })
            .then(res => {
                this.setState({ newCheeses: res.data })
            })
    }

    // #2
    // createCheese = () => {
    //     const userId = this.props.match.params.userId
    //     axios.post(`/api/fromage/${userId}/cheeses`).then(res => {
    //         const copyNewCheeses = [...this.state.newCheeses]
    //         copyNewCheeses.unshift(res.data) //This will add the new cheese to the beginning of the array
    //         console.log("i'm a copy of new cheeses",this.state.copyNewCheeses)
    //         this.setState({ newCheeses: copyNewCheeses })
    //         console.log("i'm a new cheese",this.state.newCheeses)
    //     })
    // }

    // createIdea = () => {
    //     const userId = this.props.match.params.userId
    //     axios.post(`/api/users/${userId}/ideas`).then(res => {
    //         const newIdeas = [...this.state.ideas]
    //         newIdeas.unshift(res.data) //This will add the new Idea to the beginning of the array
    //         this.setState({ideas: newIdeas})
    //     })
    // }

    handleCreateCheese = (event) => {
        event.preventDefault()
        this.createCheese()
    }

    handleChange = (event) => {
        const clonedCreatedCheese = { ...this.state.createdCheese }
        clonedCreatedCheese[event.target.name] = event.target.value
        this.setState({ createdCheese: clonedCreatedCheese })
    }


    render() {
        // console.log(this.state)
        return (
            <div>
                <NavBar
                    userId={this.props.match.params.userId}
                />
                <h1>cheese list</h1>
                {/* {

                    this.state.user.savedCheeses.map(cheese => {
                        return (
                            <div key={cheese._id}>
                                <Link
                                    to={`/${this.props.match.params.userId}/cheeses/${cheese._id}`}
                                >
                                    {cheese.cheeseName}
                                </Link>
                            </div>
                        )
                    })
                } */}
                {

                    this.state.newCheeses.map(cheese => {
                        return (
                            <div key={cheese._id}>
                                <Link
                                    to={`/${this.props.match.params.userId}/cheeses/${cheese._id}`}
                                >
                                    {cheese.cheeseName}
                                </Link>
                            </div>
                        )
                    })
                }
                <form onSubmit={this.handleCreateCheese}>
                    <h2>create cheese</h2>
                    <label htmlFor="cheeseName">cheese name</label>
                    <input
                        id="cheeseName"
                        type="text"
                        name="cheeseName"
                        onChange={this.handleChange}
                        value={this.state.newCheeses.name}
                    />
                    {/* <label htmlFor="type">type</label>
                    <input
                        id="type"
                        type="text"
                        name="type"
                    // onChange={this.handleChange}
                    // value={this.state.createdUser.email}
                    /> */}
                    {/* <label htmlFor="hardness">hardness</label>
                    <input
                        id="hardness"
                        type="text"
                        name="hardness"
                    // onChange={this.handleChange}
                    // value={this.state.createdUser.password}
                    />
                    <label htmlFor="price">price</label>
                    <input
                        id="price"
                        type="text"
                        name="price"
                        // onChange={this.handleChange}
                        // value={this.state.createdUser.name}
                    />
                    <label htmlFor="region">region</label>
                    <input
                        id="region"
                        type="text"
                        name="region"
                        // onChange={this.handleChange}
                        // value={this.state.createdUser.name}
                    /> */}
                    {/* <label htmlFor="purchaseLocation">purchased at</label>
                    <input
                        id="purchaseLocation"
                        type="text"
                        name="purchaseLocation"
                        // onChange={this.handleChange}
                        // value={this.state.createdUser.name}
                    />
                    <label htmlFor="winePairing">paired with (drink)</label>
                    <input
                        id="winePairing"
                        type="text"
                        name="winePairing"
                        // onChange={this.handleChange}
                        // value={this.state.createdUser.name}
                    />
                    <label htmlFor="image">image link</label>
                    <input
                        id="image"
                        type="text"
                        name="image"
                        // onChange={this.handleChange}
                        // value={this.state.createdUser.name}
                    />
                    <label htmlFor="buyAgain">buy again?</label>
                    <input
                        id="buyAgain"
                        type="text"
                        name="buyAgain"
                        // onChange={this.handleChange}
                        // value={this.state.createdUser.name}
                    /> */}
                    <button>add cheese</button>
                </form>
            </div>
        )
    }
}

export default CheeseList