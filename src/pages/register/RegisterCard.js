import React, { Component } from 'react';

class CardRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.selectClass = this.selectClass.bind(this);
    }

    selectClass(e) {
        document.getElementById(this.props.id).classList.add('card-select')        
    }

    render() {
        return (
            <div class="register-card">
                <div className='card-front' id={this.props.id}>
                    <div className='card-icon'>
                        Icon
                    </div>
                    <p className='card-title'> {this.props.title} </p>
                    <button className='card-bt' onClick={this.selectClass}> Selecionar </button>
                </div>

                <div className='card-back'>
                    <p className='card-title'> {this.props.title} </p>
                    <label className='card-label'> {this.props.label} </label>
                </div>


                {/* <div className='card-front'>
                    <div className='card-icon'>
                        teste
                    </div>
                    <p className='card-title'> Primeira Casa </p>
                </div>

                <div className='card-back'>
                    teste
                </div> */}



            </div>
        )
    }
}

export default CardRegister