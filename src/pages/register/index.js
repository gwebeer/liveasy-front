import React, { Component } from 'react';
import RegisterCard from '../login/RegisterCard'
import CardRegister from './RegisterCard';
import api from '../../config/api';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "Vittorio Perotto",
                email: "vittorio@pucpr.edu.br",
                birthDate: "01/12/2001",
                phone: "(41) 99999-9999",
                category: "Organização",
                type: "customer",
                password: ""
            }
        }

        this.formData = this.formData.bind(this);
        this.registerButton = this.registerButton.bind(this);
    }

    formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })
    }
    async registerButton(e) {
        e.preventDefault()

        await api.post('/register/create', this.state.form)
            .then(res => {
                alert("Usuário Cadastrado!")
                window.location = 'http://localhost:3000/auth';
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className='register-page'>
                <div className='info-section'>

                </div>

                <div className='content-section'>
                    <div class="container first-section">
                        <div className='row section-title'>
                            <h2> 1. Dados pessoais </h2>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-floating data-input">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        name="name" value={this.state.form.name} onChange={this.formData} />
                                    <label for="floatingInput">Nome Completo</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating data-input">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        name="email" value={this.state.form.email} onChange={this.formData} />
                                    <label for="floatingInput">E-mail</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-floating data-input">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        name="birthDate" value={this.state.form.birthDate} onChange={this.formData} />
                                    <label for="floatingInput">Data de Nascimento</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating data-input">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        name="phone" value={this.state.form.phone} onChange={this.formData} />
                                    <label for="floatingInput">Telefone</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container second-section">
                        <div className='row section-title'>
                            <h2> 2. Escolha uma etapa: </h2>
                        </div>

                        <div className='category-cards'>
                            <CardRegister title="Primeira Casa" label="Te ajudamos com todo o planejamento para que conquiste sua independência e 
                                descubra as vantagens de morar sozinho." id="primeiraCasa" />
                            <CardRegister title="Nova Casa" label="Se mudou e quer começar com o pé direito? Faça todo o planjemanto para que 
                                seu lar fique do jeitinho que você sempre sonhou!" id="novaCasa" />
                            <CardRegister title="Organização" label="Já se mudou a sabe dos desafios que a falta de planejamento traz? Aqui ajudamos 
                                a organizar suas tarefas para que fique livre de dor de cabeças" id="organizacao" />
                        </div>
                    </div>

                    <div class="container third-section">
                        <div className='row section-title'>
                            <h2> 3. Cadastre uma senha </h2>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-floating data-input">
                                    <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        name="password" value={this.state.form.password} onChange={this.formData} />
                                    <label for="floatingInput">Senha</label>
                                </div>
                            </div>
                            <div class="col">
                                Crie uma senha forte que siga os requisitos: <br/>
                                - Mínimo 6 caracteres <br/>
                                - Pelo menos 1 símbolo e 1 número
                            </div>
                        </div>
                    </div>


                    <div class="container-fluid button-section">
                        {/* <button className='section-navigation'> Voltar </button> */}
                        <button className='section-navigation' onClick={this.registerButton}> Finalizar Cadastro </button>
                    </div>
                </div>
            </div>


        )
    }
}

export default RegisterPage