import React, { Component } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import RegisterCard from '../login/RegisterCard.js/index.js';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: "",
                password: "",
                name: "",
                birthDate: "",
                phone: "",
                password: ""
            }
        }

        this.formData = this.formData.bind(this);
        this.stepChoice = this.stepChoice.bind(this);
        this.backRegister = this.backRegister.bind(this);
    }

    formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })
    }

    stepChoice() {
        document.getElementById('content-box').style.width = "50%"
        document.getElementById('content-box').style.height = "325px"
        document.getElementById('content-box').style.marginTop = "-200px"

        document.getElementsByClassName('signup')[0].style.display = "none"
        document.getElementsByClassName('login')[0].style.display = "none"
        document.getElementsByClassName('main')[0].style.overflow = "visible"
    }
    backRegister() {
        document.getElementById('content-box').style.width = "25%"
        document.getElementById('content-box').style.height = "500px"
        document.getElementById('content-box').style.marginTop = "0"

        document.getElementsByClassName('signup')[0].style.display = "flex"
        document.getElementsByClassName('login')[0].style.display = "flex"
        document.getElementsByClassName('main')[0].style.overflow = "hidden"
    }

    render() {
        return (
            <div className='login-page'>
                <div class="main" id='content-box'>
                    <input type="checkbox" id="chk" aria-hidden="true" />

                    {/* Seção de Login */}
                    <div class="signup">
                        <form className='signin-form'>
                            <label for="chk" aria-hidden="true">Entre na LivEasy!</label>

                            <div className='subtitles'>
                                <span> Bem-vindo(a) novamente! </span>
                                <span> Faça o login e continue no controle </span>
                            </div>

                            <input className="signin-input" type="email" name="email" placeholder="Email" required onChange={this.formData} value={this.state.form.email} />
                            <input className="signin-input" type="password" name="password" placeholder="Senha" required onChange={this.formData} value={this.state.form.password} />
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

                            <input className="signup-input" type="text" name="name" placeholder="Nome Completo" required onChange={this.formData} value={this.state.form.name} />
                            <input className="signup-input" type="email" name="email" placeholder="Email" required onChange={this.formData} value={this.state.form.email} />
                            <input className="signup-input" type="text" name="birthDate" placeholder="Data de Nascimento" required onChange={this.formData} value={this.state.form.birthDate} />

                            <button className='signup-bt' onClick={() => { this.continueRegister() }}> Continuar </button>
                        </form>
                    </div>

                    {/* Seção de Escolha do status */}
                    <div className='register'>
                        <div className='back-option'>
                            <span onClick={() => {this.backRegister()}}> <i> <MdArrowBackIosNew/> </i> </span>
                            <span onClick={() => {this.backRegister()}}> voltar </span>
                        </div>
                        <h2> Olá {this.state.form.name}, </h2>
                        <h4> Ficamos felizes no seu interesse em usar a LivEasy! Para começar sua jornada conosco, selecione qual seu objetivo usando nossa plataforma </h4>

                        <div class="container">
                            <RegisterCard 
                                title="Primeira casa"
                                description="Te ajudamos com todo o planejamento para que conquiste sua independência e 
                                descubra as vantagens de morar sozinho."
                            />
                            <RegisterCard 
                                title="Nova Casa"
                                description="Se mudou e quer começar com o pé direito? Faça todo o planjemanto para que 
                                seu lar fique do jeitinho que você sempre sonhou!"
                            />
                            <RegisterCard 
                                title="Organização"
                                description="Já se mudou a sabe dos desafios que a falta de planejamento traz? Aqui ajudamos 
                                a organizar suas tarefas para que fique livre de dor de cabeças"
                            />
                        </div>
                    </div>

                </div>
            </div>


        )
    }
}

export default AuthPage