import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BiSolidSave, BiSolidCheckSquare } from 'react-icons/bi';
import { BsFillBagCheckFill, BsFillBagXFill, BsTrashFill, BsCheckLg } from 'react-icons/bs';
import { MdCancel, MdEditRoad } from 'react-icons/md';
import api from '../../config/api';
import { InvalidAlert, SuccessAlert } from '../../SupportFunctions';



class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: this.props.title,
                category: this.props.category,
                value: this.props.value,
                priority: this.props.priority,
                bought: this.props.bought,
                boughtDate: this.props.boughtDate,
                convenient: this.props.convenient,
            },

            viewMode: true,
            confirmDelete: false
        }

        this.formData = this.formData.bind(this);
        this.editMode = this.editMode.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    async formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;

        if (e.target.name == "bought") {
            form[e.target.name] = e.target.checked;
        }

        this.setState({ form: form }, () => { console.log(this.state.form) })
    }

    async editMode() {
        let newViewMode = !this.state.viewMode

        if (newViewMode) {
            let newInfo = this.state.form
            newInfo['id'] = this.props.id

            let updateItem = await api.put('/user/list/item', newInfo)
                .then((response) => {
                    SuccessAlert("Dados Atualizados", "O item foi atualizado!")
                    console.log(response)
                })
                .catch((error) => {
                    InvalidAlert("Houve um erro!", "Houve um erro ao atualizar o item.")
                    console.log(error)
                })

        }

        this.setState({ viewMode: newViewMode })

    }

    async deleteItem() {
        let deleteItem = await api.delete('/user/list/item/' + this.props.id)
            .then(async (response) => {
                window.location = '/new-item-list'
            })
            .catch((error) => {
                InvalidAlert("Erro ao deletar", "Ocorreu um erro ao excluir o item!")
                console.log(error)
            })
    }
    async confirmDelete() {
        this.setState({ confirmDelete: true })
        await new Promise(r => setTimeout(r, 5000));
        this.setState({ confirmDelete: false })
    }

    render() {
        return (
            <tr>
                <td> <input type='text' name="title" onChange={this.formData} value={this.state.form.title} disabled={this.state.viewMode} /> </td>
                <td> <input type='text' name="category" onChange={this.formData} value={this.state.form.category} disabled={this.state.viewMode} /> </td>
                <td> <input type='text' name="priority" onChange={this.formData} value={this.state.form.priority} disabled={this.state.viewMode} /> </td>
                <td> <input type='text' name="value" onChange={this.formData} value={this.state.form.value} disabled={this.state.viewMode} /> </td>

                {/* Coluna Comprado */}
                <td>
                    {this.state.viewMode ?
                        this.state.form.bought ? <BsFillBagCheckFill /> : <BsFillBagXFill /> :
                        <input type='checkbox' name="bought" checked={this.state.form.bought} onClick={this.formData} />
                    }
                </td>

                {/* Coluna Data de Compra */}
                <td>
                    {this.state.form.bought ?
                        <input type='text' name="boughtDate" onChange={this.formData} value={this.state.form.boughtDate} disabled={this.state.viewMode} />
                        : <input type='text' name="boughtDate" onChange={this.formData} value="" disabled={this.state.viewMode} />
                    }

                </td>

                {/* Coluna Edição */}
                <td>
                    <button onClick={this.editMode}>
                        {this.state.viewMode ? <FaEdit /> :
                            <BiSolidSave />}
                    </button>

                    {this.state.confirmDelete ?
                        <button onClick={this.deleteItem}>
                            <BsCheckLg />
                        </button> :
                        <button onClick={this.confirmDelete}>
                            <BsTrashFill />
                        </button>}
                </td>
            </tr>
        )
    }
}

export default ItemRow