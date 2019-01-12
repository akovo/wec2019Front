import React, { Component } from 'react';
import './App.css';
class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errHidden: true,
            errVisible: false
        }

    }
    render() {
        return (

            <h1>YOU HAVE LANDED</h1>

        );
    }
}

export default Landing;
