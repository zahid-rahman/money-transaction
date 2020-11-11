import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class NotAuthorize extends Component {
    render() {
        return (
            <div>
                <h1>You are not authorized</h1>
                <Link to='/login'>Please login your account first</Link>
            </div>
        )
    }
}
