import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import api from '../config/api';
import { BsBuildingFillAdd, BsFillCarFrontFill } from 'react-icons/bs';
import { BiSolidBed, BiSolidParty } from 'react-icons/bi';
import { FaUserCog, FaToilet, FaSwimmingPool } from 'react-icons/fa';
import { GiWashingMachine } from 'react-icons/gi';
import { MdOutdoorGrill } from 'react-icons/md';
import { LiaGrinBeamSweat } from 'react-icons/lia';
import { CgGym } from 'react-icons/cg';
import { RiBilliardsFill } from 'react-icons/ri';
import { AiFillPlusCircle } from 'react-icons/ai';
import { getIdealProperty, idealPropertieValidation } from '../SupportFunctions';
import PropertieCard from '../components/propertieCard';


class PropertiesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idealPropertyModal: true,
            propertieElements: []
        }

    }

    async componentDidMount() {
        let idealPropertyRegister = await getIdealProperty(localStorage.getItem('userId'))

        if (idealPropertyRegister === "O ID não foi encontrado na base") {
            this.setState({ idealPropertyModal: false })
        }

        let properties = await api.get('/property/all')

        let propertieElements = []
        Object.values(properties.data).forEach((propertie) => {
            if (propertie.user !== localStorage.getItem('userId')) {
                return
            } else {
                let infos = {
                    title: propertie.name,
                    rooms: propertie.rooms == "one-room" ? "1" : propertie.rooms == "two-rooms" ? "2" : "3+",
                    bathrooms: propertie.bathrooms == "one-bathroom" ? "1" : propertie.bathrooms == "two-bathrooms" ? "2" : "3+",
                    parkingSpaces: propertie.parkingSpaces == "one-vehicle" ? "1" : propertie.parkingSpaces == "more-vehicles" ? "2+" : "0",
                    value: propertie.value,
                    infrastructure: Object.values(propertie.infraestructure).length == 0 ? false : true,
                    grill: Object.values(propertie.infraestructure).indexOf("grill") == -1 ? false : true,
                    party: Object.values(propertie.infraestructure).indexOf("party-room") == -1 ? false : true,
                    game: Object.values(propertie.infraestructure).indexOf("playroom") == -1 ? false : true,
                    gym: Object.values(propertie.infraestructure).indexOf("gym") == -1 ? false : true,
                    pool: Object.values(propertie.infraestructure).indexOf("pool") == -1 ? false : true,
                    loundry: Object.values(propertie.infraestructure).indexOf("laundry") == -1 ? false : true,
                    steam: Object.values(propertie.infraestructure).indexOf("steam-room") == -1 ? false : true,
                }

                propertieElements.push(
                    < PropertieCard
                        title={infos.title}
                        rooms={infos.rooms}
                        bathrooms={infos.bathrooms}
                        parkingSpaces={infos.parkingSpaces}
                        value={infos.value}
                        infrastructure={infos.infrastructure}
                        grill={infos.grill}
                        party={infos.party}
                        game={infos.game}
                        gym={infos.gym}
                        pool={infos.pool}
                        loundry={infos.loundry}
                        steam={infos.steam}
                    />
                )
            }
        })
        if (propertieElements.length === 0) {
            propertieElements.push(
                <label className='not-propertie'> Você ainda não tem nenhum imóvel cadastrado! </label>
            )
        }
        this.setState({ propertieElements: propertieElements })

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

                    <section className='new-propertie-section'>
                        <button onClick={() => { window.location = "/new-propertie" }}>
                            <i> <AiFillPlusCircle /> </i>
                            Novo Imóvel
                        </button>
                    </section>

                    <nav className='properties-header'>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-personal-tab" data-bs-toggle="tab" data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal" aria-selected="true">
                                Lista de Imóveis
                            </button>

                            <button className="nav-link" id="nav-moving-tab" data-bs-toggle="tab" data-bs-target="#nav-moving" type="button" role="tab" aria-controls="nav-moving" aria-selected="false">
                                Detalhes do Ranking
                            </button>
                        </div>
                    </nav>

                    <section className="tab-content" id="nav-tabContent">

                        <div className="tab-pane fade show active" id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
                            {this.state.propertieElements}
                        </div>


                        <div className="tab-pane fade" id="nav-moving" role="tabpanel" aria-labelledby="nav-moving-tab">
                            {this.state.idealPropertyModal ? '' : "Para essa funcionalidade você precisa cadastrar suas preferências!"}
                        </div>
                    </section>

                </div>
            </div >


        )
    }
}

export default PropertiesPage