import React, { Component } from 'react';
import firebase from '../../../config/firebase.js';
import { weekDates, columnDate, docId } from '../../../components/calendarHelpers.js';
import moment from 'moment';

import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import Schedule from '../Schedule';
import Service from '../ScheduleView/ServiceView';
import ScheduleView from '../ScheduleView';
import { FaRegCalendarPlus } from 'react-icons/fa'
import { Modal } from 'bootstrap';



const HOURS = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]

class CalendarWeek extends Component {

    constructor(props) {
        super(props);
        this.state = {
            databaseDocContent: {},
            daySchedules: [],
            columns: {
                Sunday: [],
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
            },
            selectedDate: moment(),
            scheduleInfo: {
                customer: "",
                date: "",
                hour: "",
                servicesContent: [],
                servicesId: [],
                index: "",
            },
        }

        this.componentDidMount = () => {
            this.calendarInit()
        }

        this.dayMount = this.dayMount.bind(this);
        this.databaseReturn = this.databaseReturn.bind(this);
        this.calendarInit = this.calendarInit.bind(this);
        this.calendarTitle = this.calendarTitle.bind(this);
        this.controllerButtons = this.controllerButtons.bind(this);
        // this.controllerDateInput = this.controllerDateInput.bind(this);
        this.scheduleClick = this.scheduleClick.bind(this);
        this.newScheduleClick = this.newScheduleClick.bind(this);
    }

    // Atualiza o state scheduleInfo com os dados do atendimento clicado
    async scheduleClick(infos) {
        firebase.firestore().collection("typeServices")
            .get()
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        name: doc.data().name,
                        price: doc.data().price,
                    })
                })

                let services = []
                Array.from(infos.services).forEach((service) => {
                    services.push(<Service service={lista[service].name} />)
                })

                this.setState(prevState => {
                    let scheduleInfo = Object.assign({}, prevState.scheduleInfo);
                    scheduleInfo.customer = infos.customer;
                    scheduleInfo.date = infos.date;
                    scheduleInfo.hour = infos.hour;
                    scheduleInfo.servicesId = infos.services
                    scheduleInfo.servicesContent = services;
                    scheduleInfo.index = infos.index;

                    return { scheduleInfo };
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Junta todas as colunas dos dias montadas
    async calendarInit() {
        var dataBaseValue = await this.databaseReturn("schedule", docId(moment(this.state.selectedDate).format("DD/MM/YYYY")))

        var sundayColumn = this.dayMount("Domingo", dataBaseValue.Sunday)
        var mondayColumn = this.dayMount("Segunda", dataBaseValue.Monday)
        var tuesdayColumn = this.dayMount("Terça", dataBaseValue.Tuesday)
        var wednesdayColumn = this.dayMount("Quarta", dataBaseValue.Wednesday)
        var thursdayColumn = this.dayMount("Quinta", dataBaseValue.Thursday)
        var fridayColumn = this.dayMount("Sexta", dataBaseValue.Friday)
        var saturdayColumn = this.dayMount("Sábado", dataBaseValue.Saturday)


        this.setState(prevState => {
            var columns = Object.assign({}, prevState.columns);
            columns.Sunday = sundayColumn;
            columns.Monday = mondayColumn;
            columns.Tuesday = tuesdayColumn;
            columns.Wednesday = wednesdayColumn;
            columns.Thursday = thursdayColumn;
            columns.Friday = fridayColumn;
            columns.Saturday = saturdayColumn;

            return { columns };
        })
    }

    // Retorna o array da semana do banco de dados
    async databaseReturn(collectionId, docId) {
        let snapshotData = await firebase.firestore().collection(collectionId)
            .doc(docId)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    if (Object.keys(snapshot.data()).length != 0) {
                        return snapshot.data()
                    } else {
                        return {
                            Sunday: [],
                            Monday: [],
                            Tuesday: [],
                            Wednesday: [],
                            Thursday: [],
                            Friday: [],
                            Saturday: [],
                        }
                    }
                } else {
                    return {
                        Sunday: [],
                        Monday: [],
                        Tuesday: [],
                        Wednesday: [],
                        Thursday: [],
                        Friday: [],
                        Saturday: [],
                    }
                }
            })
            .catch((error) => {
                alert("Houve um erro ao receber as informações do Banco de Dados. Tente atualizar a página e se o erro persistir, entre em contato com o desenvolvedor.")
                console.log(error)
            })

        return snapshotData
    }

    // Retorna a coluna montada do dia passado por parâmetro
    dayMount(weekday, dayContent) {
        // Array de atendimentos do dia
        let dayCalendar = dayContent

        // Variável de resultado (Armazena atendimentos marcados e livres)
        let calendarColumn = []

        // Cabeçalho (Dia da semana e do mês)
        calendarColumn.push(<label className='day'> {weekday} <br /> <span className='hours'> {columnDate(weekday, this.state.selectedDate)} </span> </label>)

        // Inicia o número de atendimentos da agenda
        var scheduleQuantity = 27

        // Loop que monta os atendimentos durante o dia
        for (var i = 0; i < scheduleQuantity; i++) {

            // Verifica se o horário respectivo do loop tem atendimento ou não
            var add = false

            // Verifica se possui algum atendimento marcado no respectivo horário
            Object.keys(dayCalendar).forEach((schedule) => {
                if (dayCalendar[schedule].hour == HOURS[i]) {

                    let scheduleInfo = {
                        'date': columnDate(weekday, this.state.selectedDate),
                        'initialHour': HOURS[i],
                        'finalHour': HOURS[i + Object.keys(dayCalendar[schedule].services).length],
                        'customer': dayCalendar[schedule].customer,
                        'services': dayCalendar[schedule].services,
                        'index': Array.from(dayCalendar).indexOf(dayCalendar[schedule])
                    }

                    calendarColumn.push(
                        <Schedule
                            date={scheduleInfo.date}
                            initialHour={scheduleInfo.initialHour}
                            finalHour={scheduleInfo.finalHour}
                            customer={scheduleInfo.customer}
                            serviceQuantity={scheduleInfo.services.length}
                            services={scheduleInfo.services}
                            available="false"
                            infos={this.scheduleClick}
                            index={scheduleInfo.index} />
                    )

                    add = true
                    i += (Object.keys(dayCalendar[schedule].services).length - 1)
                }
            })

            // Caso não tenha atendimentos marcados, adiciona um horário vazio
            if (!add) {
                calendarColumn.push(<Schedule initialHour={HOURS[i]} finalHour={HOURS[i + 1]} customer="Livre" serviceQuantity="1" />)
            }
        }

        // Retorna a coluna do dia montada
        return calendarColumn
    }

    // Retorna o primeiro e ultimo para o título da agenda
    calendarTitle() {
        let firstDay = weekDates(moment(this.state.selectedDate, "DD/MM/YYYY").format("DD/MM/YYYY")).firstDay
        let lastDay = weekDates(moment(this.state.selectedDate, "DD/MM/YYYY").format("DD/MM/YYYY")).lastDay

        return firstDay + " - " + lastDay
    }

    // Muda o state de data selecionado conforme botão do controller clicado
    controllerButtons(button) {
        switch (button) {
            case 1:
                this.setState({ selectedDate: moment(this.state.selectedDate, "DD/MM/YYYY").subtract(7, 'days') }, () => {
                    this.setState(prevState => {
                        var columns = Object.assign({}, prevState.columns);
                        columns.Sunday = []
                        columns.Monday = []
                        columns.Tuesday = []
                        columns.Wednesday = []
                        columns.Thursday = []
                        columns.Friday = []
                        columns.Saturday = []

                        return { columns };
                    })
                    this.calendarInit()
                })
                break;
            case 2:
                this.setState({ selectedDate: moment() }, () => {
                    this.setState(prevState => {
                        var columns = Object.assign({}, prevState.columns);
                        columns.Sunday = []
                        columns.Monday = []
                        columns.Tuesday = []
                        columns.Wednesday = []
                        columns.Thursday = []
                        columns.Friday = []
                        columns.Saturday = []

                        return { columns };
                    })
                    this.calendarInit()
                })
                break;
            case 3:
                this.setState({ selectedDate: moment(this.state.selectedDate, "DD/MM/YYYY").add(7, 'days') }, () => {
                    this.setState(prevState => {
                        var columns = Object.assign({}, prevState.columns);
                        columns.Sunday = []
                        columns.Monday = []
                        columns.Tuesday = []
                        columns.Wednesday = []
                        columns.Thursday = []
                        columns.Friday = []
                        columns.Saturday = []

                        return { columns };
                    })
                    this.calendarInit()
                })
                break;
        }
    }

    newScheduleClick() {
        var modalElement = document.getElementById("new-schedule")
        var bsModal = new Modal(modalElement)
        bsModal.toggle()
    }

    // // Muda o state de data selecionado quando alterado o input do controller
    // controllerDateInput(e) {
    //     let newValue = moment(e.target.value, "YYYY-MM-DD").format("DD/MM/YYYY")
    //     this.setState({ selectedDate: newValue }, () => {
    //         this.setState(prevState => {
    //             var columns = Object.assign({}, prevState.columns);
    //             columns.Sunday = []
    //             columns.Monday = []
    //             columns.Tuesday = []
    //             columns.Wednesday = []
    //             columns.Thursday = []
    //             columns.Friday = []
    //             columns.Saturday = []

    //             return { columns };
    //         })
    //         this.calendarInit()
    //     })
    // }

    render() {
        return (
            <section className='calendar-month mt-3'>
                <div className='container-lg date-controller'>

                    <div className='row month-header'>

                        <div className='col-xxl-3 col-lg-3 col-md-12 align'>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn bt-controller" onClick={() => { this.controllerButtons(1) }}> <AiOutlineLeft /> </button>
                                <button type="button" class="btn bt-controller" onClick={() => { this.controllerButtons(2) }}> Hoje </button>
                                <button type="button" class="btn bt-controller" onClick={() => { this.controllerButtons(3) }}> <AiOutlineRight /> </button>
                            </div>
                        </div>

                        <div className='col-xxl-6 col-lg-6 col-md-12 align'>
                            <h3 className='month-name'> {this.calendarTitle()} </h3>
                        </div>

                        <div className='col-xxl-3 col-lg-3 new-schedule'>
                            <button onClick={this.newScheduleClick} className='new-schedule-button'>
                                <span> <FaRegCalendarPlus color="white" /> </span>
                                Agendar Horário
                            </button>
                        </div>
                    </div>
                </div>

                <div className='calendar mt-4'>
                    <ul className='timeline-row'>
                        <li><span>08:00</span></li>
                        <li><span>08:30</span></li>
                        <li><span>09:00</span></li>
                        <li><span>09:30</span></li>
                        <li><span>10:00</span></li>
                        <li><span>10:30</span></li>
                        <li><span>11:00</span></li>
                        <li><span>11:30</span></li>
                        <li><span>12:00</span></li>
                        <li><span>12:30</span></li>
                        <li><span>13:00</span></li>
                        <li><span>13:30</span></li>
                        <li><span>14:00</span></li>
                        <li><span>14:30</span></li>
                        <li><span>15:00</span></li>
                        <li><span>15:30</span></li>
                        <li><span>16:00</span></li>
                        <li><span>16:30</span></li>
                        <li><span>17:00</span></li>
                        <li><span>17:30</span></li>
                        <li><span>18:00</span></li>
                        <li><span>17:30</span></li>
                        <li><span>18:00</span></li>
                        <li><span>18:30</span></li>
                        <li><span>19:00</span></li>
                        <li><span>19:30</span></li>
                        <li><span>20:00</span></li>
                    </ul>

                    <div className='day-column'>
                        {this.state.columns.Sunday}
                    </div>

                    <div className='day-column'>
                        {this.state.columns.Monday}
                    </div>

                    <div className='day-column'>
                        {this.state.columns.Tuesday}
                    </div>

                    <div className='day-column'>
                        {this.state.columns.Wednesday}
                    </div>

                    <div className='day-column'>
                        {this.state.columns.Thursday}
                    </div>

                    <div className='day-column'>
                        {this.state.columns.Friday}
                    </div>

                    <div className='day-column'>
                        {this.state.columns.Saturday}
                    </div>

                </div >
                {/* {this.state.scheduleInfo} */}
                <ScheduleView infos={this.state.scheduleInfo} />
            </section >
        )
    }
}

export default CalendarWeek