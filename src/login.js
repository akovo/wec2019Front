import React, { Component } from 'react';
import apiService from './apiService.js'
import {Button, Form, Container, Message } from 'semantic-ui-react'
import './App.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errHidden: true,
            errVisible: false
        }

    }
    async login() {
        // this.props.history.push('/Landing');
        var body = this.state;
        var request = new Request(/*apiService.baseURL +*/'http://b6dbfec0.ngrok.io/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': ' 	application/json',
                'Access-Control-Allow-Origin': '*'
            })
        });
        var response = await fetch(request);
        var data = await response.json();
        if (data.success === true) {
            console.log(data.response.token);
            localStorage.setItem("token", data.token);
            this.setState({ errHidden: true, errVisible: false });
            // this.props.history.push('/landing')
        }
        else if (data.message === "Invalid Pass!" || data.message === "User not found") {
            this.setState({ errHidden: false, errVisible: true });
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => { });
    }
    render() {
        return (

            <Container>
                <Form>
                    <Form.Field required>
                        <label>Email</label>
                        <input type="text" placeholder='username' name='username' onChange={e => this.handleChange(e)} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Password</label>
                        <input type="password" name='password' placeholder='******' onChange={e => this.handleChange(e)} />
                    </Form.Field>
                    <Button disabled={this.state.disabled} type='submit' onClick={this.login.bind(this)}>Submit</Button>
                </Form>
                <Message
                    error
                    hidden={this.state.errHidden}
                    visible={this.state.errVisible}
                    header='Sign in Failed'
                    content="Invalid email or password"
                />
            </Container>

        );
    }
}

export default Login;
