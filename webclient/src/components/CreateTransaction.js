import React, { Component } from 'react'

export default class CreateTransaction extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <br></br>
                    <h1>Create Transaction</h1>
                    {/* form   */}
                    <form method="post">
                        <div className="form-group">
                            <label><b>Name</b></label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter your name"
                                name="username"
                                id="name"
                            ></input>
                        </div>

                        <div className="form-group">
                            <label><b>Email</b></label>
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                id="email"
                            ></input>

                        </div>


                        <div className="form-group">
                            <label><b>Password</b></label>
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                id="password"
                            ></input>


                        </div>

                        <div className="form-group">
                            <label><b>Confirm Pasword</b></label>
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Confirm your password"
                                name="confirmPassword"
                                id="confirmPassword"
                            ></input>
                        </div>

                        <button className="btn btn-outline-dark my-4 d-block">Register</button>

                    </form>
                    {/* /.form  */}
                </div>
                <div className="col-sm-4"></div>
            </div>
        )
    }
}
