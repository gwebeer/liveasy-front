import React, { Component } from 'react';


class ServiceSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='service-option'>
                <input type="checkbox" id={this.props.service} className='service-check' name={this.props.id} onChange={this.props.checkBoxChange}/>
                <label className='service-label' for={this.props.service}> {this.props.service} </label>
            </div>
        )
    }
}

export default ServiceSelect