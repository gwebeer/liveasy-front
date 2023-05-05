import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { Component } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import api from '../../config/api';
import { saveToken } from '../../config/Auth';
// import RegisterCard from '../RegisterCard.js/index.js';

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
        this.loginButton = this.loginButton.bind(this);
        this.registerButton = this.registerButton.bind(this);
    }

    formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })
    }
    async loginButton(e) {
        e.preventDefault()

        await api.get('/user/auth/' + this.state.form.email + '/' + this.state.form.password)
            .then(res => {
                if (res.status == 200) {
                    saveToken(res.data.token)
                    alert(localStorage.getItem('token'))
                    alert(localStorage.getItem('userId'))
                    alert(localStorage.getItem('userType'))
                    window.location = 'http://localhost:3000';
                } else if (res.status == 203) {
                    alert("Usuário não logado")
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
        return (
            <div className='login-page'>
                <div class="ocean">
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>

                <div className='content-box'>
                    <input type="checkbox" id="chk" aria-hidden="true" />

                    {/* Seção de Login */}
                    <div class="signin">
                        <form className='signin-form' onSubmit={this.loginButton}>
                            <label for="chk" aria-hidden="true" className='login-title'>Entre na LivEasy!</label>

                            <div className='subtitles'>
                                <span> Bem-vindo(a) novamente! </span>
                                <span> Faça o login e continue no controle </span>
                            </div>

                            <div class="form-floating data-input">
                                <input type="text" className="form-control signin-input" id="floatingInput" placeholder="name@example.com"
                                    name="email" value={this.state.form.email} onChange={this.formData} />
                                <label for="floatingInput">Email</label>
                            </div>

                            <div class="form-floating data-input">
                                <input type="password" className="form-control signin-input" id="floatingInput" placeholder="name@example.com"
                                    name="password" value={this.state.form.password} onChange={this.formData} />
                                <label for="floatingInput">Senha</label>
                            </div>

                            {/* <input className="signin-input" type="email" name="email" placeholder="Email" required value={this.state.form.email} onChange={this.formData} />
                            <input className="signin-input" type="password" name="password" placeholder="Senha" required value={this.state.form.password} onChange={this.formData} /> */}
                            <a href="#"> Esqueceu sua senha? </a>

                            <button className='signin-bt'> Entrar </button>
                        </form>
                    </div>

                    {/* Seção de Cadastro */}
                    <div class="login">
                        <form className='signup-form'>
                            <label className="signup-label" for="chk" aria-hidden="true">Cadastre-se!</label>

                            <div className='subtitles'>
                                <span> Seja bem-vindo a LivEasy! </span>
                                <span> Vamos iniciar seu cadastro </span>
                            </div>

                            {/* <input className="signup-input" type="text" name="name" placeholder="Nome Completo" required value={this.state.form.name} onChange={this.formData} />
                            <input className="signup-input" type="email" name="email" placeholder="Email" required value={this.state.form.email} onChange={this.formData} />
                            <input className="signup-input" type="text" name="birthDate" placeholder="Data de Nascimento" required value={this.state.form.birthDate} onChange={this.formData} />
                            <input className="signup-input" type="text" name="phone" placeholder="Telefone" required value={this.state.form.phone} onChange={this.formData} /> */}

                            <div class="form-floating data-input">
                                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                    name="name" value={this.state.form.name} onChange={this.formData} />
                                <label for="floatingInput">Nome Completo</label>
                            </div>

                            <div class="form-floating data-input">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                    name="email" value={this.state.form.email} onChange={this.formData} />
                                <label for="floatingInput">Email</label>
                            </div>

                            <div class="form-floating data-input">
                                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                    name="birthDate" value={this.state.form.birthDate} onChange={this.formData} />
                                <label for="floatingInput">Data de Nascimento</label>
                            </div>

                            <div class="form-floating data-input">
                                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                    name="phone" value={this.state.form.phone} onChange={this.formData} />
                                <label for="floatingInput">Telefone</label>
                            </div>


                            <button className='signup-bt' onClick={this.registerButton}> Continuar </button>
                        </form>
                    </div>
                </div>
            </div>


        )
    }
}

export default AuthPage