import React, { Component } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

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
            currentSection: 1
        }

        this.formData = this.formData.bind(this);
        this.previewSection = this.previewSection.bind(this);
        this.nextSection = this.nextSection.bind(this);
    }

    formData(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value;
        this.setState({ form: form })

        let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        let specialCaracters = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "[", "]", "~", ">", "<", ".", ",", ":", "/", "+", "-", "'", '"', "|", "?"]
        if (e.target.name === "password") {
            let password = e.target.value

            if (password.length >= 8) {
                document.getElementById("length").classList.add("success")
                document.getElementById("length-check").classList.remove("hide")
            } else {
                document.getElementById("length").classList.remove("success")
                document.getElementById("length-check").classList.add("hide")
            }

            let statusNumber = false
            for (let i = 0; i < password.length; i++) {
                if (numbers.includes(password[i])) {
                    statusNumber = true
                }
            }
            if (statusNumber) {
                document.getElementById("number").classList.add("success")
                document.getElementById("number-check").classList.remove("hide")
            } else {
                document.getElementById("number").classList.remove("success")
                document.getElementById("number-check").classList.add("hide")
            }

            let statusSpecial = false
            for (let i = 0; i < password.length; i++) {
                if (specialCaracters.includes(password[i])) {
                    statusSpecial = true
                }
            }
            if (statusSpecial) {
                document.getElementById("special").classList.add("success")
                document.getElementById("special-check").classList.remove("hide")
            } else {
                document.getElementById("special").classList.remove("success")
                document.getElementById("special-check").classList.add("hide")
            }
        }
    }
    nextSection() {
        let currentSection = this.state.currentSection + 1

        switch (currentSection) {
            case 2:
                document.getElementById("personal-section-check").classList.remove('hide')
                document.getElementsByClassName("move-step")[0].classList.remove('hide')
                document.getElementById("personal-infos").classList.add('hide')
                document.getElementById("personal-title").classList.add('success')
                document.getElementById("back-section").classList.remove('hide')
                this.setState({ currentSection: currentSection })
                break;
            case 3:
                document.getElementById("step-section-check").classList.remove('hide')
                document.getElementById("step-title").classList.add('success')
                document.getElementById("step-cards").classList.add('hide')
                document.getElementsByClassName("password")[0].classList.remove('hide')
                this.setState({ currentSection: currentSection })
                break;
            case 4:
                window.location = 'http://localhost:3000/register#';
        }
    }
    previewSection() {
        let currentSection = this.state.currentSection - 1

        switch (currentSection) {
            case 1:
                document.getElementById("personal-section-check").classList.add('hide')
                document.getElementsByClassName("move-step")[0].classList.add('hide')
                document.getElementById("personal-infos").classList.remove('hide')
                document.getElementById("personal-title").classList.remove('success')
                document.getElementById("back-section").classList.add('hide')
                this.setState({ currentSection: currentSection })
                break;
            case 2:
                document.getElementById("step-section-check").classList.add('hide')
                document.getElementById("step-title").classList.remove('success')
                document.getElementById("step-cards").classList.remove('hide')
                document.getElementsByClassName("password")[0].classList.add('hide')
                this.setState({ currentSection: currentSection })
                break;
        }
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
                                        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com"
                                            name="name" value={this.state.form.name} onChange={this.formData} />
                                        <label for="floatingInput">Nome Completo</label>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-3">
                                    <div class="form-floating mb-3">
                                        <input type="date" class="form-control" id="floatingInput" placeholder="name@example.com"
                                            name="birthDate" value={this.state.form.birthDate} onChange={this.formData} />
                                        <label for="floatingInput">Data de Nascimento</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 col-lg-5">
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                                            name="email" value={this.state.form.email} onChange={this.formData} />
                                        <label for="floatingInput">E-mail</label>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-3">
                                    <div class="form-floating mb-3">
                                        <input type="number" class="form-control" id="floatingInput" placeholder="name@example.com"
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
                                <div className="col-sm-12 col-lg-7 step-card">
                                    <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' />

                                    <div className='card-info'>
                                        <h3 className='card-title'> Primeira Casa </h3>
                                        <h6 className='card-subtitle'> Por aqui guiamos você desde o início do planejamento. Entedemos juntos o que você precisa e quais são as conquistas essenciais para você morar sozinho. </h6>
                                        <button className='card-button'> Selecionar Etapa</button>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-lg-7 step-card">
                                    <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' />

                                    <div className='card-info'>
                                        <h3 className='card-title'> Nova Casa </h3>
                                        <h6 className='card-subtitle'> Para você que precisa se mudar, mas já mora sozinho. Por aqui vamos te ajudar a se organizar para tornar a mudança mais fácil. </h6>
                                        <button className='card-button'> Selecionar Etapa</button>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-lg-7 step-card">
                                    <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' />

                                    <div className='card-info'>
                                        <h3 className='card-title'> Já Fiz a Mudança </h3>
                                        <h6 className='card-subtitle'> Esta etapa é pensada para você que já se mudou, mas precisa de ajuda para se organizar financeiramente e fazer a gestão de seu novo lar. </h6>
                                        <button className='card-button'> Selecionar Etapa</button>
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
                        {this.state.currentSection}
                    </div>
                </div>
            </div>


        )
    }
}

export default Register
