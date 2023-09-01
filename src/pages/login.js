import moment from 'moment/moment';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { InvalidAlert } from '../SupportFunctions';
import { saveToken } from '../config/Auth';
import api from '../config/api';

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
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
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
        let userInfo = {
            email: this.state.form.email,
            password: this.state.form.password
        }

        await api.post('/user/auth', userInfo)
            .then(res => {
                console.log(res)
                if (res.status == 200) {
                    saveToken(res.data.token)
                    window.location = 'http://localhost:3000';
                }
            })
            .catch(err => {
                if (err.response.status == 401) {
                    InvalidAlert("Login Inválido!", err.response.data.msg)                    
                } else if (err.response.status == 404) {
                    InvalidAlert("Login Inválido!", err.response.data.msg)                    
                } else {
                    console.log(err)
                }
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

        let userEmail = {email: this.state.form.email}
        await api.post('/user/validate-email', userEmail)
            .then(res => {
                if (res.status == 200) {
                    InvalidAlert("Erro no Cadastro!", res.data.msg)
                    document.getElementById("signup-email").classList.add('invalid')
                }
            })
            .catch(err => {
                if (err.response.status == 404) {
                    document.getElementById("signup-email").classList.remove('invalid')
                    localStorage.setItem('name', this.state.form.name)                   
                    localStorage.setItem('email', this.state.form.email)
                    localStorage.setItem('birthDate', this.state.form.birthDate)
                    localStorage.setItem('phone', this.state.form.phone)
                    window.location = 'http://localhost:3000/register';
                } else { 
                    InvalidAlert("Erro no Cadastro!", "Ocorreu um erro desconhecido!")
                }
            })
    }

    async handleForgotPassword(e) {
        e.preventDefault();

        let emptyField = false
        if (this.state.form.email === "") {
            document.getElementById("signin-email").classList.add('invalid')
            emptyField = true
        } else {
            document.getElementById("signin-email").classList.remove('invalid')
        }
        
        // Verifica se o email é válido
        if (this.state.form.email.indexOf('@') == -1 || this.state.form.email.indexOf('.') == -1) {
            document.getElementById("signin-email").classList.add('invalid')
            InvalidAlert("Login Inválido!", "Insira um e-mail válido.")
            return
        }

        await api.get('/user/forgotPassword/' + this.state.form.email)
        .then(res => {
                if (res.status == 200) {
                    // Senha enviada com sucesso
                    // Você pode exibir uma mensagem informando ao usuário que a senha foi enviada para o e-mail fornecido
                    document.getElementById("signup-email").classList.remove('invalid')
                    alert("Um e-mail com as instruções para recuperar a senha foi enviado para o seu endereço de e-mail.");
                } else if (res.status == 203) {
                    // O e-mail informado não está cadastrado
                    document.getElementById("signin-email").classList.add('invalid');
                    InvalidAlert("Recuperação de Senha", "O e-mail informado não está cadastrado.");
                }
            })
            .catch(err => {
                console.log(err);
                // Lida com erros na solicitação, como falha na conexão com o servidor.
                // Exiba uma mensagem de erro apropriada para o usuário.
                InvalidAlert("Recuperação de Senha", "Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde.");
            });
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

                            <Link to="http://localhost:3000" onClick={this.handleForgotPassword}>Esqueceu a senha?</Link>

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