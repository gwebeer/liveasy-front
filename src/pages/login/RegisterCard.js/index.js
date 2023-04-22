import React, { Component } from 'react';

class RegisterCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div class="card">
                <div class="face face1">
                    <div class="content">
                        <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true" />
                        <h3> {this.props.title} </h3>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <p> {this.props.description} </p>
                        <a href="#">Continuar aqui</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterCard