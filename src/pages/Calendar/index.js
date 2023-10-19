import React, { Component } from 'react';
import SideMenu from '../../components/sideMenu';

// import PlannerMonth from './Month';
// import Schedule from './Schedule';
import PlannerWeek from './Week';

import { BsBuildingFillAdd } from 'react-icons/bs';
import { FaRegCalendarPlus } from 'react-icons/fa'
// import { IconContext } from "react-icons";

import { Modal } from 'bootstrap';
import NewSchedule from './NewSchedule';
import { getCalendarModal } from '../../SupportFunctions';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.newScheduleClick = this.newScheduleClick.bind(this)
    }

    newScheduleClick() {
        var modalElement = document.getElementById("new-schedule")
        var bsModal = new Modal(modalElement)
        bsModal.toggle()
    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='home-page'>
                <SideMenu />

                <div className='calendar-page'>
                    <div className='page-title'>
                        <i> <BsBuildingFillAdd /> </i>
                        <h1> Meu Calendário </h1>
                    </div>
                    <span> Por aqui você verá seus itens de custos. </span>

                    {this.state.getCalendarModal ? '' :
                        <section className='calendar-section'>
                            <div className='section-title'>
                                <i> <FaRegCalendarPlus /> </i>
                                <h3> Você ainda não adicionou nada no calendário </h3>
                            </div>
                            <label> Adicione alguns itens de custo para poder visualizá-los.</label>
                            <button onClick={() => { window.location = "/coast-list" }}> Adicionar Itens de Custo </button>
                        </section>
                    }

                    <section className='col-lg-11 col-md-10 col-sm-9 content'>
                        <div className='calendar-page'>

                            <section className='calendar-header'>

                                <div className="container-fluid header-options">
                                    <div className='row'>

                                        <div className='col-6 title-col'>
                                            <h1 className='calendar-page-title'> Agenda </h1>
                                        </div>

                                        <div className='col-6 new-schedule'>
                                            <button onClick={this.newScheduleClick}>
                                                <span> <FaRegCalendarPlus color="white" /> </span>
                                                Agendar Horário
                                            </button>
                                        </div>
                                    </div>

                                    <div className='row mt-2 navbar-calendar'>
                                        <ul className="nav nav-tabs project-navbar" id="myTab" role="tablist">
                                            {/* <li className="item" role="presentation" name="month-tab">
                                                <button className="link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#month-tab" type="button" role="tab" aria-controls="home" aria-selected="true">Mês</button>
                                            </li> */}
                                            <li className="item" role="presentation" name="week-tab">
                                                <button className="link" id="week-tab-id" data-bs-toggle="tab" data-bs-target="#week-tab" type="button" role="tab" aria-controls="week" aria-selected="false">Semana</button>
                                            </li>
                                            <li className="item" role="presentation">
                                                <button className="link active" id="day-tab-id" data-bs-toggle="tab" data-bs-target="#day-tab" type="button" role="tab" aria-controls="day" aria-selected="false">Dia</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="calendar-content">
                                <div className="tab-content" id="myTabContent">
                                    {/* <div className="tab-pane fade" id="month-tab" role="tabpanel" aria-labelledby="month-tab">
                                        <PlannerMonth />
                                    </div> */}

                                    <div className="tab-pane fade" id="week-tab" role="tabpanel" aria-labelledby="week-tab">
                                        <PlannerWeek />
                                    </div>
                                    <div className="tab-pane fade show active" id="day-tab" role="tabpanel" aria-labelledby="day-tab">
                                        <h1> teste 3 </h1>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <NewSchedule/>
                    </section>
                </div>
            </div>
        )
    }
}

export default Calendar