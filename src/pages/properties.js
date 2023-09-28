import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import api from '../config/api';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { FaUserCog } from 'react-icons/fa';
import { getIdealProperty, idealPropertieValidation } from '../SupportFunctions';


class PropertiesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idealPropertyModal: true
        }

    }

    async componentDidMount() {
        let idealPropertyRegister = await getIdealProperty(localStorage.getItem('userId'))

        if (idealPropertyRegister === "O ID não foi encontrado na base") {
            this.setState({ idealPropertyModal: false })
        }
    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='home-page'>
                <SideMenu />

                <div className='properties-page'>
                    <div className='page-title'>
                        <i> <BsBuildingFillAdd /> </i>
                        <h1> Imóveis de Interesse </h1>
                    </div>
                    <span> Por aqui vamos te ajudar a encontrar o imóvel ideal para seu gosto e necessidade. </span>

                    {this.state.idealPropertyModal ? '' :
                        <section className='ideal-properties-section'>
                            <div className='section-title'>
                                <i> <FaUserCog /> </i>
                                <h3> Ainda não sabemos o que precisa </h3>
                            </div>
                            <label> Responda algumas perguntas para conseguirmos definir o imóvel com maior compatilidade de seu gosto e necessidade. Você leva 3 minutos para preencher.</label>
                            <button onClick={() => { window.location = "/ideal-propertie" }}> Definir Minhas Preferências </button>
                        </section>
                    }

                    <section className='properties-header'>
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-personal-tab" data-bs-toggle="tab" data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal" aria-selected="true">
                                    Lista de Imóveis
                                </button>

                                <button className="nav-link" id="nav-moving-tab" data-bs-toggle="tab" data-bs-target="#nav-moving" type="button" role="tab" aria-controls="nav-moving" aria-selected="false">
                                    Detalhes do Ranking
                                </button>

                                <button className="nav-link" id="nav-access-tab" data-bs-toggle="tab" data-bs-target="#nav-access" type="button" role="tab" aria-controls="nav-access" aria-selected="false">
                                    Pesquisa Automática
                                </button>
                            </div>
                        </nav>

                    </section>





                </div>
            </div >


        )
    }
}

export default PropertiesPage