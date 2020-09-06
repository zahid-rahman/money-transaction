import React, { Component } from 'react'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import Transaction from '../components/Transaction'
import Profile from '../components/Profile'
import CreateTransaction from '../components/CreateTransaction'


let serverUrl = process.env.REACT_APP_SERVER_URL

export default class Dashboard extends Component {
    constructor(props){
        super()
        this.state = {
            renderView:''
        }
    }

    componentDidMount() {
        let authToken = JSON.parse(localStorage.getItem('login-token'))
        let decode = jwtDecode(authToken.token)

        const authHeader = {
            headers:{
                Authorization:authToken.token
            }
        }

        Axios.get(`${serverUrl}/transaction/list`,authHeader)
        .then(response => {
            this.setState({
                transactions:response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    

    renderHandler = (event) => {
        event.preventDefault()
        this.setState({
            renderView:event.target.value
        })
        
    }

    loadComponent = () => {
        switch (this.state.renderView) {
            case 'profile':
                return <Profile></Profile>
            case 'transactions':
                return <Transaction></Transaction> 
            case 'create-transaction':
                return <CreateTransaction></CreateTransaction> 
            default:
                return <Profile></Profile>
        }
    }
  

    render() {
        const navbar = <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">IFL Money app</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <button onClick={this.renderHandler} className="btn btn-link nav-link" value={"profile"}>Profile <span className="sr-only">(current)</span></button>
                    </li>

                    <li className="nav-item">
                        <button onClick={this.renderHandler} className="btn btn-link nav-link" value={"transactions"}>transacitons</button>
                    </li>

                    <li className="nav-item">
                        <button onClick={this.renderHandler} className="btn btn-link nav-link" value={"create-transaction"}>create transaction</button>
                    </li>

                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    <a href="/login" className="btn btn-danger" onClick={this.logoutHandler}>Logout</a>
                    </form>
                </div>
            </nav>
        </div>



        this.logoutHandler = () => {
            localStorage.removeItem('login-token')
        }


   
        return (
            <div>
                {navbar}
                {this.loadComponent()}
            </div>

        )

      
    }
}
