import React, { Component } from 'react';
import { IoMdRemoveCircleOutline } from 'react-icons/io'


class ServiceView extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.checkboxChange = this.checkboxChange.bind(this);
    }

    checkboxChange() {
        alert("Teste")
    }

    render() {
        return (
            <div className='service'>
                {/* <input type="checkbox" id={this.props.id} onChange={this.checkboxChange}/>
                <label for={this.props.id}> {this.props.service} </label> */}

                <button name='remove-service' onClick={() => {
                    alert("teste")
                }}> <IoMdRemoveCircleOutline /> </button>
                <span> {this.props.service} </span>
            </div>
        )
    }
}

export default ServiceView