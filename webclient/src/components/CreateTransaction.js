import React, { Component } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
let serverUrl = process.env.REACT_APP_SERVER_URL   

export default class CreateTransaction extends Component {
    constructor(props){
        super(props)
        this.state = {
            amount:'',
            type:'',
            note:'',
            userId:'',
            authHeader:'',
            error:{}
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

        this.setState({
            userId:decode._id,
            authHeader
        });


    }

    transactionSubmitHandler = event => {
        event.preventDefault()

        let data = this.state;
        
        axios.post(`${serverUrl}/transaction/create`,data,this.state.authHeader)
        .then(() => {
            window.location.href='/dashboard'
        })
        .catch(error => {
            this.setState({
                error:error.response.data
            })
            console.log(error)
            console.log(this.state.error)
        })
    }

    transactionOnChangeHandler = event => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }


    render() {

        let { amount,note,type,userId,error } = this.state

        return (
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <br></br>
                    <h1>Create Transaction</h1>
                    {/* form   */}
                    <form method="post" onSubmit={this.transactionSubmitHandler}>
                        <div className="form-group">
                            <label><b>Amount</b></label>
                            <input
                                className={error.amount? "form-control is-invalid" : "form-control"}
                                type="text"
                                placeholder="Enter your amount"
                                name="amount"
                                id="name"
                                value={amount}
                                onChange={this.transactionOnChangeHandler}
                            ></input>
                            <div className="invalid-feedback">
                                {error.amount?error.amount:""}
                            </div>
                        </div>

                        <div className="form-group">
                            <select className={error.type?"form-control is-invalid" : "form-control"} 
                                    name="type" 
                                    id="type" value={type}
                                    onChange={this.transactionOnChangeHandler}
                            >
                                <option value="0">select type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <div className="invalid-feedback">
                                {error.type?error.type:""}
                            </div>

                        </div>

                        <div className="form-group">
                            <label><b>Note</b></label>
                            <textarea 
                                name="note" 
                                value={note} 
                                cols="30" 
                                rows="10" 
                                className={error.note?"form-control is-invalid":"form-control"} 
                                placeholder="write your transaction cause"
                                onChange={this.transactionOnChangeHandler}
                            ></textarea>
                            <div className="invalid-feedback">
                                {error.note?error.note:""}
                            </div>
                        </div>

                        <button className="btn btn-dark my-4 d-block">create transaction</button>

                    </form>
                    {/* /.form  */}
                </div>
                <div className="col-sm-4"></div>
            </div>
        )
    }
}
