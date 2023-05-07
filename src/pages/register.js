import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        if (!localStorage.getItem('name')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div>
                Nome: {localStorage.getItem("name")} <br/>
                Email: {localStorage.getItem("email")} <br/>
                Nascimento: {localStorage.getItem("birthDate")} <br/>
                Telefone: {localStorage.getItem("phone")} <br/>
            </div>


        )
    }
}

export default Register