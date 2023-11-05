import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import api from '../config/api';
import { BsBuildingFillAdd, BsFillHouseHeartFill } from 'react-icons/bs';
import { FaUserCog } from 'react-icons/fa';
import { InvalidAlert, SuccessAlert, idealPropertieValidation } from '../SupportFunctions';


class NewPropertie extends Component {
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
                infraestructure: []
            }

        }

        this.formData = this.formData.bind(this);
        this.idealPropertieRegister = this.idealPropertieRegister.bind(this);
    }

    async componentDidMount() {

    }

    async formData(e) {
        if (e.target.name === 'infraestructure') {
            let newState = this.state.idealPropertieForm

            if (e.target.checked) {
                newState['infraestructure'].push(e.target.id)
            } else {
                let index = newState['infraestructure'].indexOf(e.target.id)
                newState['infraestructure'].splice(index, 1)
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
            parkingSpaces: this.state.idealPropertieForm.parkingSpaces,
            infraestructure: this.state.idealPropertieForm.infraestructure,
            isFurnished: this.state.idealPropertieForm.isFurnished == "furnished" ? true : false,
            isCondominium: this.state.idealPropertieForm.isCondominium == "condominium" ? true : false
        }

        console.log(requestBody)
        // Registra usuário no banco de dados
        api.post('/user/property/add', requestBody)
            .then((response) => {
                SuccessAlert("Cadastro Realizado", "Preferências cadastradas! Você pode alterar elas através do meu perfil.")
                window.location = 'http://localhost:3000/properties'
            })
            .catch((error) => {
                InvalidAlert("Preenchimento Inválido!", error.response.data.error)
            })
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
                        <h1> Cadastro de Imóvel </h1>
                    </div>
                    <p className='page-description'> Cadastre as informações do imóvel que você gostou. </p>

                    <form>
                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 1. </label> O imóvel está para compra ou aluguel?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isForRent" id="rent" onChange={this.formData} />
                                    <label class="form-check-label" for="rent">
                                        Aluguel
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isForRent" id="buy" onChange={this.formData} />
                                    <label class="form-check-label" for="buy">
                                        Compra
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 2. </label> Selecione o tipo do imóvel:
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
                                <label> 3. </label> O imóvel está situado em um condomínio?
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
                                <label> 4. </label> Marque as estruturas que o condomínio oferece:
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="grill" onChange={this.formData} />
                                    <label class="form-check-label" for="grill">
                                        Churrasqueira
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="party-room" onChange={this.formData} />
                                    <label class="form-check-label" for="party-room">
                                        Salão de Festas
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="playroom" onChange={this.formData} />
                                    <label class="form-check-label" for="playroom">
                                        Salão de Jogos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="gym" onChange={this.formData} />
                                    <label class="form-check-label" for="gym">
                                        Academia
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="pool" onChange={this.formData} />
                                    <label class="form-check-label" for="pool">
                                        Piscina
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="laundry" onChange={this.formData} />
                                    <label class="form-check-label" for="laundry">
                                        Lavanderia Compartilhada
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="steam-room" onChange={this.formData} />
                                    <label class="form-check-label" for="steam-room">
                                        Sauna
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 5. </label> Quantos quartos possui o imóvel?
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
                                <label> 6. </label> Quantos banheiros possuem o imóvel?
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
                                <label> 7. </label> Quantas vagas de garagem o imóvel possui?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="parkingSpaces" id="no-vehicle" onChange={this.formData} />
                                    <label class="form-check-label" for="no-vehicle">
                                        Não possui vagas
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="parkingSpaces" id="one-vehicle" onChange={this.formData} />
                                    <label class="form-check-label" for="one-vehicle">
                                        1 vaga
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="parkingSpaces" id="more-vehicles" onChange={this.formData} />
                                    <label class="form-check-label" for="more-vehicles">
                                        + que 1 vaga
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 8. </label> O imóvel está mobiliado?
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

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 9. </label> O imóvel possui alguma dessas mobílias?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="grill" onChange={this.formData} />
                                    <label class="form-check-label" for="grill">
                                        Sofá
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="party-room" onChange={this.formData} />
                                    <label class="form-check-label" for="party-room">
                                        Geladeira
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="playroom" onChange={this.formData} />
                                    <label class="form-check-label" for="playroom">
                                        Fogão
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

export default NewPropertie