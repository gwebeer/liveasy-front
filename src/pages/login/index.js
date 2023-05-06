// import { isDisabled } from '@testing-library/user-event/dist/utils';
// import React, { Component } from 'react';
// import { MdArrowBackIosNew } from 'react-icons/md';
// import api from '../../config/api';
// import { saveToken } from '../../config/Auth';
// import { Modal } from 'bootstrap';
// // import RegisterCard from '../RegisterCard.js/index.js';

// class AuthPage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             form: {
//                 name: "",
//                 email: "",
//                 birthDate: "",
//                 phone: "",
//                 password: ""
//             }
//         }

//         this.formData = this.formData.bind(this);
//         this.loginButton = this.loginButton.bind(this);
//         this.registerButton = this.registerButton.bind(this);

//         this.toastTeste = this.toastTeste.bind(this);
//         this.loginValidation = this.loginValidation.bind(this);
//     }

//     async loginValidation(e) {
//         e.preventDefault()

//         // Verifica se os campos estão preenchidos
//         let emptyField = false
//         if (this.state.form.email === "") {
//             document.getElementById("email").classList.add('invalid')
//             emptyField = true
//         } else {
//             document.getElementById("email").classList.remove('invalid')
//         }
//         if (this.state.form.password === "") {
//             document.getElementById("password").classList.add('invalid')
//             emptyField = true
//         } else {
//             document.getElementById("password").classList.remove('invalid')
//         }
//         if (emptyField) {
//             alert("Não preenchido")
//             return
//         }

//         // Verifica se o email é válido
//         if (this.state.form.email.indexOf('@') == -1 || this.state.form.email.indexOf('.') == -1) {
//             document.getElementById("email").classList.add('invalid')
//             alert("E-mail invalido!")
//             return
//         }

//         // Autentica usuário e senha no banco de dados
//         await api.get('/user/auth/' + this.state.form.email + '/' + this.state.form.password)
//             .then(res => {
//                 if (res.status == 200) {
//                     saveToken(res.data.token)
//                     alert(localStorage.getItem('token'))
//                     alert(localStorage.getItem('userId'))
//                     alert(localStorage.getItem('userType'))
//                     window.location = 'http://localhost:3000';
//                 } else if (res.status == 203) {
//                     let errorDescription = res.data.msg

//                     if (errorDescription == "O e-mail informado não está cadastrado.") {
//                         document.getElementById("email").classList.add('invalid')
//                     }
//                     alert(errorDescription)
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//             })


//     }


//     toastTeste(e) {
//         e.preventDefault()
//         var modalElement = document.getElementById("custom-alert")

//         document.getElementById('customAlert-title').textContent = "Login Inválido!"
//         document.getElementById('customAlert-description').textContent = "Certifique-se que todos os campos foram preenchidos!"

//         var bsModal = new Modal(modalElement)
//         bsModal.toggle()
//     }

//     formData(e) {
//         let form = this.state.form
//         form[e.target.name] = e.target.value;
//         this.setState({ form: form })
//     }
//     async loginButton(e) {
//         e.preventDefault()


//     }
//     async registerButton(e) {
//         e.preventDefault()

//         await api.get('/user/register/' + this.state.form.email)
//             .then(res => {
//                 if (res.status == 203) {
//                     alert("Email já cadastrado")
//                 } else {
//                     window.location = 'http://localhost:3000/register';
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     render() {
//         if (localStorage.getItem('token')) {
//             window.location = 'http://localhost:3000';
//         }


//         return (
//             <div class="container-fluid login-page">
//                 <input type="checkbox" id="register" aria-hidden="true" />

//                 <div class="row content-row signin">
//                     <div class="col-12 signin">
//                         <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png" className='signin-logo' />
//                         <label for="register" aria-hidden="true" className='signin-title'>Entre na LivEasy!</label>

//                         <div className='signin-subtitles'>
//                             <span> Bem-vindo(a) novamente! </span>
//                             <span> Faça o login e continue no controle </span>
//                         </div>

//                         <form className='signin-form'>
//                             <div class="form-floating data-input">
//                                 <input type="email" className="form-control signin-input" id="email" placeholder="name@example.com"
//                                     name="email" value={this.state.form.email} onChange={this.formData} />
//                                 <label for="floatingInput">Email</label>
//                             </div>

//                             <div class="form-floating data-input">
//                                 <input type="password" className="form-control signin-input" id="password" placeholder="name@example.com"
//                                     name="password" value={this.state.form.password} onChange={this.formData} />
//                                 <label for="floatingInput">Senha</label>
//                             </div>

//                             <button className='signin-bt' onClick={this.loginValidation}> Entrar </button>
//                         </form>
//                     </div>

//                     <div class="col-12 signup">
//                         <label className="signup-title" for="register" aria-hidden="true">Cadastre-se!</label>

//                         <div className='signup-subtitles'>
//                             <span> Seja bem-vindo a LivEasy! </span>
//                             <span> Vamos iniciar seu cadastro </span>
//                         </div>

//                         <form className='signup-form'>
//                             <div class="form-floating data-input">
//                                 <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
//                                     name="name" value={this.state.form.name} onChange={this.formData} />
//                                 <label for="floatingInput">Nome Completo</label>
//                             </div>

//                             <div class="form-floating data-input">
//                                 <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
//                                     name="email" value={this.state.form.email} onChange={this.formData} />
//                                 <label for="floatingInput">Email</label>
//                             </div>

//                             <div class="form-floating data-input">
//                                 <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
//                                     name="birthDate" value={this.state.form.birthDate} onChange={this.formData} />
//                                 <label for="floatingInput">Data de Nascimento</label>
//                             </div>

//                             <div class="form-floating data-input">
//                                 <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
//                                     name="phone" value={this.state.form.phone} onChange={this.formData} />
//                                 <label for="floatingInput">Telefone</label>
//                             </div>

//                             <button className='signup-bt'> Continuar </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>


//         )
//     }
// }

// export default AuthPage