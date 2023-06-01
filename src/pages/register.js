import React, { Component } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { InvalidAlert, RegisterEmail, SuccessAlert } from '../SupportFunctions';
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
                password: ""
            },
            currentSection: 1,
            selectedStep: 0,
            validPassword: false
        }

        this.formData = this.formData.bind(this);
        this.previewSection = this.previewSection.bind(this);
        this.nextSection = this.nextSection.bind(this);
        this.stepSelector = this.stepSelector.bind(this);
        this.registerFieldValidation = this.registerFieldValidation.bind(this);
    }

    // Função de atualização dos states a cada mudança detectada nos inputs
    async formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })

        if (e.target.name === "password") {
            await this.passwordValidation(e.target.value)
        }
    }

    // Valida se a senha atende todos os requisitos
    async passwordValidation(password) {
        let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        let specialCaracters = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "[", "]", "~", ">", "<", ".", ",", ":", "/", "+", "-", "'", '"', "|", "?"]
        let status = {
            length: false,
            number: false,
            special: false
        }

        // Verifica se a senha contém no mínimo 8 caracteres
        if (password.length >= 8) {
            document.getElementById("length").classList.add("success")
            document.getElementById("length-check").classList.remove("hide")
            status.length = true
        } else {
            document.getElementById("length").classList.remove("success")
            document.getElementById("length-check").classList.add("hide")
            status.length = false
        }

        // Verifica se a senha contém um caracter numérico
        let statusNumber = false
        for (let i = 0; i < password.length; i++) {
            if (numbers.includes(password[i])) {
                statusNumber = true
            }
        }
        if (statusNumber) {
            document.getElementById("number").classList.add("success")
            document.getElementById("number-check").classList.remove("hide")
            status.number = true
        } else {
            document.getElementById("number").classList.remove("success")
            document.getElementById("number-check").classList.add("hide")
            status.number = false
        }

        // Verifica se a senha contém um caracter especial
        let statusSpecial = false
        for (let i = 0; i < password.length; i++) {
            if (specialCaracters.includes(password[i])) {
                statusSpecial = true
            }
        }
        if (statusSpecial) {
            document.getElementById("special").classList.add("success")
            document.getElementById("special-check").classList.remove("hide")
            status.special = true
        } else {
            document.getElementById("special").classList.remove("success")
            document.getElementById("special-check").classList.add("hide")
            status.special = false
        }

        if (status.length && status.number && status.special) {
            this.setState({ validPassword: true })
        } else {
            this.setState({ validPassword: false })
        }
    }

    // Verifica se os campos de cadastro atendem todos os requisitos
    async registerFieldValidation() {
        // Verifica se os campos estão preenchidos
        let emptyField = false
        if (this.state.form.name === "") {
            document.getElementById("name").classList.add('invalid')
            emptyField = true
        } else {
            document.getElementById("name").classList.remove('invalid')
        }
        if (this.state.form.email === "") {
            document.getElementById("email").classList.add('invalid')
            emptyField = true
        } else {
            document.getElementById("email").classList.remove('invalid')
        }
        if (this.state.form.birthDate === "") {
            document.getElementById("birthDate").classList.add('invalid')
            emptyField = true
        } else {
            document.getElementById("birthDate").classList.remove('invalid')
        }
        if (this.state.form.phone === "") {
            document.getElementById("phone").classList.add('invalid')
            emptyField = true
        } else {
            document.getElementById("phone").classList.remove('invalid')
        }
        if (emptyField) {
            InvalidAlert("Erro no Cadastro!", "Certifique-se que todos os campos foram preenchidos.")
            return false
        }

        // Valida se o nome contém ao menos 3 caracteres
        if (this.state.form.name.length < 3) {
            document.getElementById("name").classList.add('invalid')
            InvalidAlert("Erro no Cadastro!", "Este nome é muito curto.")
            return false
        } else {
            document.getElementById("name").classList.remove('invalid')
        }

        // Verifica se é uma data de nascimento futura
        if (moment(this.state.form.birthDate) > moment()) {
            document.getElementById("birthDate").classList.add('invalid')
            InvalidAlert("Erro no Cadastro!", "Você não pode inserir uma data de nascimento futura.")
            return
        } else {
            document.getElementById("birthDate").classList.remove('invalid')
        }

        // Verifica se usuário é maior de 16 anos
        let minBirthDate = moment().subtract(16, 'years')
        if (moment(this.state.form.birthDate) > minBirthDate) {
            document.getElementById("birthDate").classList.add('invalid')
            InvalidAlert("Erro no Cadastro!", "Sinto muito! Você precisa ter 16 anos para utilizar a LivEasy.")
            return false
        } else {
            document.getElementById("birthDate").classList.remove('invalid')
        }

        // Verifica se o email é válido
        if (this.state.form.email.indexOf('@') == -1 || this.state.form.email.indexOf('.') == -1) {
            document.getElementById("email").classList.add('invalid')
            InvalidAlert("Erro no Cadastro!", "Insira um e-mail válido.")
            return false
        } else {
            document.getElementById("email").classList.remove('invalid')
        }

        // Valida se o e-mail já está cadastrado
        let validEmail = await RegisterEmail(this.state.form.email)
        if (validEmail === 203) {
            InvalidAlert("Erro no Cadastro!", "O e-mail inserido já tem cadastro na LivEasy.")
            return false
        }

        // Valida se o telefone é válido
        if (this.state.form.phone.length > 11 || this.state.form.phone.length < 10) {
            document.getElementById("phone").classList.add('invalid')
            InvalidAlert("Erro no Cadastro!", "O formato do telefone inserido é inválido. Ex: DDD + Número.")
            return false
        } else {
            document.getElementById("phone").classList.remove('invalid')
        }
        return true
    }

    // Função de click no botão "Continuar"
    async nextSection() {
        let currentSection = this.state.currentSection + 1

        switch (currentSection) {
            case 2:
                // Valida os campos de cadastro
                if (!await this.registerFieldValidation()) { break }

                // Ajusta visões
                document.getElementById("personal-section-check").classList.remove('hide')
                document.getElementsByClassName("move-step")[0].classList.remove('hide')
                document.getElementById("personal-infos").classList.add('hide')
                document.getElementById("personal-title").classList.add('success')
                document.getElementById("back-section").classList.remove('hide')

                // Atualiza state com informação da seção atual
                this.setState({ currentSection: currentSection })
                break;
            case 3:
                // Verifica se foi selecionado alguma opção de status
                if (this.state.selected === 0) {
                    InvalidAlert("Seleção Inválida!", "Selecione uma opção para continuar seu cadastro.")
                    break
                }

                // Ajusta visões
                document.getElementById("step-section-check").classList.remove('hide')
                document.getElementById("step-title").classList.add('success')
                document.getElementById("step-cards").classList.add('hide')
                document.getElementsByClassName("password")[0].classList.remove('hide')

                // Atualiza state com informação da seção atual
                this.setState({ currentSection: currentSection })
                break;
            case 4:
                if (!await this.userRegiser()) {
                    InvalidAlert("Erro no Cadastro!", "Ocorreu um erro inesperado! Tente novamente.")
                }
                SuccessAlert("Cadastro Realizado!", "Cadastro realizado com sucesso. Você será direcionado para a tela de login")
                window.location = 'http://localhost:3000/auth';
        }
    }

    // Função de click no botão "Voltar"
    previewSection() {
        let currentSection = this.state.currentSection - 1

        switch (currentSection) {
            case 1:
                // Ajusta visões
                document.getElementById("personal-section-check").classList.add('hide')
                document.getElementsByClassName("move-step")[0].classList.add('hide')
                document.getElementById("personal-infos").classList.remove('hide')
                document.getElementById("personal-title").classList.remove('success')
                document.getElementById("back-section").classList.add('hide')

                // Atualiza state com informação da seção atual
                this.setState({ currentSection: currentSection })
                break;
            case 2:
                // Ajusta visões
                document.getElementById("step-section-check").classList.add('hide')
                document.getElementById("step-title").classList.remove('success')
                document.getElementById("step-cards").classList.remove('hide')
                document.getElementsByClassName("password")[0].classList.add('hide')

                // Atualiza state com informação da seção atual
                this.setState({ currentSection: currentSection })
                break;
        }
    }

    // Função de seleção da etapa de processo
    stepSelector(e) {
        let selected = e.target.id

        switch (selected) {
            case "primeira-casa-btn":
                // Adiciona cor de fundo na seleção e retira dos demais
                document.getElementById("primeira-casa").classList.add("card-selected")
                document.getElementById("nova-casa").classList.remove("card-selected")
                document.getElementById("ja-mudou").classList.remove("card-selected")

                // Marca o botão selecionado como ativado e os demais mantém padrão
                document.getElementById("primeira-casa-btn").classList.add('btn-selected')
                document.getElementById("nova-casa-btn").classList.remove('btn-selected')
                document.getElementById("ja-fiz-a-mudanca-btn").classList.remove('btn-selected')

                // Atualiza state com etapa selecionada
                this.setState({ selectedStep: 1 })
                break;
            case "nova-casa-btn":
                // Adiciona cor de fundo na seleção e retira dos demais
                document.getElementById("primeira-casa").classList.remove("card-selected")
                document.getElementById("nova-casa").classList.add("card-selected")
                document.getElementById("ja-mudou").classList.remove("card-selected")

                // Marca o botão selecionado como ativado e os demais mantém padrão
                document.getElementById("primeira-casa-btn").classList.remove('btn-selected')
                document.getElementById("nova-casa-btn").classList.add('btn-selected')
                document.getElementById("ja-fiz-a-mudanca-btn").classList.remove('btn-selected')

                // Atualiza state com etapa selecionada
                this.setState({ selectedStep: 2 })
                break;
            case "ja-fiz-a-mudanca-btn":
                // Adiciona cor de fundo na seleção e retira dos demais
                document.getElementById("primeira-casa").classList.remove("card-selected")
                document.getElementById("nova-casa").classList.remove("card-selected")
                document.getElementById("ja-mudou").classList.add("card-selected")

                // Marca o botão selecionado como ativado e os demais mantém padrão
                document.getElementById("primeira-casa-btn").classList.remove('btn-selected')
                document.getElementById("nova-casa-btn").classList.remove('btn-selected')
                document.getElementById("ja-fiz-a-mudanca-btn").classList.add('btn-selected')

                // Atualiza state com etapa selecionada
                this.setState({ selectedStep: 3 })
                break;
        }
    }

    // Função de cadastro do usuário no banco de dados
    async userRegiser() {
        let status = true
        
        let userInfo = {
            name: this.state.form.name,
            email: this.state.form.email,
            birthDate: this.state.form.birthDate,
            password: this.state.form.password,
            type: "customer",
            phone: this.state.form.phone
        }
        
        // Registra usuário no banco de dados
        let userRegister = (await api.post('/register/create', userInfo))
        if (userRegister.status !== 201) {
            status = false
        }

        let processInfo = {
            user: userRegister.data.userPost._id,
            step: this.state.selectedStep,
            status: "nao-iniciado",            
        }

        // Registra processo no banco de dados
        let processRegister = (await api.post('/process/create', processInfo))
        if (processRegister.status !== 201) {
            status = false
        }

        return status
    }


    render() {
        if (!localStorage.getItem('name')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='register-page'>
                <header>
                    <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' />
                    <div className='title-page'>
                        <h1> Cadastre-se na LivEasy! </h1>
                        <h2> Estamos quase lá, {localStorage.getItem("name")}! Só mais algumas informações. </h2>
                    </div>
                </header>

                <div className='page-content'>
                    <div className='personal-information'>
                        <div className='section-title'>
                            <div className='title' id='personal-title'>
                                <h1> 1. Informações Pessoais</h1>
                                <i className='hide' id="personal-section-check"> <FaCheckCircle /> </i>
                            </div>
                            <h2 className='subtitle'> Confirme suas informações pessoais preenchidas anteriormente. </h2>
                        </div>

                        <div class="container-fluid mt-2" id="personal-infos">
                            <div class="row">
                                <div class="col-sm-12 col-lg-5">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="name" placeholder="name@example.com"
                                            name="name" value={this.state.form.name} onChange={this.formData} />
                                        <label for="floatingInput">Nome Completo</label>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-3">
                                    <div class="form-floating mb-3">
                                        <input type="date" class="form-control" id="birthDate" placeholder="name@example.com"
                                            name="birthDate" value={this.state.form.birthDate} onChange={this.formData} />
                                        <label for="floatingInput">Data de Nascimento</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 col-lg-5">
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="email" placeholder="name@example.com"
                                            name="email" value={this.state.form.email} onChange={this.formData} />
                                        <label for="floatingInput">E-mail</label>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-3">
                                    <div class="form-floating mb-3">
                                        <input type="number" class="form-control" id="phone" placeholder="name@example.com"
                                            name="phone" value={this.state.form.phone} onChange={this.formData} />
                                        <label for="floatingInput">Telefone</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='move-step hide'>
                        <div className='section-title'>
                            <div className='title' id='step-title'>
                                <h1 className='title'> 2. Etapa da Mudança </h1>
                                <i className='hide' id="step-section-check"> <FaCheckCircle /> </i>
                            </div>
                            <h2 className='subtitle'> Na LivEasy você pode controlar sua mudança em todas suas etapas! Selecione em que nível do planejamento de mudança que você está. </h2>
                        </div>

                        <div class="container-fluid mt-2" id="step-cards">
                            <div class="row" id="step-section">
                                <div className="col-sm-12 col-lg-7 step-card" id="primeira-casa">
                                    <img src={PrimeiraCasa} className='signin-logo' />

                                    <div className='card-info'>
                                        <h3 className='card-title'> Primeira Casa </h3>
                                        <h6 className='card-subtitle'> Por aqui guiamos você desde o início do planejamento. Entedemos juntos o que você precisa e quais são as conquistas essenciais para você morar sozinho. </h6>
                                        <button className='card-button' id="primeira-casa-btn" onClick={this.stepSelector}> Selecionar Etapa</button>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-lg-7 step-card" id="nova-casa">
                                    <img src={NovaCasa} className='signin-logo' />

                                    <div className='card-info'>
                                        <h3 className='card-title'> Nova Casa </h3>
                                        <h6 className='card-subtitle'> Para você que precisa se mudar, mas já mora sozinho. Por aqui vamos te ajudar a se organizar para tornar a mudança mais fácil. </h6>
                                        <button className='card-button' id="nova-casa-btn" onClick={this.stepSelector}> Selecionar Etapa</button>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-lg-7 step-card" id="ja-mudou">
                                    <img src={JaMudou} className='signin-logo' />

                                    <div className='card-info'>
                                        <h3 className='card-title'> Já Fiz a Mudança </h3>
                                        <h6 className='card-subtitle'> Esta etapa é pensada para você que já se mudou, mas precisa de ajuda para se organizar financeiramente e fazer a gestão de seu novo lar. </h6>
                                        <button className='card-button' id="ja-fiz-a-mudanca-btn" onClick={this.stepSelector}> Selecionar Etapa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='password hide'>
                        <div className='section-title'>
                            <div className='title'>
                                <h1 className='title'> 3. Defina sua Senha </h1>
                            </div>
                            <h2 className='subtitle'> Por fim, crie uma senha para acessar sua conta na LivEasy. </h2>
                        </div>

                        <div class="container-fluid mt-2 infos">
                            <div class="row">
                                <div class="col-sm-12 col-lg-5">
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="floatingInput" placeholder="name@example.com"
                                            name="password" value={this.state.form.password} onChange={this.formData} />
                                        <label for="floatingInput">Senha</label>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-lg-3">
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

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='btn-section'>
                        <button id='back-section' className='hide' onClick={this.previewSection}> Voltar </button>
                        <button id='next-section' onClick={this.nextSection}> Continuar </button>
                    </div>
                </div>
            </div>


        )
    }
}

export default Register
