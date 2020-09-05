import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'

export default class Profile extends Component {
    constructor(props){
        super()
        this.state = {
            user:[],
        }
    }

    componentDidMount() {
        let authToken = JSON.parse(localStorage.getItem('login-token'))
        let decode = jwtDecode(authToken.token)
        this.setState({
            user:decode
        })
    }

    

    render() {
        console.log(this.state.user)
        let userDetails = this.state.user
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
