import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

export default class CreateAccount extends Component {
    state = {
        user: {
            name: '',
            email: '',
            password: '',
            savedCheeses: []
        },
        createdUser: {},
        redirectToHome: false
    }

    componentDidMount = () => {
        axios.get('/api/fromage').then(res => {
            this.setState({ user: res.data })
        })
    }

    createUser = () => {
        console.log("yup")
        axios.post('/api/fromage', { user: this.state.createdUser })
            .then(res => {
                console.log(res.data)
                this.setState({ redirectToHome: true, createdUser: res.data })
            })
    }

    handleSignUp = (event) => {
        event.preventDefault()
        this.createUser()
    }


    // createUser = (event) => {
    //     event.preventDefault()
    //     axios
    //         .post('/api/fromage', {
    //             name: this.state.newCreature.name,
    //             description: this.state.newCreature.description
    //         })
    //         .then(res => {
    //             const creaturesList = [...this.state.creatures]
    //             creaturesList.unshift(res.data)
    //             this.setState({
    //                 newCreature: {
    //                     name: '',
    //                     description: ''
    //                 },
    //                 isCreatureFormDisplayed: false,
    //                 creatures: creaturesList
    //             })
    //         })
    // }

    handleChange = (event) => {
        const clonedCreatedUser = { ...this.state.createdUser }
        clonedCreatedUser[event.target.name] = event.target.value
        this.setState({ createdUser: clonedCreatedUser })
    }


    render() {
        if (this.state.redirectToHome === true) {
            console.log(this.state.createdUser.id)
            // return (<Redirect to={`/user/${this.state.createdUser.id}/cheeses`} />)
        }
        console.log("CREATED USERS BITCCCCCHHHH - ", this.state.createdUser);
        return (
            <div>
                <h1>create account</h1>
                <form onSubmit={this.handleSignUp}>
                    <label htmlFor="name">name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.createdUser.name}
                        // value="name"
                    />
                    <label htmlFor="email">email</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.createdUser.email}
                    />
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        type="text"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.createdUser.password}
                    />
                    <button>create user</button>
                </form>
            </div>
        )
    }
}
