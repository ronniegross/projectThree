import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SingleCheese from './SingleCheese.js'
import NavBar from './NavBar.js'
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

class CheeseList extends Component {
    state = {
        user: {
            name: '',
            savedCheeses: []
        },
        createdCheese: {}
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
                            // image: res.data.image,
                            savedCheeses: res.data.savedCheeses,
                        }
                    })
                    // console.log(res.data.savedCheeses)
                })

        }
    }

    createCheese = () => {
        const userId = this.props.match.params.userId
        axios.post(`/api/fromage/${userId}/cheeses`, { newCheese: this.state.createdCheese })
            .then(res => {
                const clonedUser = { ...this.state.user }
                clonedUser.savedCheeses.push(res.data)
                this.setState({ user: clonedUser, createdCheese: {} })
                document.getElementById("cheese-form").reset()
                // this.setState({ newCheeses: res.data })
            })
    }

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
        // if (this.state.redirectToCheeseList === true) {
        //     return (<Redirect to={`/${this.props.match.params.userId}/cheeses`} />)
        // }
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
                        <h3>cheese list</h3>
                        {

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
                        }
                        <form onSubmit={this.handleCreateCheese} id="cheese-form">
                            <h3>add new cheese</h3>
                            <div className="row">
                                <div className="activeInput col s6">
                                    <label htmlFor="cheeseName">cheese name</label>
                                    <input
                                        id="cheeseName"
                                        type="text"
                                        name="cheeseName"
                                        onChange={this.handleChange}
                                    // value={this.state.createdCheese.cheeseName}
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
                                                // checked={this.state.savedCheese.buyAgain === "yes"}
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
                                                // checked={this.state.savedCheese.buyAgain === "no"}
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
                                                // checked={this.state.savedCheese.buyAgain === "no"}
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
                                                // checked={this.state.savedCheese.buyAgain === "no"}
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
                                    // value={this.state.createdCheese.hardness}
                                    />
                                </div>

                            </div>

                            <div className="row">
                                <div className="activeInput col s6">
                                    <label htmlFor="price">price</label>
                                    <input
                                        id="price"
                                        type="text"
                                        name="price"
                                        onChange={this.handleChange}
                                    // value={this.state.createdCheese.price}
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
                                    // value={this.state.createdCheese.region}
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
                                    // value={this.state.createdCheese.purchaseLocation}
                                    />
                                </div>

                            </div>

                            <div className="row">
                                <div className="activeInput col s6">
                                    <label htmlFor="winePairing">paired with (drink)</label>
                                    <input
                                        id="winePairing"
                                        type="text"
                                        name="winePairing"
                                        onChange={this.handleChange}
                                    // value={this.state.createdCheese.winePairing}
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
                                    // value={this.state.createdCheese.image}
                                    />
                                </div>

                            </div>

                            {/* <div className="row">
                                <div className="activeInput col s6">
                                    <label htmlFor="buyAgain">buy again?</label>
                                    <input
                                        id="buyAgain"
                                        type="text"
                                        name="buyAgain"
                                        onChange={this.handleChange}
                                    // value={this.state.createdCheese.buyAgain}
                                    />
                                </div>

                            </div> */}
                            <label htmlFor="buyAgain">buy again?</label>
                            <p>
                                <label>
                                    <input
                                        name="buyAgain"
                                        type="radio"
                                        value="yes"
                                        // checked={this.state.savedCheese.buyAgain === "yes"}
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
                                        // checked={this.state.savedCheese.buyAgain === "no"}
                                        onChange={this.handleChange}
                                    />
                                    <span>no</span>
                                </label>
                            </p>
                            <button className="btn waves-effect waves-light" type="submit" name="action">add cheese</button>
                        </form>
                    </ContentWrapper>
                </TotalWrapper>
            </div>
        )
    }
}

export default CheeseList