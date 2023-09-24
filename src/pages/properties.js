import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import api from '../config/api';
import { BsBuildingFillAdd } from 'react-icons/bs';


class PropertiesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    async componentDidMount() {

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
                    <span> Por aqui você pode controlar suas preferências de imóveis e seus imóveis de interesse. </span>
                    <br />
                </div>
            </div >


        )
    }
}

export default PropertiesPage