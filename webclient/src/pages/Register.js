import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
let serverUrl = process.env.REACT_APP_SERVER_URL

class Register extends Component {

    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            passowrd: "",
            confirmPassword: "",
            error: {}
        }
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitHandler = event => {
        event.preventDefault()
        let data = this.state;
        axios.post(`${serverUrl}/user/register`, data)
            .then(response => {
                console.log(response.data)
                this.props.history.push('/login')
            })
            .catch(error => {
                this.setState({
                    error: error.response.data
                })
                console.log(this.state.error)

            })
    }

    render() {

        let { name, email, password, confirmPassword, error } = this.state

        return (
            <div className="row">
                <div className="col-sm-6 offset-md-3">
                    <h1 className="text-center display-4">Registration</h1>
                    <form method="post" onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label><b>Name</b></label>
                            <input
                                className={error.username ? "form-control is-invalid" : "form-control"}
                                type="text"
                                placeholder="Enter your name"
                                name="username"
                                id="name"
                                value={name}
                                onChange={this.changeHandler}
                            ></input>
                            <div className="invalid-feedback">
                                {error.username ? error.username : ""}
                            </div>
                        </div>

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

                        <div className="form-group">
                            <label><b>Confirm Pasword</b></label>
                            <input
                                className={error.confirmPassword ? "form-control is-invalid" : "form-control"}
                                type="password"
                                placeholder="Confirm your password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={this.changeHandler}
                            ></input>

                            <div className="invalid-feedback">
                                {error.confirmPassword ? error.confirmPassword : ""}
                            </div>
                        </div>
                        <Link className="btn btn-link" to='/login'>already have account</Link>
                        <button className="btn btn-outline-dark my-4 d-block">Register</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default Register