import React, { Component } from 'react'
import axios from 'axios'

export default class CreateAccount extends Component {
    state = {
        user: {
            name: '',
            email: '',
            password: '',
            savedCheeses: []
        },
        createdUser: {}
    }

    componentDidMount = () => {
        axios.get('/api/fromage').then(res => {
            this.setState({ user: res.data })
        })
    }

    createUser = () => {
        axios.post('/api/fromage', {user: this.state.user})
            .then(res => {
                console.log(res.data)
                this.setState({createdUser: res.data})
            })
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
        const clonedCreatedUser = {...this.state.createdUser}
        clonedCreatedUser[event.target.name] = event.target.value
        this.setState({createdUser: clonedCreatedUser})
    }

    render() {
        return (
            <div>
                <h1>create account</h1>
                <form onSubmit={this.createUser}>
                    <label htmlFor="name">name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                    // onChange={this.handleChange}
                    // value={this.state.newCreature.name}
                    />
                    <label htmlFor="description">description</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                    // onChange={this.handleChange}
                    // value={this.state.newCreature.description}
                    />
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        type="text"
                        name="password"
                    // onChange={this.handleChange}
                    // value={this.state.newCreature.description}
                    />
                    <button>sign up</button>
                </form>
            </div>
        )
    }
}
