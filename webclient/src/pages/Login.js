import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import cookie from 'js-cookie'
import crypto from 'crypto'
let serverUrl = process.env.REACT_APP_SERVER_URL

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            passowrd: "",
            isLogin:false,
            error:{},
            store:null
        }
    }

    componentDidMount() {
        this.storeCollector()
    }



    storeCollector = () => {
  
        const user = cookie.get('jk123lkd')
        console.log(user)
        if(user){
            this.setState({isLogin:true,store:user})
        }
    }
    

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
        let data = this.state;
        
        axios.post(`${serverUrl}/user/login`,data)
        .then(response => {
            console.log(response.data)
            let tokenData = JSON.stringify({
                login:true,
                token:response.data.token
            });
            //fake cookies
            let fakeName = "";
            let fakeData = "";
            let fakeCookieData ="";

            for(let i=0;i<10;i++){
                fakeName = Math.random().toString(36).substring(7);
                fakeData = `{%login%true%token${crypto.randomBytes(18).toString('hex')}}`;
              fakeCookieData = `{%22login%22:true%2C%22token%22:%22Bearer%20${fakeData}.eyJfaWQiOiI1ZjUyZGU5YjA2ODAxZDE1Y2VlOGNhYWMiLCJuYW1lIjoiemFoaWQiLCJlbWFpbCI6InphaGlkQGdtYWlsLmNvbSIsImlhdCI6MTYwMzc0NTM4OSwiZXhwIjoxNjAzNzUyNTg5fQ.zjR2-rr${fakeData}%22}`
                cookie.set(fakeName,fakeCookieData,{expires:2})
            }
            //setting cookies
            cookie.set('jk123lkd',tokenData,{expires:2})
          

            let decode = jwtDecode(response.data.token)
            console.log(decode)
            this.setState({
                isLogin:true,
                email:decode.email
            })

            this.storeCollector()
        })
        .catch(error => {
            this.setState({
                error: error
            })

        })
    }

    render() {

        let { email, password, error } = this.state

        return (
            <div className="row">
                { !this.state.isLogin ? 
                             <div className="col-sm-6 offset-md-3">
                             <h1 className="text-center display-4">Login</h1>
                             <form method="post" onSubmit={this.submitHandler}>
                 
                                 <div className="form-group">
                                     <label><b>Email</b></label>
                                     <input
                                         className={error.email ? "form-control is-invalid" : "form-control"}
                                         type="email"
                                         placeholder="Enter your email"
                                         name="email"
                                         id="email"
                                         value={email}
                                         onChange={this.changeHandler}
                 
                                     ></input>
                                     <div className="invalid-feedback">
                                         {error.email ? error.email : ""}
                                     </div>
                 
                                 </div>
                 
                 
                                 <div className="form-group">
                                     <label><b>Password</b></label>
                                     <input
                                         className={error.password ? "form-control is-invalid" : "form-control"}
                                         type="password"
                                         placeholder="Enter your password"
                                         name="password"
                                         id="password"
                                         value={password}
                                         onChange={this.changeHandler}
                 
                                     ></input>
                                     <div className="invalid-feedback">
                                         {error.password ? error.password : ""}
                                     </div>
                 
                                 </div>
                 
                                 <Link className="btn btn-link" to='/register'>Haven't any account</Link>
                                 <button className="btn btn-outline-info my-4 d-block">Log in</button>
                 
                             </form>
                         </div>  
                : 
            
                    this.props.history.push('/dashboard')
                    // <AuthComponent></AuthComponent>
                }
            </div>
        )
    }
}


export default Login