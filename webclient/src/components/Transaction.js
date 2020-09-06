import React, { Component } from 'react'
import Axios from 'axios'
let serverUrl = process.env.REACT_APP_SERVER_URL    

export default class Transaction extends Component {
    constructor(props){
        super()
        this.state = {
            transactions : []
        }
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
            this.setState({
                transactions:response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {

        console.log(Object.keys(this.state.transactions).length)
        console.log(this.state.transactions)
        let listOfTransactions;

        if(this.state.transactions.message){
             listOfTransactions= <div><h1 style={{color:'#d0021b',textAlign:'center'}}>No transaction found</h1></div>
        }
        else{
             listOfTransactions = <div>
            <ul className="list-group">
            {this.state.transactions.map((transactions,index) => 
                <div  key={index}>
                <li className="list-group-item"> 
                    <h3>#{index+1} {transactions.amount > 100000 ? 
                        <span>
                            <span className="fa fa-star checked" style={{color:"orange"}}></span> - <span style={{'font-size':'25px','font-weight':'400'}}>topnotch transaction</span>
                        </span>
                    : ''}</h3> 
                    
                    <span className="badge badge-dark">Amount : {transactions.amount} BDT</span>
                    <br></br>
                
    
                    {transactions.type === 'income' ?  <span className="badge badge-success">Type : {transactions.type}</span> :     <span className="badge badge-danger">Type : {transactions.type}</span>  } 
    
                    <br></br>
                    <span className="badge badge-info">Note : {transactions.note}</span> 
                </li>
                <br></br>
                </div>
                
            )}
     
        </ul>
        </div>
        }

        return (
            <div>
                <br></br>
                {listOfTransactions}
            </div>
        )
    }
}
