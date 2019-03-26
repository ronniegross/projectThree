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