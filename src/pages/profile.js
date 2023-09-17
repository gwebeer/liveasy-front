import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import { FaUserCircle, FaCheckCircle } from 'react-icons/fa';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "",
                birthDate: "",
                phone: "",
                email: "",
            }
        }

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
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-personal-tab" data-bs-toggle="tab" data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal" aria-selected="true">
                                Informações Pessoais
                            </button>

                            <button class="nav-link" id="nav-moving-tab" data-bs-toggle="tab" data-bs-target="#nav-moving" type="button" role="tab" aria-controls="nav-moving" aria-selected="false">
                                Informações de Mudança
                            </button>

                            <button class="nav-link" id="nav-access-tab" data-bs-toggle="tab" data-bs-target="#nav-access" type="button" role="tab" aria-controls="nav-access" aria-selected="false">
                                Acesso
                            </button>

                            <button class="nav-link" id="nav-properties-tab" data-bs-toggle="tab" data-bs-target="#nav-properties" type="button" role="tab" aria-controls="nav-properties" aria-selected="false">
                                Preferência de Imóveis
                            </button>
                        </div>
                    </nav>

                    <div class="tab-content" id="nav-tabContent">

                        <div class="tab-pane fade show active" id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
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


                        <div class="tab-pane fade" id="nav-moving" role="tabpanel" aria-labelledby="nav-moving-tab">
                            <form className='move-information-form'>
                                <div class="form-floating data-input">
                                    <input type="number" className="form-control" id="income" placeholder="R$ 1000,00"
                                        name="income" value={this.state.form.income} onChange={this.formData} />
                                    <label for="floatingInput"> Qual sua renda mensal? </label>
                                </div>

                                <span> Você possui dinheiro guardado que vá destinar a mudança? </span>
                                <div className='budget-buttons'>
                                    <button id='budgetShow' onClick={this.movingBudgetShow}> Sim </button>
                                    <button id='budgetHide' onClick={this.movingBudgetHide}> Não </button>
                                </div>

                                <div class="form-floating data-input hide" id="movingBudgetInput">
                                    <input type="number" className="form-control" id="movingBudget" placeholder="R$ 1000,00"
                                        name="movingBudget" value={this.state.form.movingBudget} onChange={this.formData} />
                                    <label for="floatingInput"> Quanto vai destinar? </label>
                                </div>

                                <div class="form-floating data-input">
                                    <input type="date" className="form-control" id="movingDate" placeholder="dd/mm/yyyy"
                                        name="movingDate" value={this.state.form.movingDate} onChange={this.formData} />
                                    <label for="floatingInput">Data Prevista de Mudança</label>
                                </div>

                                <div className='action-buttons'>
                                    <button className='action-bt' onClick={this.moveInformationBackClick}> Voltar </button>
                                    <button className='action-bt' onClick={this.moveInformationNextClick}> Próximo </button>
                                </div>
                            </form>
                        </div>



                        <div class="tab-pane fade" id="nav-access" role="tabpanel" aria-labelledby="nav-access-tab">
                            <form className='password-form'>
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
                            </form>
                        </div>





                        <div class="tab-pane fade" id="nav-properties" role="tabpanel" aria-labelledby="nav-properties-tab">
                            Essa funcionalidade está em desenvolvimento!
                        </div>
                    </div>


                </div>
            </div>


        )
    }
}

export default Profile