import React, { Component } from 'react';
import { SuccessAlert } from '../SupportFunctions';
import api from '../config/api';
import ItemList from '../components/itemList';
import { MdSpaceDashboard } from 'react-icons/md';
import { GiTwoCoins } from 'react-icons/gi';
import { TbDoorExit } from 'react-icons/tb';
import { BsBuildingFillAdd, BsUiChecks, BsCalendar2WeekFill } from 'react-icons/bs';
import { FaTools, FaUserCircle, FaClipboardList } from 'react-icons/fa';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='home-page'>
                <div className='side-menu'>
                    <div className='logo-section'>
                        <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' />
                        <span> LivEasy </span>
                    </div>

                    <ul className='menu-options'>
                        <li className='option'>
                            <i> <MdSpaceDashboard/> </i> 
                            Início
                        </li>

                        <li className='option'>
                            <i> <FaClipboardList/> </i> 
                            Lista de Itens
                        </li>

                        <li className='option'>
                            <i> <GiTwoCoins/> </i> 
                            Lista de Custos
                        </li>
                        
                        <li className='option'>
                            <i> <BsBuildingFillAdd/> </i> 
                            Imóveis
                        </li>

                        <li className='option'>
                            <i> <FaTools/> </i> 
                            Preparação
                        </li>

                        <li className='option'>
                            <i> <BsCalendar2WeekFill/> </i> 
                            Calendário
                        </li>

                        <li className='option'>
                            <i> <FaUserCircle/> </i> 
                            Minha Conta
                        </li>

                        <li className='option'>
                            <i> <TbDoorExit/> </i> 
                            Deslogar
                        </li>

                        {/* <li className='option'>
                            <i> <BsUiChecks/> </i> 
                            Visitas
                        </li> */}
                    </ul>

                </div>

                <div className='content-page'>
                    teste
                </div>
            </div>


        )
    }
}

export default Home