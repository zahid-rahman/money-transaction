import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import cookie from 'js-cookie'

let serverUrl = process.env.REACT_APP_SERVER_URL    

class AuthComponent extends Component {

    constructor(){
        super()
        this.state = {
            user:""
        }
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        // alert(cookie.get('jk123lkd'));

        let authToken = cookie.get('jk123lkd')
        if(!authToken){
            window.location.href="/notAuthorize"
        }    
        else{
            let parseAuthToken = JSON.parse(authToken)
            let decode = jwtDecode(parseAuthToken.token)
            const authHeader = {
                headers:{
                    Authorization:authToken.token
                }
            }
            axios.get(`${serverUrl}/user/${decode._id}`,authHeader)
                .then(user => {
                    this.setState({
                        user
                    })
                })
                .catch(error => console.log(error))
        }
    }
    


    render() {

        let {user} = this.state
        if(user === ""){
            return(
                <div>
                    <Link to="/login"></Link>
                </div>
            )
        }
        else if (user !== ""){
            return <Dashboard></Dashboard>
        }
    }
}

export default withRouter(AuthComponent)
