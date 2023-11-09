import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import api from '../config/api';
import { BsBuildingFillAdd, BsFillCarFrontFill, BsTrashFill, BsCheckLg } from 'react-icons/bs';
import { BiSolidBed, BiSolidParty } from 'react-icons/bi';
import { FaUserCog, FaToilet, FaSwimmingPool } from 'react-icons/fa';
import { GiWashingMachine } from 'react-icons/gi';
import { MdOutdoorGrill } from 'react-icons/md';
import { LiaGrinBeamSweat } from 'react-icons/lia';
import { CgGym } from 'react-icons/cg';
import { RiBilliardsFill } from 'react-icons/ri';
import { AiFillPlusCircle } from 'react-icons/ai';
import { InvalidAlert, getIdealProperty, idealPropertieValidation } from '../SupportFunctions';


class PropertieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idealPropertyModal: true,
            confirmDelete: false
        }

        this.confirmDelete = this.confirmDelete.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    async confirmDelete() {
        this.setState({ confirmDelete: true })
        await new Promise(r => setTimeout(r, 2000));
        this.setState({ confirmDelete: false })
    }
    async deleteItem() {
        console.log(this.props.id)
        await api.delete('/property/' + this.props.id)
            .then(async (response) => {
                window.location = '/properties'
            })
            .catch((error) => {
                InvalidAlert("Erro ao deletar", "Ocorreu um erro ao excluir o imóvel!")
                console.log(error)
            })
    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='propertie-card'>
                <section className='propertie-info'>
                    <div className='propertie-title'>
                        <h3> {this.props.title} </h3>

                        {!this.state.confirmDelete ?
                            <button onClick={this.confirmDelete}>
                                <i> <BsTrashFill /> </i> <span> Excluir </span>
                            </button>
                            :
                            <button onClick={this.deleteItem}>
                                <i> <BsCheckLg /> </i> <span> Confirmar </span>
                            </button>
                        }

                    </div>
                    <div className='propertie-detail'>
                        <div className='icons'>
                            <div className='detail'>
                                <i> <BiSolidBed /> </i>
                                <span> {this.props.rooms} </span>
                            </div>

                            <div className='detail'>
                                <i> <FaToilet /> </i>
                                <span> {this.props.bathrooms} </span>
                            </div>

                            <div className='detail'>
                                <i> <BsFillCarFrontFill /> </i>
                                <span> {this.props.parkingSpaces} </span>
                            </div>

                            <div className='detail infrastructure'>

                                {this.props.infrastructure ? "Infraestrutura:" : ""}
                                {this.props.grill ? <i> <MdOutdoorGrill /> </i> : ""}
                                {this.props.party ? <i> <BiSolidParty /> </i> : ""}
                                {this.props.game ? <i> <RiBilliardsFill /> </i> : ""}
                                {this.props.gym ? <i> <CgGym /> </i> : ""}
                                {this.props.pool ? <i> <FaSwimmingPool /> </i> : ""}
                                {this.props.loundry ? <i> <GiWashingMachine /> </i> : ""}
                                {this.props.steam ? <i> <LiaGrinBeamSweat /> </i> : ""}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='propertie-value'>
                    R$ {this.props.value},00
                </section>
            </div>
        )
    }
}

export default PropertieCard