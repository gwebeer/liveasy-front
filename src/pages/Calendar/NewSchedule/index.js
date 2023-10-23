import React, { Component } from 'react';
import ServiceSelect from './ServiceSelect';
import { RiErrorWarningLine } from 'react-icons/ri'
import firebase from '../../../config/firebase.js';

const HOURS = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"]

class NewSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            hoursListOptions: [],
            serviceList: [],

            form: {
                title: "",
                initial_date: "",
                final_date: "",
                repeat: "",
                repeatEvery: ""
            }
        }

        this.hoursList = this.hoursList.bind(this);
        this.formData = this.formData.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.serviceList = this.serviceList.bind(this);
        this.searchCustomerDatabase = this.searchCustomerDatabase.bind(this);
        this.addReminder = this.addReminder.bind(this);
    }

    componentDidMount() {
        this.hoursList();
        this.serviceList();
        this.searchCustomerDatabase();
    }

    // Atualiza state com valores de inputs
    formData(e) {
        let form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({ form: form }, this.searchCustomerDatabase() );
    }

    // Atualiza state com lista de serviços selecionados
    checkBoxChange(e) {
        console.log(e.target.name)

        var serviceList = this.state.form.services

        if (e.target.checked) {
            serviceList.push(e.target.name)
        } else {
            var index = serviceList.indexOf(e.target.name)
            serviceList.splice(index, 1)
        }

        this.setState(prevState => {
            let form = Object.assign({}, prevState.form);
            form.services = serviceList;
            return { form };
        })
        console.log(serviceList)
    }

    // Monta lista de horários para selecionar
    hoursList() {
        let hoursList = []

        hoursList.push(<option selected disabled hidden> </option>)

        for (var row = 0; row < 25; row++) {
            hoursList.push(<option value={HOURS[row]}> {HOURS[row]} </option>)
        }
        this.setState({ hoursListOptions: hoursList })
    }

    // Monta lista de serviços cadastrados
    serviceList() {
        firebase.firestore().collection("typeServices")
            .get()
            .then((snapshot) => {
                let serviceState = []
                snapshot.forEach((doc) => {
                    serviceState.push(<ServiceSelect service={doc.data().name} checkBoxChange={this.checkBoxChange} id={doc.data().id} />)
                })
                this.setState({ serviceList: serviceState })
            })
    }

    searchCustomerDatabase() {
        firebase.firestore().collection("customers")
            .where("name", ">", this.state.form.title)
            .orderBy("name", "asc")
            .get()
            .then((snapshot) => {
                let lista = []

                snapshot.forEach((doc) => {
                    if (doc.data().name.indexOf(this.state.form.title) != -1) {
                        lista.push(<option value={doc.data().name}>{doc.data().name}</option>)
                    }
                })

                console.log(lista)
                this.setState({ customerList: lista })
            })
    }

    addReminder() {
        firebase.firestore().collection("CalendarTest")
            .add(this.state.form);
    }

    render() {
        return (
            <div class="modal fade" id="new-schedule" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Agendar Atendimento</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='container-lg'>

                                <div className='row'>
                                    <div className='col customer-input'>
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" placeholder="Nome do Lembrete" name="title"
                                                value={this.state.form.title} onChange={this.formData} />   
                                            <label for="floatingInput">Nome do Lembrete</label>
                                        </div>


                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div class="form-floating mb-3">
                                            <input type="date" class="form-control" placeholder="Data" name="initial_date"
                                                value={this.state.form.date} onChange={this.formData} />
                                            <label for="floatingInput">Data de Início</label>
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <div class="form-floating mb-3">
                                            <input type="date" class="form-control" placeholder="Data" name="final_date"
                                                value={this.state.form.date} onChange={this.formData} />
                                            <label for="floatingInput">Data de Fim</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>
                                        <div key={this.state.form.repeat} class="form-floating">
                                            <label for="floatingSelect">Deve repetir?</label>
                                            <input type="radio" name={this.state.form.repeat} value={false}/> Sim
                                            <input type="radio" name={this.state.form.repeat} value={false}/> Não
                                        </div>
                                    </div>

                                    <div className='col-4'>
                                        <div class="form-floating">
                                        <select class="form-select" id="floatingSelect" aria-label="Horário" name="hour" value={this.state.form.repeatEvery} onChange={this.formData}>
                                                {this.state.hoursListOptions}
                                            </select>
                                            <label for="floatingSelect">Repetir por...</label>
                                        </div>
                                    </div>

                                    <div className='col-4'>
                                        <div class="form-floating">
                                            <select class="form-select" id="floatingSelect" aria-label="Horário" name="hour" value={this.state.form.hour} onChange={this.formData}>
                                                {this.state.hoursListOptions}
                                            </select>
                                            <label for="floatingSelect">Horário</label>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className='row schedule-warning'>
                                    <div className='col'>
                                        <span> <RiErrorWarningLine /> Este horário não está disponível! </span>
                                    </div>
                                </div> */}

                                {/* <div className='row'>
                                    <div className='col service-list-section'>
                                        <label className='service-title'> Selecione os serviços: </label> */}

                                        {/* <ServiceSelect service="Serviço 1"/>
                                        <ServiceSelect service="Serviço 2"/>
                                        <ServiceSelect service="Serviço 3"/>
                                        <ServiceSelect service="Serviço 4"/> */}
                                        {/* {this.state.serviceList} */}

                                    {/* </div>
                                </div> */}

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={this.addReminder} class="btn btn-outline-primary schedule-button">Adicionar Lembrete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewSchedule