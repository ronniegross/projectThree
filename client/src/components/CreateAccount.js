import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const TotalWrapper = styled.div`
    .logoBox {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
   .fromageLogo {
       width: 250px;
       margin-top: 30px;
   }
`

const ContentWrapper = styled.div`
    margin: 0 0 40px 40px;
    display: flex;
    flex-direction: column;
    .btn {
        background-color: #FEFFA6;
        color: #282828;
    }
    .input-field input[type=text]:focus {
        border-bottom: 1px solid #FEFFA6;
        box-shadow: 0 1px 0 0 #FEFFA6;
   }
    .input-field input[type=password]:focus {
        border-bottom: 1px solid #FEFFA6;
        box-shadow: 0 1px 0 0 #FEFFA6;
    }
   .h2 {
       color: #282828
   }
`

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
        if (this.state.redirectToHome === true && this.state.createdUser.id !== null) {
            return (<Redirect to={`/${this.state.createdUser._id}`} />)
        }
        return (
            <TotalWrapper>
                <div className="logoBox">
                    <img src="https://i.imgur.com/srOPLeg.png" alt="fromage" class="fromageLogo"></img>
                </div>
                <ContentWrapper>
                    <div>
                        <h3>create account</h3>
                        <form onSubmit={this.handleSignUp}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <label htmlFor="name">name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={this.handleChange}
                                        value={this.state.createdUser.name}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <label htmlFor="email">email</label>
                                    <input
                                        id="email"
                                        type="text"
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.createdUser.email}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <label htmlFor="password">password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        onChange={this.handleChange}
                                        value={this.state.createdUser.password}
                                    />
                                </div>
                            </div>
                            <button className="btn waves-effect waves-light" type="submit" name="action">create user</button>
                        </form>
                    </div>
                </ContentWrapper>
            </TotalWrapper>
        )
    }
}
