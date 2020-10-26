import React, { Component } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import cookie from 'js-cookie'
let serverUrl = process.env.REACT_APP_SERVER_URL    


export default class Profile extends Component {
    constructor(props){
        super()
        this.state = {
            userDetails:[]
        }
    }

    componentDidMount() {
        let authToken = JSON.parse(cookie.get('jk123lkd'))
        let decode = jwtDecode(authToken.token)
        this.setState({
            user:decode
        })

        const authHeader = {
            headers:{
                Authorization:authToken.token
            }
        }

        axios.get(`${serverUrl}/user/${decode._id}`,authHeader)
        .then(user => {
            this.setState({
                userDetails:user.data
            })
        })
        .catch(error => {
            console.log(error)
            console.error(error)
        })
    }

    render() {
        console.log(this.state.userDetails)

        let userDetails = this.state.userDetails
        let profileDetails = <div>
           <div className="jumbotron">
               <h4 >User Details</h4>
               <hr></hr>
               <p >Name : {userDetails.name} </p>
                <p >Email : {userDetails.email}</p>
                <br></br>
                <br></br>
               <h4 >Account Details</h4>
               <hr></hr>

    <p>Total balance : {userDetails.balance > 5000 ? <span className="badge badge-success">{userDetails.balance} BDT</span> : <span className="badge badge-danger">{userDetails.balance} BDT</span>} </p>
               <p>Total income : <span className="badge badge-info">{userDetails.income} BDT</span> </p>
               <p>Total expense : <span className="badge badge-danger">{userDetails.expense} BDT</span></p>
               </div>
           </div>
        return (
            <div>
                {profileDetails}
            </div>
        )
    }
}
