import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.sair = this.sair.bind(this);
    }
    
    sair() {
        localStorage.clear()
        window.location = "http://localhost:3000/auth"
    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div>
                Olá {localStorage.getItem('userId')}
                <button onClick={this.sair}> Sair </button>
            </div>


        )
    }
}

export default Home