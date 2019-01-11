import React, { Component } from 'react';
import {Button, Form, Container, Message } from 'semantic-ui-react'
import './App.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            errHidden: true,
            errVisible: false
        }

    }
    async login() {
        var body = this.state;
        var request = new Request('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': ' 	application/json',
                'Access-Control-Allow-Origin': '*'
            })
        });
        var response = await fetch(request);
        var data = await response.json();
        if (data.message === "Success!") {
            localStorage.setItem("token", data.token);
            this.setState({ errHidden: true, errVisible: false });
            this.props.history.push('/landing')
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
                        <input type="email" placeholder='email' name='email' onChange={e => this.handleChange(e)} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Password</label>
                        <input type="password" name='pass' placeholder='******' onChange={e => this.handleChange(e)} />
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
