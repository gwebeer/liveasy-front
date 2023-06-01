import React, { Component } from 'react';
import { SuccessAlert } from '../SupportFunctions';
import api from '../config/api';
import ItemList from '../components/itemList';
import { BsFillTrashFill } from 'react-icons/bs';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            proccessInfo: {},
            defaultList: {},
            form: {
                rendaMensal: "",
                orcamentoEspecial: "",
                dataMudanca: "",
            },
            formItem: {
                item: "",
                value: "",
            },
            category: "Cozinha",
            priority: "Baixa",
            itemList: [],
        }

        this.sair = this.sair.bind(this);
        this.formData = this.formData.bind(this);
        this.itemFormData = this.itemFormData.bind(this);
        this.orcamentoEspecialNo = this.orcamentoEspecialNo.bind(this);
        this.orcamentoEspecialYes = this.orcamentoEspecialYes.bind(this);
        this.endButton = this.endButton.bind(this);
        this.newItem = this.newItem.bind(this);
    }

    async formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })
    }
    async itemFormData(e) {
        let form = this.state.formItem
        form[e.target.name] = e.target.value;
        this.setState({ formItem: form })
    }

    async componentDidMount() {
        // Buscando informações do usuário
        const userInfo = await api.get("http://localhost:4000/user/" + localStorage.getItem("userId"))
        this.setState({ userInfo: userInfo.data })

        // Buscando informações de projeto do usuário
        const proccessInfo = await api.get("http://localhost:4000/process/user/" + localStorage.getItem("userId"))
        this.setState({ proccessInfo: proccessInfo.data })

        if (proccessInfo.data.status === "nao-iniciado") {
            document.getElementById("first-login").classList.remove("hide")
            document.getElementById("list-table").classList.add("hide")
        }
        if (proccessInfo.data.status === "definicao-lista") {
            document.getElementById("list-definition").classList.remove("hide")
            // let defaultList = await api.get("http://localhost:4000/default-item/all")
            // this.setState({ defaultList: defaultList.data })
            // console.log(defaultList.data)
        }
        if (proccessInfo.data.status === "em-andamento") {
            let personalList = await api.get("http://localhost:4000/list/" + proccessInfo.data._id)
            this.setState({ personalList: personalList.data })
            console.log(personalList.data)

            let itemList = []
            Array.from(personalList.data).forEach((itemRow) => {
                itemList.push(<ItemList item={itemRow.item} category={itemRow.category} priority={itemRow.priority} value={itemRow.value} />)
            })
            this.setState({ itemList: itemList })
        }
    }
    async orcamentoEspecialYes() {
        document.getElementById("orcamento-especial-input").classList.remove("hide")
        document.getElementById("orcamento-yes").classList.add('selected-button')
        document.getElementById("orcamento-no").classList.remove('selected-button')
    }
    async orcamentoEspecialNo() {
        document.getElementById("orcamento-especial-input").classList.add("hide")
        document.getElementById("orcamento-yes").classList.remove('selected-button')
        document.getElementById("orcamento-no").classList.add('selected-button')
    }
    async endButton() {
        let proccessNewInfo = {
            renda_mensal: this.state.form.rendaMensal,
            orcamento_especial: this.state.form.orcamentoEspecial,
            data_mudanca: this.state.form.dataMudanca,
            status: "definicao-lista"
        }

        await api.put("http://localhost:4000/process/user/" + localStorage.getItem("userId"), proccessNewInfo)
        SuccessAlert("Cadastro Realizado!", "Finalizamos seu cadastro!")
        document.getElementById("first-login").classList.add("hide")
        document.getElementById("list-definition").classList.remove("hide")
        document.getElementById("list-table").classList.remove("hide")
    }

    async newItem() {
        let itemList = []
        Array.from(this.state.itemList).forEach((itemRow) => {
            itemList.push(itemRow)
        })

        itemList.push(<ItemList item={this.state.formItem.item} category={this.state.category} priority={this.state.priority} value={this.state.formItem.value} />)
        this.setState({ itemList: itemList })

        let item = {
            "item": this.state.formItem.item,
            "priority": this.state.priority,
            "category": this.state.category,
            "value": this.state.formItem.value,
            "bought": false,
            "proccess": this.state.proccessInfo._id
        }
        await api.post("http://localhost:4000/list/create", item)
        await api.put("http://localhost:4000/process/user/" + localStorage.getItem("userId"), { status: "em-andamento" })

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
            <div className='home-page'>
                <header>
                    <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' />
                    <div className='title-page'>
                        <h1> Olá, {this.state.userInfo.name} </h1>
                        <h2> Seja bem-vindo navamente! </h2>
                    </div>
                </header>

                <div className='page-content'>
                    <div id='first-login' className='hide'>
                        <div className='end-proccess'>
                            <h2> Ficamos felizes de ajudar com a conquista de sua primeira casa! </h2>
                            <h3> Em seu primeiro login vamos iniciar o planejamento, mas precisamos de mais algumas informações: </h3>
                        </div>

                        <div class="container-fluid end-proccess-form">
                            <div class="row">
                                <div class="col-3">
                                    <div class="form-floating mb-3 proccess-input">
                                        <input type="text" class="form-control" id="rendaMensal" placeholder="name@example.com"
                                            name="rendaMensal" value={this.state.form.rendaMensal} onChange={this.formData} />
                                        <label for="floatingInput">Renda Mensal</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <h3> Você tem algum orçamento especial para gastar com a mudança? </h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col orcamento-especial-btns">
                                    <button id='orcamento-yes' onClick={this.orcamentoEspecialYes}> Sim </button>
                                    <button id='orcamento-no' onClick={this.orcamentoEspecialNo}> Não </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <div class="form-floating mb-3 proccess-input hide" id="orcamento-especial-input">
                                        <input type="text" class="form-control" id="orcamentoEspecial" placeholder="name@example.com"
                                            name="orcamentoEspecial" value={this.state.form.orcamentoEspecial} onChange={this.formData} />
                                        <label for="floatingInput">Orçamento Especial</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <h3> Para finalizarmos, selecione uma data prevista para mudança </h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <div class="form-floating mb-3 proccess-input">
                                        <input type="date" class="form-control" id="dataMudanca" placeholder="name@example.com"
                                            name="dataMudanca" value={this.state.form.dataMudanca} onChange={this.formData} />
                                        <label for="floatingInput">Data de Mudança</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col end-button">
                                    <button onClick={this.endButton}> Finalizar </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='list-definition' className='hide'>
                        <div className='section-title'>
                            <h2> Defina a lista de itens </h2>
                            <h3> Seguindo com o planejamento, vamos definir quais os itens que você precisa ou quer ter em sua nova casa. </h3>
                            <h3> Selecione abaixo as sugestões que você quer adicionar em sua lista </h3>
                        </div>

                        <div class="container-fluid">
                            <div class="row new-item">
                                <div class="row">
                                    <div class="col">
                                        <h5> Adicione itens na lista </h5>
                                    </div>
                                </div>

                                <div class="col">
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="category" onChange={(e) => this.setState({ category: e.target.value })}>
                                            <option value="Cozinha">Cozinha</option>
                                            <option value="Lavanderia">Lavanderia</option>
                                            <option value="Sala de Estar">Sala de Estar</option>
                                            <option value="Sala de Jantar">Sala de Jantar</option>
                                            <option value="Quarto">Quarto</option>
                                            <option value="Banheiro">Banheiro</option>
                                            <option value="Escritório">Escritório</option>
                                        </select>
                                        <label htmlFor="category" className="form-label">Categoria</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="item" placeholder="name@example.com"
                                            name="item" value={this.state.formItem.item} onChange={this.itemFormData} />
                                        <label for="floatingInput">Item</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="priority" onChange={(e) => this.setState({ category: e.target.value })}>
                                            <option value="Baixa">Baixa</option>
                                            <option value="Média">Média</option>
                                            <option value="Alta">Alta</option>
                                        </select>
                                        <label htmlFor="priority" className="form-label">Categoria</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="value" placeholder="name@example.com"
                                            name="value" value={this.state.formItem.value} onChange={this.itemFormData} />
                                        <label for="floatingInput">Valor Estimado</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary" onClick={this.newItem}>Adicionar</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div id='list-table' className=''>
                        <div className='section-title'>
                            <h2> Sua Lista de Itens </h2>
                            <h3> Você pode alterar a lista a qualquer momento no menu Minha Lista de Itens </h3>
                        </div>

                        <div class="container-fluid mt-4">
                            <div class="row header-row">
                                <div class="col-3 list-col">
                                    Item
                                </div>
                                <div class="col-2 list-col">
                                    Categoria
                                </div>
                                <div class="col-2 list-col">
                                    Prioridade
                                </div>
                                <div class="col-2 list-col">
                                    Valor Estimado
                                </div>
                                {/* <div class="col-1 list-col">
                                    Comprado
                                </div> */}
                                <div class="col-1 list-col">

                                </div>
                            </div>
                            {this.state.itemList}
                        </div>
                    </div>

                </div>

                {/* {this.state.userInfo} */}
                <button onClick={this.sair}> Sair </button>
            </div>


        )
    }
}

export default Home