import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
    .addCheese {
        margin-top: 20px;
    }
    .cheeseBox {
        display: flex;
        flex-direction: column;
    }
    .cheesePic {
        width: 300px;
    }
`

class CheeseList extends Component {
    state = {
        user: {
            name: '',
            savedCheeses: []
        },
        createdCheese: {},
        isCheeseFormDisplayed: false
    }


    componentDidMount = () => {
        if (this.props) {
            axios.get(`/api/fromage/${this.props.match.params.userId}`)
                .then(res => {
                    this.setState({
                        user: {
                            _id: res.data._id,
                            name: res.data.name,
                            savedCheeses: res.data.savedCheeses,
                        }
                    })
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
                this.toggleCheeseForm()
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

    toggleCheeseForm = () => {
        this.setState((state, props) => {
            return ({ isCheeseFormDisplayed: !state.isCheeseFormDisplayed })
        })
    }


    render() {
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
                                            <div className="cheeseBox">
                                                {cheese.cheeseName}
                                                <img className="cheesePic" src={cheese.image} alt="cheese pic" />
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        <button onClick={this.toggleCheeseForm} className="btn waves-effect waves-light addCheese" type="submit" name="action">add a new cheese</button>
                        {
                            this.state.isCheeseFormDisplayed
                                ? <form onSubmit={this.handleCreateCheese} id="cheese-form">
                                    <h3>add a new cheese</h3>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="cheeseName">cheese name</label>
                                            <input
                                                id="cheeseName"
                                                type="text"
                                                name="cheeseName"
                                                onChange={this.handleChange}
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
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>other</span>
                                                </label>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="firmness">firmness</label>
                                            <p>
                                                <label>
                                                    <input
                                                        name="firmness"
                                                        type="radio"
                                                        value="fresh"
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>fresh</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input
                                                        name="firmness"
                                                        type="radio"
                                                        value="soft"
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>soft</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input
                                                        name="firmness"
                                                        type="radio"
                                                        value="semi-firm"
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>semi-firm</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input
                                                        name="firmness"
                                                        type="radio"
                                                        value="firm"
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>firm</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input
                                                        name="firmness"
                                                        type="radio"
                                                        value="blue"
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>blue</span>
                                                </label>
                                            </p>
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
                                            />
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="activeInput col s6">
                                            <label htmlFor="pairedWith">paired with</label>
                                            <input
                                                id="pairedWith"
                                                type="text"
                                                name="pairedWith"
                                                onChange={this.handleChange}
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
                                                        onChange={this.handleChange}
                                                    />
                                                    <span>no</span>
                                                </label>
                                            </p>
                                        </div>
                                    </div>
                                    <button className="btn waves-effect waves-light" type="submit" name="action">add cheese</button>
                                </form>
                                : null
                        }
                    </ContentWrapper>
                </TotalWrapper>
            </div>
        )
    }
}

export default CheeseList