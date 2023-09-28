import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import api from '../config/api';
import { BsBuildingFillAdd, BsFillHouseHeartFill } from 'react-icons/bs';
import { FaUserCog } from 'react-icons/fa';
import { InvalidAlert, idealPropertieValidation } from '../SupportFunctions';


class IdealPropertie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idealPropertieForm: {
                id: localStorage.getItem('userId'),
                isForRent: "",
                propertyType: "",
                isCondominium: "",
                rooms: "",
                bathrooms: "",
                parkingSpaces: "",
                isFurnished: "",
                infrastructure: []
            }

        }

        this.formData = this.formData.bind(this);
        this.idealPropertieRegister = this.idealPropertieRegister.bind(this);
    }

    async componentDidMount() {

    }

    async formData(e) {
        if (e.target.name === 'infrastructure') {
            let newState = this.state.idealPropertieForm

            if (e.target.checked) {
                newState['infrastructure'].push(e.target.id)
            } else {
                let index = newState['infrastructure'].indexOf(e.target.id)
                newState['infrastructure'].splice(index, 1)
            }
            this.setState({ idealPropertieForm: newState })
            return
        }

        let newState = this.state.idealPropertieForm
        newState[e.target.name] = e.target.id
        this.setState({ idealPropertieForm: newState })
    }
    async idealPropertieRegister(e) {
        e.preventDefault();

        let fieldValidation = await idealPropertieValidation(this.state.idealPropertieForm)

        if (fieldValidation.length > 0) {
            InvalidAlert("Preenchimento Inválido!", "Você não respondeu a pergunta " + fieldValidation[0] + ".")
            return
        }

        let requestBody = {
            user: this.state.idealPropertieForm.id,
            isForRent: this.state.idealPropertieForm.isForRent == "rent" ? true : false,
            propertyType: this.state.idealPropertieForm.propertyType,
            rooms: this.state.idealPropertieForm.rooms,
            bathrooms: this.state.idealPropertieForm.bathrooms,
            parkingSpace: this.state.idealPropertieForm.parkingSpaces,
            infrastructure: this.state.idealPropertieForm.infrastructure,
            furnished: this.state.idealPropertieForm.isFurnished == "furnished" ? true : false,
            isCondominium: this.state.idealPropertieForm.isCondominium == "condominium" ? true : false
        }

        console.log(requestBody)
        // Registra usuário no banco de dados
        let userRegister = (await api.post('/user/property/add', requestBody))

        console.log(userRegister)
    }


    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='home-page'>
                <SideMenu />

                <div className='ideal-properties-page'>
                    <div className='page-title'>
                        <i> <BsFillHouseHeartFill /> </i>
                        <h1> Seu imóvel ideal </h1>
                    </div>
                    <p className='page-description'> Nos ajude a entender seu gosto e necessidade. Com base nisso vamos te dizer quais as melhores oportunidades. </p>
                    <p className='page-description'> Você poderá alterar essas informações a qualquer momento na aba "Minha Conta" </p>

                    <form>
                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 1. </label> Você busca um imóvel para compra ou aluguel?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isForRent" id="rent" onChange={this.formData} />
                                    <label class="form-check-label" for="rent">
                                        Alugar
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isForRent" id="buy" onChange={this.formData} />
                                    <label class="form-check-label" for="buy">
                                        Comprar
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 2. </label> Qual tipo de imóvel você prefere?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="propertyType" id="apartament" onChange={this.formData} />
                                    <label class="form-check-label" for="apartament">
                                        Apartamento
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="propertyType" id="house" onChange={this.formData} />
                                    <label class="form-check-label" for="house">
                                        Casa
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="propertyType" id="loft" onChange={this.formData} />
                                    <label class="form-check-label" for="loft">
                                        Sobrado
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 3. </label> Você deseja morar em condomínio?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isCondominium" id="condominium" onChange={this.formData} />
                                    <label class="form-check-label" for="condominium">
                                        Sim
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isCondominium" id="street" onChange={this.formData} />
                                    <label class="form-check-label" for="street">
                                        Não
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 4. </label> Marque as estruturas que gostaria que o condomínio oferecesse:
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infrastructure" id="grill" onChange={this.formData} />
                                    <label class="form-check-label" for="grill">
                                        Churrasqueira
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infrastructure" id="party-room" onChange={this.formData} />
                                    <label class="form-check-label" for="party-room">
                                        Salão de Festas
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infrastructure" id="playroom" onChange={this.formData} />
                                    <label class="form-check-label" for="playroom">
                                        Salão de Jogos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infrastructure" id="gym" onChange={this.formData} />
                                    <label class="form-check-label" for="gym">
                                        Academia
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infrastructure" id="pool" onChange={this.formData} />
                                    <label class="form-check-label" for="pool">
                                        Piscina
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infrastructure" id="laundry" onChange={this.formData} />
                                    <label class="form-check-label" for="laundry">
                                        Lavanderia Compartilhada
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infrastructure" id="steam-room" onChange={this.formData} />
                                    <label class="form-check-label" for="steam-room">
                                        Sauna
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 5. </label> Quantos quartos precisam ter?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="rooms" id="one-room" onChange={this.formData} />
                                    <label class="form-check-label" for="one-room">
                                        1 quarto
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="rooms" id="two-rooms" onChange={this.formData} />
                                    <label class="form-check-label" for="two-rooms">
                                        2 quartos
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="rooms" id="more-rooms" onChange={this.formData} />
                                    <label class="form-check-label" for="more-rooms">
                                        3 ou + quartos
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 6. </label> Quantos banheiros precisam ter?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="bathrooms" id="one-bathroom" onChange={this.formData} />
                                    <label class="form-check-label" for="one-bathroom">
                                        1 banheiro
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="bathrooms" id="two-bathrooms" onChange={this.formData} />
                                    <label class="form-check-label" for="two-bathrooms">
                                        2 banheiros
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="bathrooms" id="more-bathrooms" onChange={this.formData} />
                                    <label class="form-check-label" for="more-bathrooms">
                                        3 ou + banheiros
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 7. </label> Você tem algum veículo?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="parkingSpaces" id="no-vehicle" onChange={this.formData} />
                                    <label class="form-check-label" for="no-vehicle">
                                        Não tenho veículos
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="parkingSpaces" id="one-vehicle" onChange={this.formData} />
                                    <label class="form-check-label" for="one-vehicle">
                                        1 veículo
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="parkingSpaces" id="more-vehicles" onChange={this.formData} />
                                    <label class="form-check-label" for="more-vehicles">
                                        + que 1 veículo
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 8. </label> Precisa que o imóvel esteja mobiliado?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="furnished" id="furnished" onChange={this.formData} />
                                    <label class="form-check-label" for="furnished">
                                        Sim
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="furnished" id="empty" onChange={this.formData} />
                                    <label class="form-check-label" for="empty">
                                        Não
                                    </label>
                                </div>

                            </div>
                        </div>

                        <button onClick={this.idealPropertieRegister}> Enviar respostas </button>
                    </form>

                </div>
            </div >


        )
    }
}

export default IdealPropertie