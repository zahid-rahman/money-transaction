import React, { Component } from 'react'

export default class Dashboard extends Component {
    constructor(props){
        super()
       
    }

    render() {
        console.log(this.props)
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
