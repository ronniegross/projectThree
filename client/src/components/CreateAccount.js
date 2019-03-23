import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import NavBar from './NavBar.js'
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
        axios.post('/api/fromage', { user: this.state.createdUser })
            .then(res => {
                this.setState({ redirectToHome: true, createdUser: res.data })
            })
    }

    handleSignUp = (event) => {
        event.preventDefault()
        this.createUser()
    }

    handleChange = (event) => {
        const clonedCreatedUser = { ...this.state.createdUser }
        clonedCreatedUser[event.target.name] = event.target.value
        this.setState({ createdUser: clonedCreatedUser })
    }


    render() {
        if (this.state.redirectToHome === true && this.state.createdUser.id !== null){
            return(<Redirect to={`/${this.state.createdUser._id}`} />)
        }
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
