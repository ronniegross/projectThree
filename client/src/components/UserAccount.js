import React, { Component } from 'react'
import NavBar from './NavBar.js'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'
import styled from 'styled-components'


const ContentWrapper = styled.div`
    /* width: 80%; */
    margin: 0 0 40px 40px;
    .btn {
        background-color: #FEFFA6;
        color: #282828;
        margin: 5px 0 5px 0;
    }
    .btn.delete {
        background-color: #FA7E7E;
    }
    .activeInput input[type=text]:focus {
        border-bottom: 1px solid #FEFFA6;
        box-shadow: 0 1px 0 0 #FEFFA6;
   }

`

const TotalWrapper = styled.div`
    .logoBox {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
   .fromageLogo {
       width: 250px;
       margin: 25px;
       justify-content: center;
   }
`


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
        this.setState({ user: clonedUser })
    }

    deleteUser = (event) => {
        event.preventDefault()
        axios.delete(`/api/fromage/${this.props.match.params.userId}`).then(res => {
            this.setState({ redirectToSignUp: true })
        })
    }

    render() {
        // console.log(this.props.match)
        if (this.state.redirectToSignUp === true) {
            return (<Redirect to="/" />)
        }
        return (
            <div>
                <TotalWrapper>
                        <div className="logoBox">
                            <img src="https://i.imgur.com/srOPLeg.png" alt="fromage" className="fromageLogo"></img>
                        </div>
                    <NavBar
                        userId={this.props.match.params.userId}
                    />
                    <ContentWrapper>
                        <div>

                            <h3>user account page</h3>
                            <form onSubmit={this.handleUpdate}>
                                <div className="row">
                                    <div className="activeInput col s6">
                                        <label htmlFor="name">name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            onChange={this.handleChange}
                                            value={this.state.user.name}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="activeInput col s6">
                                        <label htmlFor="email">email</label>
                                        <input
                                            id="email"
                                            type="text"
                                            name="email"
                                            onChange={this.handleChange}
                                            value={this.state.user.email}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="activeInput col s6">
                                        <label htmlFor="password">password</label>
                                        <input
                                            id="password"
                                            type="text"
                                            name="password"
                                            onChange={this.handleChange}
                                            value={this.state.user.password}
                                        />
                                    </div>
                                </div>
                                <button className="btn waves-effect waves-light" type="submit" name="action">update user information</button>
                            </form>
                            <button className="btn waves-effect waves-light delete" type="submit" name="action" onClick={this.deleteUser}>delete user</button>
                        </div>
                    </ContentWrapper>
                </TotalWrapper>
            </div>

        )
    }
}
