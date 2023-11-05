import React, { Component } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { LuListChecks } from 'react-icons/lu';
import { TbShoppingBagSearch } from 'react-icons/tb';
import api from '../../config/api';
import { InvalidAlert } from '../../SupportFunctions';

class SuggestionItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: "",
                convenient: "",
                category: "",
                value: "",
                priority: "",
            },
            defaultItems: []
        }

        this.formData = this.formData.bind(this);
        this.addButtonClick = this.addButtonClick.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    async componentDidMount() {
        let defaultItems = await api.get('/suggestion/item/all')
        // console.log(defaultItems)

        let itemsComponents = []
        Object.values(defaultItems.data).forEach((item) => {
            if (item.type == "item") {
                let name = item.title + "," + item.convenient + "," + item.category

                itemsComponents.push(
                    <div className='suggestion-item'>
                        <h4 className='title'> {item.title} </h4>
                        <button className='add-item' name={name} onClick={this.addButtonClick}> Adicionar </button>
                    </div>
                )
            }
        })
        this.setState({ defaultItems: itemsComponents })
    }

    async addButtonClick(e) {
        const props = e.target.name.split(",")

        let item = {
            title: props[0],
            convenient: props[1],
            category: props[2],
            value: "",
            priority: "",
        }
        this.setState({ form: item }, () => { console.log(this.state.form) })

        document.getElementById('default-items').setAttribute('hidden', true)
        document.getElementById('item-form').removeAttribute('hidden')
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

        await api.post('/user/list/item/add', itemList)
            .then((response) => {
                document.getElementById("item-form").setAttribute('hidden', true)
                document.getElementById("suggestion-register-status").removeAttribute('hidden')
                console.log(response)
            })
            .catch((error) => {
                InvalidAlert("Erro ao adicionar item", "Esse item já existe!")
                console.log(error)
            })
    }

    formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })
    }

    render() {
        return (
            <div>
                <div class="offcanvas offcanvas-end suggestion-item-offcanvas" tabindex="-1" id="suggestion-item-offcanvas" aria-labelledby="suggestion-item" data-bs-backdrop="static">

                    <div class="offcanvas-header">
                        <span className='title'>
                            <i> <TbShoppingBagSearch /> </i>
                            <h5 id="offcanvasRightLabel" className='register-title'>Itens Sugeridos</h5>
                        </span>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={(e) => {
                            document.getElementById('default-items').removeAttribute('hidden')
                            document.getElementById('item-form').setAttribute('hidden', true)
                            document.getElementById('suggestion-register-status').setAttribute('hidden', true)
                        }}></button>
                    </div>

                    <div class="offcanvas-body">

                        <div className='container-lg default-items' id='default-items'>
                            <label className='subtitle'> Adicione rapidamente os itens mais necessários para uma mudança </label>
                            {this.state.defaultItems}
                        </div>

                        <div className='container-lg item-register' id='item-form' hidden>
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
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('default-items').removeAttribute('hidden')
                                    document.getElementById('item-form').setAttribute('hidden', true)
                                }}>
                                    Voltar
                                </button>
                            </form>
                        </div>

                        <div className='container-lg item-register-status' id='suggestion-register-status' hidden>
                            <i className='check-icon'> <LuListChecks /> </i>
                            <span className='check-label'> Item adicionado com sucesso! </span>
                            <button className='action-btn' id="add-new-item-btn" onClick={this.actionButtons}> Novo Item </button>
                            <button className='action-btn' id="back-to-list-btn" data-bs-dismiss="offcanvas" aria-label="Close"
                                onClick={() => {
                                    document.getElementById('default-items').removeAttribute('hidden')
                                    document.getElementById('item-form').setAttribute('hidden', true)
                                    document.getElementById('suggestion-register-status').setAttribute('hidden', true)
                                }}
                            > Retornar à lista </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SuggestionItems