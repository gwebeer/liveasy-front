import React, { Component } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { InvalidAlert, RegisterEmail, RegisterFieldValidation, SuccessAlert, passwordValidation, selectStep } from '../SupportFunctions';
import moment from 'moment/moment';
import api from '../config/api';
import PrimeiraCasa from '../assets/first_home.png'
import NovaCasa from '../assets/new_home.png'
import JaMudou from '../assets/mudanca.png'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                birthDate: localStorage.getItem("birthDate"),
                phone: localStorage.getItem("phone"),
                password: "",
            },
            selectedStep: "",
            stepDescription: "Selecione umas das etapas acima para ver mais detalhes sobre ela.",
            creationStatus: "Estamos criando seu usuário...",
            creationDescription: ""
        }

        this.formData = this.formData.bind(this);
        this.personalInfoBtClick = this.personalInfoBtClick.bind(this);
        this.stepSelector = this.stepSelector.bind(this);
        this.moveStepNextClick = this.moveStepNextClick.bind(this);
        this.moveStepBackClick = this.moveStepBackClick.bind(this);
        this.passwordBackClick = this.passwordBackClick.bind(this);
        this.passwordNextClick = this.passwordNextClick.bind(this);
        this.userRegiser = this.userRegiser.bind(this);
    }

    // Função de atualização dos states a cada mudança detectada nos inputs
    async formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })

        if (e.target.name === "password") {
            await passwordValidation(e.target.value)
        }
    }

    // Botão de próximo da seção de informações pessoais
    async personalInfoBtClick(e) {
        // Cancela envio de formulário
        e.preventDefault();

        // Envoca função de validação dos campos de registro
        let fieldValidation = await RegisterFieldValidation(this.state.form)

        // Realiza ações de próximo passo, caso a validação não retorne erro
        if (fieldValidation) {
            // Diminuir a altura do Box de informçaões pessoais
            document.getElementById("personal-information").style.height = '80px'
            // Mostrar símbolo de concluído no título de informações pessoais
            document.getElementById("personal-information-check").classList.remove('hide')
            // Definir cor verde para o título do box de informações pessoais
            document.getElementById("personal-information-title").classList.add('success')
            // Mostrar box de etapa de mudança
            document.getElementById("move-step").style.marginLeft = "10px"
        }
    }

    // Função para definir qual a etapa de mudança que foi selecionada
    async stepSelector(e) {
        // Busca o nome da etapa selecionada
        let elementName = e.target.classList[0]

        // Envoca a função de seleção da etapa
        let functionSelected = await selectStep(elementName)

        // Atualiza o state com etapa selecionada e sua descrição
        this.setState({ selectedStep: functionSelected.step, stepDescription: functionSelected.description })
    }

    // Botão de próximo da seção de seleção da etapa de mudança
    async moveStepNextClick() {
        // Valida se foi selecionado alguma etapa de mudança
        if (this.state.selectedStep === "") {
            InvalidAlert("Seleção Inválida!", "Você precisa selecionar uma etapa para continuar.")
            return
        }

        // Diminuir a altura do Box de etapa da mudança
        document.getElementById("move-step").style.height = '80px'
        // Mostrar símbolo de concluído no título da etapa de mudança
        document.getElementById("move-step-check").classList.remove('hide')
        // Definir cor verde para o título do box de etapa de mudança
        document.getElementById("move-step-title").classList.add('success')
        // Mostrar box de criação de senha
        document.getElementById("password-section").style.marginLeft = "10px"
    }

    // Botão de voltar da seção de seleção da etapa de mudança
    async moveStepBackClick() {
        // Aumentar a altura do Box de informçaões pessoais
        document.getElementById("personal-information").style.height = '410px'
        // Ocultar símbolo de concluído no título de informações pessoais
        document.getElementById("personal-information-check").classList.add('hide')
        // Definir cor padrão para o título do box de informações pessoais
        document.getElementById("personal-information-title").classList.remove('success')
        // Ocultar box de etapa de mudança
        document.getElementById("move-step").style.marginLeft = "10000px"
    }

    // Botão de voltar da seção de criação de senha
    async passwordBackClick() {
        // Aumentar a altura do Box de etapa da mudança
        document.getElementById("move-step").style.height = '390px'
        // Ocultar símbolo de concluído no título da etapa de mudança
        document.getElementById("move-step-check").classList.add('hide')
        // Definir cor padrão para o título do box de etapa de mudança
        document.getElementById("move-step-title").classList.remove('success')
        // Ocultar box de definição de senha
        document.getElementById("password-section").style.marginLeft = "10000px"
    }

    // Botão de próximo da seção de criação de senha
    async passwordNextClick() {
        // Valida se a senha criada atende os requisitos
        if (!await passwordValidation(this.state.form.password)) {
            InvalidAlert("Campo Inválido!", "A senha não atende todos os requisitos.")
            return
        }

        // Diminuir a altura do Box de criação de senha
        document.getElementById("password-section").style.height = '80px'
        // Mostrar símbolo de concluído no título da seção de criação de senha
        document.getElementById("password-section-check").classList.remove('hide')
        // Definir cor verde para o título do box de criação de senha
        document.getElementById("password-section-title").classList.add('success')
        // Exibe informações de carregamento
        document.getElementById("loading-user-create").style.marginLeft = "10px"
        // Inicia barra de carregamento
        document.getElementById("loading-bar").style.width = "400px"

        // Envoca a função de cadastro
        this.userRegiser()
    }

    // Função de cadastro do usuário no banco de dados
    async userRegiser() {
        let status = true

        // Monta dicionário com informações do usuário
        let userInfo = {
            name: this.state.form.name,
            email: this.state.form.email,
            birthDate: this.state.form.birthDate,
            password: this.state.form.password,
            type: "customer",
            phone: this.state.form.phone,
        }
        console.log(userInfo)

        // Registra usuário no banco de dados
        let userRegister = (await api.post('/register/create', userInfo))

        // Monta dicionário com informações para criação de um processo
        let processInfo = {
            user: userRegister.data.userPost._id,
            step: this.state.selectedStep,
            status: "nao-iniciado",
        }

        // Registra processo no banco de dados
        let processRegister = (await api.post('/process/create', processInfo))

        // Exibe mensagem de sucesso
        await new Promise(r => setTimeout(r, 5000));
        this.setState({ creationStatus: "Usuário criado com sucesso!", creationDescription: "Você será direcionado para a página de login." })

        // Remove as informações do localstorage
        localStorage.clear()

        // Direciona para página de login
        await new Promise(r => setTimeout(r, 1000));
        window.location = 'http://localhost:3000/auth';

    }

    render() {
        if (!localStorage.getItem('name')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='register-page'>
                <div className='logo-section'>
                    <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' />
                    <label> LivEasy </label>
                </div>

                <div className='title-section'>
                    <h1> Você está quase lá! </h1>
                    <h2> Temos mais algumas perguntas antes de finalizar seu cadastro. </h2>
                </div>

                <div className='personal-information' id='personal-information'>
                    <span className='section-title' id='personal-information-title'>
                        <h3> Informações Pessoais</h3>
                        <i className='hide' id="personal-information-check"> <FaCheckCircle /> </i>
                    </span>
                    <h4> Confirme suas informações preenchidas anteriormente </h4>

                    <form className='personal-information-form' id='personal-information-form'>
                        <div class="form-floating data-input">
                            <input type="text" className="form-control" id="name" placeholder="name@example.com"
                                name="name" value={this.state.form.name} onChange={this.formData} />
                            <label for="floatingInput">Nome Completo</label>
                        </div>

                        <div class="form-floating data-input">
                            <input type="email" className="form-control" id="signup-email" placeholder="name@example.com"
                                name="email" value={this.state.form.email} onChange={this.formData} />
                            <label for="floatingInput">Email</label>
                        </div>

                        <div class="form-floating data-input">
                            <input type="date" className="form-control" id="birthDate" placeholder="name@example.com"
                                name="birthDate" value={this.state.form.birthDate} onChange={this.formData} />
                            <label for="floatingInput">Data de Nascimento</label>
                        </div>

                        <div class="form-floating data-input">
                            <input type="number" className="form-control" id="phone" placeholder="name@example.com"
                                name="phone" value={this.state.form.phone} onChange={this.formData} />
                            <label for="floatingInput">Telefone</label>
                        </div>

                        <button className='signup-bt' onClick={this.personalInfoBtClick}> Próximo </button>
                    </form>
                </div>

                <div className='move-step' id='move-step'>
                    <span className='section-title' id='move-step-title'>
                        <h3> Queremos te conhecer melhor </h3>
                        <i className='hide' id="move-step-check"> <FaCheckCircle /> </i>
                    </span>
                    <h4> Para te ajudar com todo o planejamento </h4>

                    <div className="container step-cards">
                        <div class="form-floating data-input">
                            <input type="number" className="form-control" id="phone" placeholder="name@example.com"
                                name="phone" value={this.state.form.phone} onChange={this.formData} />
                            <label for="floatingInput">Renda Mensal</label>
                        </div>

                        <span className='step-description'> Você possui dinheiro guardado que vá destinar a mudança? </span>
                        <div className='action-buttons'>
                            <button className='action-bt' onClick={this.moveStepBackClick}> Sim </button>
                            <button className='action-bt' onClick={this.moveStepNextClick}> Não </button>
                        </div>

                        <div class="form-floating data-input">
                            <input type="number" className="form-control" id="phone" placeholder="name@example.com"
                                name="phone" value={this.state.form.phone} onChange={this.formData} />
                            <label for="floatingInput">Orçamento Especial</label>
                        </div>

                        {/* <div className="row align-items-center">
                            <div className="primeira-casa col" id="primeira-casa" onClick={this.stepSelector}>
                                <img className="primeira-casa" src={PrimeiraCasa} />
                                <span className="primeira-casa"> Primeira Casa </span>
                            </div>

                            <div className="nova-casa col" id="nova-casa" onClick={this.stepSelector}>
                                <img src={NovaCasa} className="nova-casa" />
                                <label className="nova-casa"> Nova Casa </label>
                            </div>

                            <div className="ja-mudei col" id="ja-mudei" onClick={this.stepSelector}>
                                <img src={JaMudou} className="ja-mudei" />
                                <label className="ja-mudei"> Já me Mudei </label>
                            </div>
                        </div> */}

                        {/* <span className='step-description'> {this.state.stepDescription} </span> */}
                        <div className='action-buttons'>
                            <button className='action-bt' onClick={this.moveStepBackClick}> Voltar </button>
                            <button className='action-bt' onClick={this.moveStepNextClick}> Próximo </button>
                        </div>
                    </div>
                </div>

                <div className='password-section' id='password-section'>
                    <span className='section-title' id='password-section-title'>
                        <h3> Crie sua Senha </h3>
                        <i className='hide' id="password-section-check"> <FaCheckCircle /> </i>
                    </span>
                    <h4> Por fim, crie uma senha para acessar a LivEasy </h4>

                    <div class="form-floating data-input">
                        <input type="password" className="form-control" id="password" placeholder="name@example.com"
                            name="password" value={this.state.form.password} onChange={this.formData} />
                        <label for="floatingInput">Senha de Acesso</label>
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
                        <button className='action-bt' onClick={this.passwordBackClick}> Voltar </button>
                        <button className='action-bt' onClick={this.passwordNextClick}> Finalizar </button>
                    </div>
                </div>

                <span id='loading-user-create'>
                    <h4> {this.state.creationStatus} </h4>
                    <label> {this.state.creationDescription} </label>
                    <div id='loading-bar'> </div>
                </span>

            </div>
        )
    }
}

export default Register
