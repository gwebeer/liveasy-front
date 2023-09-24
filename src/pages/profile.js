import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import { FaUserCircle, FaCheckCircle } from 'react-icons/fa';
import { RegisterFieldValidation, SuccessAlert, addClass, getProcessInfo, getUserInfo, movingInformation, passwordValidation, removeClass } from '../SupportFunctions';
import api from '../config/api';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "",
                birthDate: "",
                phone: "",
                email: "",
            },
            personalForm: {},
            processForm: {},
            password: "",
            viewMode: true,
        }

        this.personalFormData = this.personalFormData.bind(this);
        this.movingFormData = this.movingFormData.bind(this);
        this.movingBudgetChange = this.movingBudgetChange.bind(this);

        this.userEdit = this.userEdit.bind(this);
        this.processEdit = this.processEdit.bind(this);
        this.changePassword = this.changePassword.bind(this);

    }

    async componentDidMount() {
        // Recupera as informações do usuário
        let userInfo = await getUserInfo(localStorage.getItem('userId'))
        let personalForm = {
            name: userInfo.name,
            email: userInfo.email,
            birthDate: userInfo.birthDate,
            phone: userInfo.phone
        }
        this.setState({ personalForm: personalForm })
        localStorage.setItem('userEmail', userInfo.email)

        // Recupera as informações do processo
        let processInfo = await getProcessInfo(localStorage.getItem('processId'))

        let process;

        if (processInfo.budget == null) {
            process = {
                income: processInfo.income,
                movingBudget: false,
                movingBudgetValue: "",
                movingDate: processInfo.movingDate
            }
        } else {
            process = {
                income: processInfo.income,
                movingBudget: true,
                movingBudgetValue: processInfo.budget,
                movingDate: processInfo.movingDate
            }
        }
        this.setState({ processForm: process })

        addClass('form-control', 'hide-input')
    }

    async personalFormData(e) {
        let personalForm = this.state.personalForm
        personalForm[e.target.name] = e.target.value;
        this.setState({ personalForm: personalForm })
    }
    async movingFormData(e) {
        let movingForm = this.state.processForm
        movingForm[e.target.name] = e.target.value;
        this.setState({ processForm: movingForm })
    }
    async movingBudgetChange(e) {
        let movingForm = this.state.processForm
        movingForm['movingBudget'] = !movingForm['movingBudget'];
        this.setState({ processForm: movingForm }, () => { console.log(this.state.processForm) })
    }

    async userEdit(e) {
        e.preventDefault();
        let newStatus

        // Ativa edição
        if (this.state.viewMode) {
            newStatus = false
            removeClass('form-control', 'hide-input')
        } else {
            // Verifica se houve alterações no e-mail
            let changedEmail;
            if (this.state.personalForm.email == localStorage.getItem('userEmail')) {
                changedEmail = false
            } else {
                changedEmail = true
            }

            // Envoca função de validação dos campos de registro
            let fieldValidation = await RegisterFieldValidation(this.state.personalForm, changedEmail)

            // Encerra caso os campos não estejam validados
            if (!fieldValidation) {
                return
            }

            // Desabilita inputs
            addClass('form-control', 'hide-input')

            // Cria dicionário para envio na rota de usuário
            let userBody = {
                id: localStorage.getItem('userId'),
                name: this.state.personalForm.name,
                email: this.state.personalForm.email,
                birthDate: this.state.personalForm.birthDate,
                phone: this.state.personalForm.phone,
            }

            // Evoca rota de atualização do usuário
            let edit = await api.put('/user', userBody)

            // Avisa o usuário sobre o status da atualização dos dados
            if (edit.status == 200) {
                SuccessAlert("Alteração Realizada", "Os dados do seu usuário foram atualizados com sucesso!")
            }

            // Atualiza valor para state de edicao
            newStatus = true
        }
        this.setState({ viewMode: newStatus })

    }

    async processEdit(e) {
        e.preventDefault();
        let newStatus

        // Ativa edição
        if (this.state.viewMode) {
            newStatus = false
            // Habilita inputs
            removeClass('form-control', 'hide-input')
        } else {
            // Envoca função de validação dos campos de registro
            let fieldValidation = await movingInformation(this.state.processForm)

            if (!fieldValidation) {
                return
            }

            newStatus = true
            // Desabilita inputs
            addClass('form-control', 'hide-input')

            // Cria dicionário para envio na rota de processo
            let processBody = {
                id: localStorage.getItem('processId'),
                income: this.state.processForm.income,
                budget: this.state.processForm.movingBudgetValue,
                movingDate: this.state.processForm.movingDate,
            }
            console.log(processBody)
            
            // Evoca rota de atualização do processo
            let edit = await api.put('/user/process', processBody)
            console.log(edit)

            // Avisa o usuário sobre o status da atualização dos dados
            if (edit.status == 200) {
                SuccessAlert("Alteração Realizada", "Os seus dados de mudança foram atualizados com sucesso!")
            }

        }

        this.setState({ viewMode: newStatus })
    }

    async changePassword(e) {
        e.preventDefault();

        // Cria dicionário para alteração de senha do usuário
        let userAccess = {
            id: localStorage.getItem('userId'),
            password: this.state.password
        }

        // Evoca rota de atualização da senha do usuário
        let edit = await api.put('/user', userAccess)
        console.log(edit)

        // Avisa o usuário sobre o status da atualização da senha
        if (edit.status == 200) {
            SuccessAlert("Alteração Realizada", "A sua senha foi atualizada!")
        }

        this.setState({ password: "" })
    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='home-page'>
                <SideMenu />

                <div className='profile-page'>
                    <div className='page-title'>
                        <i> <FaUserCircle /> </i>
                        <h1> Minha Conta </h1>
                    </div>
                    <span> Visualize ou altere as suas informações pessoais, de mudança e de acesso. </span>

                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-personal-tab" data-bs-toggle="tab" data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal" aria-selected="true">
                                Informações Pessoais
                            </button>

                            <button className="nav-link" id="nav-moving-tab" data-bs-toggle="tab" data-bs-target="#nav-moving" type="button" role="tab" aria-controls="nav-moving" aria-selected="false">
                                Informações de Mudança
                            </button>

                            <button className="nav-link" id="nav-access-tab" data-bs-toggle="tab" data-bs-target="#nav-access" type="button" role="tab" aria-controls="nav-access" aria-selected="false">
                                Acesso
                            </button>

                            <button className="nav-link" id="nav-properties-tab" data-bs-toggle="tab" data-bs-target="#nav-properties" type="button" role="tab" aria-controls="nav-properties" aria-selected="false">
                                Preferência de Imóveis
                            </button>
                        </div>
                    </nav>

                    <div className="tab-content" id="nav-tabContent">

                        <div className="tab-pane fade show active" id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
                            <form className='personal-information-form' id='personal-information-form'>
                                <div className="form-floating data-input">
                                    <input type="text" className="form-control hide-input" id="name" placeholder="name@example.com"
                                        name="name" value={this.state.personalForm.name} onChange={this.personalFormData} disabled={this.state.viewMode} />
                                    <label htmlFor="floatingInput">Nome Completo</label>
                                </div>

                                <div className="form-floating data-input">
                                    <input type="email" className="form-control hide-input" id="signup-email" placeholder="name@example.com"
                                        name="email" value={this.state.personalForm.email} onChange={this.personalFormData} disabled={this.state.viewMode} />
                                    <label htmlFor="floatingInput">Email</label>
                                </div>

                                <div className="form-floating data-input">
                                    <input type="date" className="form-control hide-input" id="birthDate" placeholder="name@example.com"
                                        name="birthDate" value={this.state.personalForm.birthDate} onChange={this.personalFormData} disabled={this.state.viewMode} />
                                    <label htmlFor="floatingInput">Data de Nascimento</label>
                                </div>

                                <div className="form-floating data-input">
                                    <input type="number" className="form-control hide-input" id="phone" placeholder="name@example.com"
                                        name="phone" value={this.state.personalForm.phone} onChange={this.personalFormData} disabled={this.state.viewMode} />
                                    <label htmlFor="floatingInput">Telefone</label>
                                </div>

                                <button id='signup-bt' onClick={this.userEdit}>
                                    {this.state.viewMode ? 'Editar' : 'Salvar'}
                                </button>
                            </form>

                        </div>


                        <div className="tab-pane fade" id="nav-moving" role="tabpanel" aria-labelledby="nav-moving-tab">
                            <form className='move-information-form'>
                                <div className="form-floating data-input">
                                    <input type="number" className="form-control hide-input" id="income" placeholder="R$ 1000,00"
                                        name="income" value={this.state.processForm.income} onChange={this.movingFormData} disabled={this.state.viewMode} />
                                    <label htmlFor="floatingInput"> Qual sua renda mensal? </label>
                                </div>

                                {this.state.viewMode ? '' :
                                    <div className='moving-budget-section'>
                                        <span> Você possui dinheiro guardado que vá destinar a mudança? </span>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                                checked={this.state.processForm.movingBudget} onChange={this.movingBudgetChange} />
                                        </div>
                                    </div>
                                }

                                {!this.state.processForm.movingBudget ? '' :
                                    <div className="form-floating data-input" id="movingBudgetInput">
                                        <input type="number" className="form-control" id="movingBudgetValue" placeholder="R$ 1000,00"
                                            name="movingBudgetValue" value={this.state.processForm.movingBudgetValue} onChange={this.movingFormData} disabled={this.state.viewMode} />
                                        <label htmlFor="floatingInput"> Quanto vai destinar? </label>
                                    </div>
                                }

                                < div className="form-floating data-input">
                                    <input type="date" className="form-control hide-input" id="movingDate" placeholder="dd/mm/yyyy"
                                        name="movingDate" value={this.state.processForm.movingDate} onChange={this.movingFormData} disabled={this.state.viewMode} />
                                    <label htmlFor="floatingInput">Data Prevista de Mudança</label>
                                </div>

                                <div className='access-buttons'>
                                    <button id='signup-bt' onClick={this.processEdit}>
                                        {this.state.viewMode ? 'Editar' : 'Salvar'}
                                    </button>
                                </div>
                            </form>
                        </div>



                        <div className="tab-pane fade" id="nav-access" role="tabpanel" aria-labelledby="nav-access-tab">
                            <form className='password-form'>
                                <div className="form-floating data-input">
                                    <input type="password" className="form-control" id="password" placeholder="name@example.com"
                                        name="password" value={this.state.password} onChange={async (e) => {this.setState({ password: e.target.value}); await passwordValidation(e.target.value)}} />
                                    <label htmlFor="floatingInput">Nova Senha</label>
                                </div>

                                <label className='requirement-title'> Requisitos de Senha: </label>
                                <div className='password-requirement'>
                                    <label id="length"> Ao menos 8 caracteres </label>
                                    <i className='hide' id="length-check"> <FaCheckCircle /> </i>
                                </div>
                                <div className='password-requirement'>
                                    <label id="special"> Pelo menos 1 caracter especial </label>
                                    <i className='hide' id="special-check"> <FaCheckCircle /> </i>
                                </div>
                                <div className='password-requirement'>
                                    <label id="number"> Pelo menos 1 número </label>
                                    <i className='hide' id="number-check"> <FaCheckCircle /> </i>
                                </div>

                                <div className='action-buttons'>
                                    <button className='action-bt' onClick={this.changePassword}> Alterar Senha </button>
                                </div>
                            </form>
                        </div>





                        <div className="tab-pane fade" id="nav-properties" role="tabpanel" aria-labelledby="nav-properties-tab">
                            Essa funcionalidade está em desenvolvimento!
                        </div>
                    </div>


                </div >
            </div >


        )
    }
}

export default Profile