import React, { Component } from 'react'
import Axios from 'axios'
let serverUrl = process.env.REACT_APP_SERVER_URL

export default class Dashboard extends Component {
    constructor(props){
        super()
    }

    componentDidMount() {
        let authToken = JSON.parse(localStorage.getItem('login-token'))

        const authHeader = {
            headers:{
                Authorization:authToken.token
            }
        }

        Axios.get(`${serverUrl}/transaction/list`,authHeader)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
            console.error(error)
        })
    }
    

    render() {
        // console.log(this.props.store.token)
        this.logoutHandler = () => {
            localStorage.removeItem('login-token')
        }
        return (
            <div>
                <h1>Welcome to {this.props.data} dashboard</h1>
                <a href="/login" className="btn btn-danger" onClick={this.logoutHandler}>Logout</a>
            </div>
        )
    }
}
