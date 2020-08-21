import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
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
        let store = JSON.parse(localStorage.getItem('login-token'))
        if(store && store.login){
            this.setState({isLogin:true,store:store})
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
            localStorage.setItem('login-token',JSON.stringify({
                login:true,
                token:response.data.token
            }))
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
                error: error.response.data
            })

        })
    }

    render() {

        let { email, password, error, store , isLogin } = this.state

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
                
                   <Dashboard store={store} data={this.state.email}></Dashboard>
                }
            </div>
        )
    }
}


export default Login