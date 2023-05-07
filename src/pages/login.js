import React, { Component } from 'react';
import api from '../config/api';
import { saveToken } from '../config/Auth';
import { InvalidAlert } from '../SupportFunctions';
import moment from 'moment/moment';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "",
                email: "",
                birthDate: "",
                phone: "",
                password: ""
            }
        }

        this.formData = this.formData.bind(this);
        this.btLoginClick = this.btLoginClick.bind(this);
        this.btRegisterClick = this.btRegisterClick.bind(this);
    }

    formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })
    }
    async btLoginClick(e) {
        e.preventDefault()

        // Verifica se os campos estão preenchidos
        let emptyField = false
        if (this.state.form.email === "") {
            document.getElementById("signin-email").classList.add('invalid')
            emptyField = true
        } else {
            document.getElementById("signin-email").classList.remove('invalid')
        }
        if (this.state.form.password === "") {
            document.getElementById("password").classList.add('invalid')
            emptyField = true
        } else {
            document.getElementById("password").classList.remove('invalid')
        }
        if (emptyField) {
            InvalidAlert("Login Inválido!", "Certifique-se que os campos foram preenchidos.")
            return
        }

        // Verifica se o email é válido
        if (this.state.form.email.indexOf('@') == -1 || this.state.form.email.indexOf('.') == -1) {
            document.getElementById("signin-email").classList.add('invalid')
            InvalidAlert("Login Inválido!", "Insira um e-mail válido.")
            return
        }

        // Autentica usuário e senha no banco de dados
        await api.get('/user/auth/' + this.state.form.email + '/' + this.state.form.password)
            .then(res => {
                if (res.status == 200) {
                    saveToken(res.data.token)
                    window.location = 'http://localhost:3000';
                } else if (res.status == 203) {
                    let errorDescription = res.data.msg

                    if (errorDescription == "O e-mail informado não está cadastrado.") {
                        document.getElementById("signin-email").classList.add('invalid')
                    }
                    InvalidAlert("Login Inválido!", errorDescription)
                }
            })
            .catch(err => {
                console.log(err)
            })


    }

    async btRegisterClick(e) {
        e.preventDefault()

        // Verifica se os campos estão preenchidos
        let emptyField = false
        if (this.state.form.name === "") {
            document.getElementById("name").classList.add('invalid')
            emptyField = true
        } else {
            document.getElementById("name").classList.remove('invalid')
        }
        if (this.state.form.email === "") {
            document.getElementById("signup-email").classList.add('invalid')
            emptyField = true
        } else {
            document.getElementById("signup-email").classList.remove('invalid')
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
            return
        }

        // Valida se o nome contém ao menos 3 caracteres
        if (this.state.form.name.length < 3) {
            document.getElementById("name").classList.add('invalid')
            InvalidAlert("Erro no Cadastro!", "Este nome é muito curto.")
            return
        } else {
            document.getElementById("name").classList.remove('invalid')
        }

        // Verifica se o email é válido
        if (this.state.form.email.indexOf('@') == -1 || this.state.form.email.indexOf('.') == -1) {
            document.getElementById("signup-email").classList.add('invalid')
            InvalidAlert("Erro no Cadastro!", "Insira um e-mail válido.")
            return
        } else {
            document.getElementById("signup-email").classList.remove('invalid')
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
            return
        } else {
            document.getElementById("birthDate").classList.remove('invalid')
        }

        // Verifica se o número de telefone é válido
        if (this.state.form.phone.length > 11 || this.state.form.phone.length < 10) {
            document.getElementById("phone").classList.add('invalid')
            InvalidAlert("Erro no Cadastro!", "O formato do telefone inserido é inválido. Ex: DDD + Número.")
            return
        } else {
            document.getElementById("phone").classList.remove('invalid')
        }

        await api.get('auth/email/' + this.state.form.email)
            .then(res => {
                if (res.status == 203) {
                    InvalidAlert("Erro no Cadastro!", "O e-mail inserido já tem cadastro na LivEasy.")
                } else {
                    localStorage.setItem('name', this.state.form.name)
                    localStorage.setItem('email', this.state.form.email)
                    localStorage.setItem('birthDate', this.state.form.birthDate)
                    localStorage.setItem('phone', this.state.form.phone)
                    window.location = 'http://localhost:3000/register';
                }
            })
            .catch(err => {
                console.log(err)
            })
    }



    async registerButton(e) {
        e.preventDefault()

        await api.get('/user/register/' + this.state.form.email)
            .then(res => {
                if (res.status == 203) {
                    alert("Email já cadastrado")
                } else {
                    window.location = 'http://localhost:3000/register';
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        if (localStorage.getItem('token')) {
            window.location = 'http://localhost:3000';
        }


        return (
            <div class="container-fluid login-page">
                <input type="checkbox" id="register" aria-hidden="true" />

                <div class="row content-row signin">
                    <div class="col-12 signin">
                        <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' />
                        <label for="register" aria-hidden="true" className='signin-title'>Entre na LivEasy!</label>

                        <div className='signin-subtitles'>
                            <span> Bem-vindo(a) novamente! </span>
                            <span> Faça o login e continue no controle </span>
                        </div>

                        <form className='signin-form'>
                            <div class="form-floating data-input">
                                <input type="email" className="form-control signin-input" id="signin-email" placeholder="name@example.com"
                                    name="email" value={this.state.form.email} onChange={this.formData} />
                                <label for="floatingInput">Email</label>
                            </div>

                            <div class="form-floating data-input">
                                <input type="password" className="form-control signin-input" id="password" placeholder="name@example.com"
                                    name="password" value={this.state.form.password} onChange={this.formData} />
                                <label for="floatingInput">Senha</label>
                            </div>

                            <button className='signin-bt' onClick={this.btLoginClick}> Entrar </button>
                        </form>
                    </div>

                    <div class="col-12 signup">
                        <label className="signup-title" for="register" aria-hidden="true">Cadastre-se!</label>

                        <div className='signup-subtitles'>
                            <span> Seja bem-vindo a LivEasy! </span>
                            <span> Vamos iniciar seu cadastro </span>
                        </div>

                        <form className='signup-form'>
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

                            <button className='signup-bt' onClick={this.btRegisterClick}> Continuar </button>
                        </form>
                    </div>
                </div>
            </div>


        )
    }
}

export default AuthPage