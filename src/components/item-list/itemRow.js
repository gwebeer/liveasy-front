import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';



class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <tr>
                <td> {this.props.title} </td>
                <td> {this.props.category} </td>
                <td> {this.props.priority} </td>
                <td> R$ {this.props.value} </td>
                <td> <input type='checkbox' /> </td>
                <td> {this.props.boughtDate} </td>
                <td>
                    <button className="trash-customer" id="trash-customer" type="button" data-bs-toggle="modal" data-bs-target="#delete-customer">
                        <FaEdit />
                    </button>
                </td>
            </tr>
        )
    }
}

export default ItemRow