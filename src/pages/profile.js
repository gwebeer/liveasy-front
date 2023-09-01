import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import { FaUserCircle, FaTruckMoving } from 'react-icons/fa';
import { BsFillPersonVcardFill } from 'react-icons/bs';



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "",
                birthDate: "",
                phone: "",
                email: "",
            }
        }

    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='home-page'>
                <SideMenu />

                <div className='profile-page'>
                    <div className='page-title'>
                        <i> <FaUserCircle /> </i>
                        <h1> Minha Conta </h1>
                    </div>
                    <span> Visualize ou altere as suas informações pessoais, de mudança e de acesso. </span>

                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-personal-tab" data-bs-toggle="tab" data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal" aria-selected="true">
                                Informações Pessoais
                            </button>

                            <button class="nav-link" id="nav-moving-tab" data-bs-toggle="tab" data-bs-target="#nav-moving" type="button" role="tab" aria-controls="nav-moving" aria-selected="false">
                                Informações de Mudança
                            </button>

                            <button class="nav-link" id="nav-access-tab" data-bs-toggle="tab" data-bs-target="#nav-access" type="button" role="tab" aria-controls="nav-access" aria-selected="false">
                                Acesso
                            </button>

                            <button class="nav-link" id="nav-properties-tab" data-bs-toggle="tab" data-bs-target="#nav-properties" type="button" role="tab" aria-controls="nav-properties" aria-selected="false">
                                Preferência de Imóveis
                            </button>
                        </div>
                    </nav>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
                            1
                        </div>

                        <div class="tab-pane fade" id="nav-moving" role="tabpanel" aria-labelledby="nav-moving-tab">
                            2
                        </div>
                        <div class="tab-pane fade" id="nav-access" role="tabpanel" aria-labelledby="nav-access-tab">
                            3
                        </div>
                        <div class="tab-pane fade" id="nav-properties" role="tabpanel" aria-labelledby="nav-properties-tab">
                            4
                        </div>
                    </div>

                    
                </div>
            </div>


        )
    }
}

export default Profile