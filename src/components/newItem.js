import React, { Component } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { LuListChecks } from 'react-icons/lu';
import { InvalidAlert } from '../SupportFunctions';
import api from '../config/api';

class NewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: "",
                convenient: "",
                category: "",
                value: "",
                priority: "",
            }
        }

        this.formData = this.formData.bind(this);
        this.addItem = this.addItem.bind(this);
        this.actionButtons = this.actionButtons.bind(this);
    }

    formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })
    }

    async addItem(e) {
        e.preventDefault();

        let form = Object.keys(this.state.form)
        let invalid
        form.forEach((key) => {
            if (this.state.form[key] == "") {
                invalid = true
            } else {
                invalid = false
            }
        })

        if (invalid) {
            InvalidAlert("Campos Inválidos!", "É necessário preencher todos os campos!")
            console.log(this.state.form)
            return
        }

        let itemList = this.state.form
        itemList['process'] = localStorage.getItem('processId')
        itemList['bought'] = false
        
        api.post('/user/list/item/add', itemList)
        .then( (response) => {
            document.getElementById("item-register").setAttribute('hidden', true)
            document.getElementById("item-register-status").removeAttribute('hidden')
            console.log(response)
        })
        .catch( (error) => {
            InvalidAlert("Erro ao adicionar item", "Esse item já existe!")
            console.log(error)
        })
    }

    async actionButtons() {
        document.getElementById("item-register").removeAttribute('hidden')
        document.getElementById("item-register-status").setAttribute('hidden', true)
        let form = {
            title: "",
            convenient: "",
            category: "",
            value: "",
            priority: "",
        }
        this.setState({ form: form })
    }

    render() {
        return (
            <div>
                <div class="offcanvas offcanvas-end new-item-offcanvas" tabindex="-1" id="new-item-offcanvas" aria-labelledby="new-item" data-bs-backdrop="static">

                    <div class="offcanvas-header">
                        <span className='title'>
                            <i> <AiFillPlusCircle /> </i>
                            <h5 id="offcanvasRightLabel" className='register-title'>Novo Item</h5>
                        </span>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div class="offcanvas-body">

                        <div className='container-lg item-register' id='item-register'>
                            <h6 className='register-subtitle'> Preencha as informações para adicionar um novo item: </h6>

                            <form className='new-item-form' id='personal-information-form'>
                                {/* Titulo do Item */}
                                <div className="form-floating data-input">
                                    <input type="text" className="form-control" id="name" placeholder="name@example.com"
                                        name="title" onChange={this.formData} value={this.state.form.title} />
                                    <label htmlFor="floatingInput">Item</label>
                                </div>

                                {/* Cômodo */}
                                <div className="form-floating data-input">
                                    <input type="text" className="form-control" id="name" placeholder="name@example.com"
                                        name="convenient" onChange={this.formData} value={this.state.form.convenient} />
                                    <label htmlFor="floatingInput">Cômodo</label>
                                </div>

                                {/* Categoria */}
                                <div className="form-floating data-input">
                                    <input type="text" className="form-control" id="name" placeholder="name@example.com"
                                        name="category" onChange={this.formData} value={this.state.form.category} />
                                    <label htmlFor="floatingInput">Categoria</label>
                                </div>

                                {/* Valor */}
                                <div className="form-floating data-input">
                                    <input type="text" className="form-control" id="name" placeholder="name@example.com"
                                        name="value" onChange={this.formData} value={this.state.form.value} />
                                    <label htmlFor="floatingInput">Valor</label>
                                </div>

                                {/* Comprado */}
                                <div className="form-floating data-input">
                                    <input type="text" className="form-control" id="name" placeholder="name@example.com"
                                        name="priority" onChange={this.formData} value={this.state.form.priority} />
                                    <label htmlFor="floatingInput">Prioridade</label>
                                </div>

                                <button onClick={this.addItem}>
                                    Adicionar na Lista
                                </button>
                            </form>
                        </div>

                        <div className='container-lg item-register-status' id='item-register-status' hidden>
                            <i className='check-icon'> <LuListChecks/> </i>
                            <span className='check-label'> Item adicionado com sucesso! </span>
                            <button className='action-btn' id="add-new-item-btn" onClick={this.actionButtons}> Novo Item </button>
                            <button className='action-btn' id="back-to-list-btn" data-bs-dismiss="offcanvas" aria-label="Close" onClick={this.actionButtons}> Retornar à lista </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewItem