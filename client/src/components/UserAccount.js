import React, { Component } from 'react'
import NavBar from './NavBar.js'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'

export default class UserAccount extends Component {
    state = {
        user: {
            name: '',
            email: '',
            password: '',
            savedCheeses: []
        },
        redirectToSignUp: false
    }

    // currentUser = () => {
    //     const currentUser = {...this.state.user}
    //     this.setState({ user: currentUser })
    // }


    componentDidMount = () => {
        axios.get(`/api/fromage/${this.props.match.params.userId}`).then(res => {
            // console.log(res.data)
            // const currentUser = {...this.state.user}
            // this.setState({ user: currentUser })
        // axios.get(`/api/fromage/`).then(res => {
            this.setState({ user: res.data })
        })
    }


    updateUser = () => {
        axios.put(`/api/fromage/${this.props.match.params.userId}`, { user: this.state.user })
            .then(res => {
                // this.setState({ user: res.data })
            })
    }

    handleUpdate = (event) => {
        event.preventDefault()
        this.updateUser()
    }

    handleChange = (event) => {
        const clonedUser = { ...this.state.user }
        clonedUser[event.target.name] = event.target.value
        this.setState({ user: clonedUser})
    }

    deleteUser = (event) => {
        event.preventDefault()
        axios.delete(`/api/fromage/${this.props.match.params.userId}`).then(res => {
            this.setState({redirectToSignUp: true})
        })
    } 

    render() {
        // console.log(this.props.match)
        if (this.state.redirectToSignUp === true ) {
            return(<Redirect to="/" />)
        }
        return (
            <div>
                <NavBar 
                    userId={this.props.match.params.userId}
                />
                <h1>user account page</h1>
                <form onSubmit={this.handleUpdate}>
                    <label htmlFor="name">name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.user.name}
                    />
                    <label htmlFor="email">email</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.user.email}
                    />
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        type="text"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.user.password}
                    />
                    <button>update user information</button>
                </form>
                <button onClick={this.deleteUser}>delete user</button>
            </div>
        )
    }
}
