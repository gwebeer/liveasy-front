import React, { Component } from 'react';
import SideMenu from '../../components/sideMenu';

// import CalendarMonth from './Month';
// import Schedule from './Schedule';
import CalendarWeek from './Week';

import { BsBuildingFillAdd } from 'react-icons/bs';
import { FaRegCalendarPlus } from 'react-icons/fa'
// import { IconContext } from "react-icons";

import { Modal } from 'bootstrap';
import NewSchedule from './NewSchedule';
import { getCalendarModal } from '../../SupportFunctions';
import { BsCalendar2WeekFill } from 'react-icons/bs';


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

                    <div className='title-section'>
                        <div className='page-title'>
                            <i> <BsCalendar2WeekFill /> </i>
                            <h1> Calendário </h1>

                        </div>
                        <span> Por aqui você verá seus lembretes para não deixar nada atrasado. </span>
                    </div>


                    {/* <div className='page-title'>
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
                    } */}

                    <div className='calendar-page'>

                        <section className="calendar-content">
                            <div className="tab-content" id="myTabContent">
                                {/* <div className="tab-pane fade" id="month-tab" role="tabpanel" aria-labelledby="month-tab">
                                        <CalendarMonth />
                                    </div> */}

                                <div className="tab-pane fade show active" id="week-tab" role="tabpanel" aria-labelledby="week-tab">
                                    <CalendarWeek />
                                </div>
                                {/* <div className="tab-pane fade" id="day-tab" role="tabpanel" aria-labelledby="day-tab">
                                        <h1> teste 3 </h1>
                                    </div> */}
                            </div>
                        </section>
                    </div>
                    <NewSchedule />

                </div>
            </div>
        )
    }
}

export default Calendar