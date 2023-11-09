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
            propertieForm: {
                user: localStorage.getItem('userId'),
                isForRent: "",
                type: "",
                isCondominium: "",
                rooms: "",
                bathrooms: "",
                parkingSpaces: "",
                furnished: "empty",
                infraestructure: [],
                furniture: [],
                name: "",
                value: ""
            },
            furnish: []
        }

        this.form = this.form.bind(this);
        this.addPropertie = this.addPropertie.bind(this);
    }

    async componentDidMount() {
        let notBoughtItems = await api.get('user/list/item/not-bought/' + localStorage.getItem('processId'))

        let itemsElements = []
        Object.values(await notBoughtItems.data).forEach((item) => {
            itemsElements.push(
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="furniture" id={item.title} onChange={this.form} />
                    <label class="form-check-label" for={item.title}>
                        {item.title}
                    </label>
                </div>
            )
        })
        this.setState({ furnish: itemsElements })
    }

    async form(e) {
        let newState = this.state.propertieForm

        let field = e.target.name
        let value = e.target.id

        let furnitures = Object.values(newState.furniture)
        if (field == "furniture") {
            if (e.target.checked) {
                furnitures.push(value)
            } else {
                let index = furnitures.indexOf(value)
                furnitures.splice(index, 1)
            }
            newState.furniture = furnitures
        }

        let infraestructures = Object.values(newState.infraestructure)
        if (field == "infraestructure") {
            if (e.target.checked) {
                infraestructures.push(value)
            } else {
                let index = infraestructures.indexOf(value)
                infraestructures.splice(index, 1)
            }
            newState.infraestructure = infraestructures
        }

        if (field === "textFields") {
            newState[e.target.id] = e.target.value
        }

        if (field !== "furniture" && field !== "infraestructure" && field !== "textFields") {
            newState[field] = value
        }

        this.setState({ propertieForm: newState })
    }

    async addPropertie(e) {
        e.preventDefault();
        console.log(this.state.propertieForm)

        await api.post('/property/add', this.state.propertieForm)
            .then((response) => {
                window.location = '/properties'
            })
            .catch((error) => {
                InvalidAlert("Erro ao adicionar", "Houve um erro ao adicionar o imóvel, tente novamente!")
                console.log(error)
            })
    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='home-page'>
                <SideMenu />

                <div className='new-propertie-page'>
                    <div className='page-title'>
                        <i> <BsFillHouseHeartFill /> </i>
                        <h1> Cadastro de Imóvel </h1>
                    </div>
                    <p className='page-description'> Cadastre as informações do imóvel que você gostou. </p>

                    <form>
                        <div className="form-floating data-input">
                            <input type="text" className="form-control" id="name" placeholder="name@example.com"
                                name="textFields" value={this.state.propertieForm.name} onChange={this.form} />
                            <label htmlFor="floatingInput"> Dê um nome ao imóvel: </label>
                        </div>

                        <div className="form-floating data-input">
                            <input type="text" className="form-control" id="value" placeholder="name@example.com"
                                name="textFields" value={this.state.propertieForm.value} onChange={this.form} />
                            <label htmlFor="floatingInput"> Qual o valor do imóvel? </label>
                        </div>

                        <div className='form-question'>
                            <span className='question-title'>
                                <label> 1. </label> O imóvel está para compra ou aluguel?
                            </span>

                            <div className='choice-options'>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isForRent" id="rent" onChange={this.form} />
                                    <label class="form-check-label" for="rent">
                                        Aluguel
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isForRent" id="buy" onChange={this.form} />
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
                                    <input class="form-check-input" type="radio" name="type" id="apartament" onChange={this.form} />
                                    <label class="form-check-label" for="apartament">
                                        Apartamento
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="type" id="house" onChange={this.form} />
                                    <label class="form-check-label" for="house">
                                        Casa
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="type" id="loft" onChange={this.form} />
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
                                    <input class="form-check-input" type="radio" name="isCondominium" id="condominium" onChange={this.form} />
                                    <label class="form-check-label" for="condominium">
                                        Sim
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isCondominium" id="street" onChange={this.form} />
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
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="grill" onChange={this.form} />
                                    <label class="form-check-label" for="grill">
                                        Churrasqueira
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="party-room" onChange={this.form} />
                                    <label class="form-check-label" for="party-room">
                                        Salão de Festas
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="playroom" onChange={this.form} />
                                    <label class="form-check-label" for="playroom">
                                        Salão de Jogos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="gym" onChange={this.form} />
                                    <label class="form-check-label" for="gym">
                                        Academia
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="pool" onChange={this.form} />
                                    <label class="form-check-label" for="pool">
                                        Piscina
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="laundry" onChange={this.form} />
                                    <label class="form-check-label" for="laundry">
                                        Lavanderia Compartilhada
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="infraestructure" id="steam-room" onChange={this.form} />
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
                                    <input class="form-check-input" type="radio" name="rooms" id="one-room" onChange={this.form} />
                                    <label class="form-check-label" for="one-room">
                                        1 quarto
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="rooms" id="two-rooms" onChange={this.form} />
                                    <label class="form-check-label" for="two-rooms">
                                        2 quartos
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="rooms" id="more-rooms" onChange={this.form} />
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
                                    <input class="form-check-input" type="radio" name="bathrooms" id="one-bathroom" onChange={this.form} />
                                    <label class="form-check-label" for="one-bathroom">
                                        1 banheiro
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="bathrooms" id="two-bathrooms" onChange={this.form} />
                                    <label class="form-check-label" for="two-bathrooms">
                                        2 banheiros
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="bathrooms" id="more-bathrooms" onChange={this.form} />
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
                                    <input class="form-check-input" type="radio" name="parkingSpaces" id="no-vehicle" onChange={this.form} />
                                    <label class="form-check-label" for="no-vehicle">
                                        Não possui vagas
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="parkingSpaces" id="one-vehicle" onChange={this.form} />
                                    <label class="form-check-label" for="one-vehicle">
                                        1 vaga
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="parkingSpaces" id="more-vehicles" onChange={this.form} />
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
                                    <input class="form-check-input" type="radio" name="furnished" id="furnished" onChange={this.form} />
                                    <label class="form-check-label" for="furnished">
                                        Sim
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="furnished" id="empty" onChange={this.form} />
                                    <label class="form-check-label" for="empty">
                                        Não
                                    </label>
                                </div>

                            </div>
                        </div>

                        {this.state.propertieForm.furnished == "empty" ? '' :
                            <div className='form-question'>
                                <span className='question-title'>
                                    <label> 9. </label> O imóvel possui alguma dessas mobílias?
                                </span>

                                <div className='choice-options'>
                                    {this.state.furnish}
                                </div>
                            </div>
                        }


                        <button onClick={this.addPropertie}> Enviar respostas </button>
                    </form>

                </div>
            </div >


        )
    }
}

export default NewPropertie