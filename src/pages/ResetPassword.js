import React, { Component } from 'react';
import { InvalidAlert } from '../SupportFunctions';
import { saveToken } from '../config/Auth';
import api from '../config/api';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: "",
                password: ""
            }
        }


        this.formData = this.formData.bind(this);
        this.btResetClick = this.btResetClick.bind(this);
    }

    formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })
    }

    async btResetClick(e) {
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
            InvalidAlert("Redefinição Inválida!", "Insira um e-mail cadastrado.")
            return
        }

        
        // Autentica usuário e senha no banco de dados
        let password = {password: this.state.form.password}
        await api.put('/user/email/' + this.state.form.email, password)
            .then(res => {
                if (res.status === 200) {
                    saveToken(res.data.token)
                    window.location = 'http://localhost:3000/';
                } else if (res.status === 203) {
                    let errorDescription = res.data.msg

                    if (errorDescription == "O e-mail informado não está cadastrado.") {
                        document.getElementById("signin-email").classList.add('invalid')
                    }
                    InvalidAlert("Redefinição Inválida!", errorDescription)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return (
            <div class="container-fluid login-page">
                <input type="checkbox" id="register" aria-hidden="true" />

                <div class="row content-row signin">
                    <div class="col-12 signin">
                        <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' />
                        <label for="register" aria-hidden="true" className='signin-title'>Entre na LivEasy!</label>

                        <div className='signin-subtitles'>
                            <span> Bem-vindo(a) ao campo Esqueci minha Senha! </span>
                            <span> Faça a redefiniçao da sua senha e continue no controle </span>
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
                                <label for="floatingInput">Nova Senha</label>
                            </div>


                            <button className='signin-bt' onClick={this.btResetClick}> Concluir </button>
                        </form>
                    </div>
                </div>
            </div>


        )
    }
}

export default ResetPassword