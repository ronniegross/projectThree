import React, { Component } from 'react'
import NavBar from './NavBar.js'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'
import update from 'immutability-helper';
import styled from 'styled-components'

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
    a {
        color: tomato;
    }
`

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
                        <TotalWrapper>
                            <div className="logoBox">
                                <img src="https://i.imgur.com/srOPLeg.png" alt="fromage" className="fromageLogo"></img>
                            </div>
                            <NavBar
                                userId={this.props.match.params.userId}
                                cheeseId={this.props.match.params.cheeseId}
                            />
                            <ContentWrapper>
                                <h2>edit {this.state.savedCheese.cheeseName}</h2>
                                <form onSubmit={this.updateCheese}>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="cheeseName">cheese name</label>
                                            <input
                                                id="cheeseName"
                                                type="text"
                                                name="cheeseName"
                                                onChange={this.handleChange}
                                                value={this.state.savedCheese.cheeseName}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="type">type</label>
                                            <p>
                                                <label>
                                                    <input
                                                        name="type"
                                                        type="radio"
                                                        value="cow"
                                                        checked={this.state.savedCheese.type === "cow"}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>cow</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input
                                                        name="type"
                                                        type="radio"
                                                        value="goat"
                                                        checked={this.state.savedCheese.type === "goat"}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>goat</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input
                                                        name="type"
                                                        type="radio"
                                                        value="sheep"
                                                        checked={this.state.savedCheese.type === "sheep"}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>sheep</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input
                                                        name="type"
                                                        type="radio"
                                                        value="other"
                                                        checked={this.state.savedCheese.type === "other"}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>other</span>
                                                </label>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="hardness">hardness</label>
                                            <input
                                                id="hardness"
                                                type="text"
                                                name="hardness"
                                                onChange={this.handleChange}
                                                value={this.state.savedCheese.hardness}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="region">region</label>
                                            <input
                                                id="region"
                                                type="text"
                                                name="region"
                                                onChange={this.handleChange}
                                                value={this.state.savedCheese.region}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="purchaseLocation">purchased at</label>
                                            <input
                                                id="purchaseLocation"
                                                type="text"
                                                name="purchaseLocation"
                                                onChange={this.handleChange}
                                                value={this.state.savedCheese.purchaseLocation}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="winePairing">paired with</label>
                                            <input
                                                id="winePairing"
                                                type="text"
                                                name="winePairing"
                                                onChange={this.handleChange}
                                                value={this.state.savedCheese.winePairing}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="image">image link</label>
                                            <input
                                                id="image"
                                                type="text"
                                                name="image"
                                                onChange={this.handleChange}
                                                value={this.state.savedCheese.image}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="buyAgain">buy again?</label>
                                            <p>
                                                <label>
                                                    <input
                                                        name="buyAgain"
                                                        type="radio"
                                                        value="yes"
                                                        checked={this.state.savedCheese.buyAgain === "yes"}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>yes</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input
                                                        name="buyAgain"
                                                        type="radio"
                                                        value="no"
                                                        checked={this.state.savedCheese.buyAgain === "no"}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>no</span>
                                                </label>
                                            </p>
                                        </div>
                                    </div>
                                    <button className="btn waves-effect waves-light" type="submit" name="action">update cheese</button>
                                </form>
                                <button className="btn waves-effect waves-light delete" type="submit" name="action" onClick={this.deleteCheese}>delete cheese</button>
                            </ContentWrapper>
                        </TotalWrapper>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default SingleCheese