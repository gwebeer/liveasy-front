import React, { Component } from 'react';
import ServiceSelect from './ServiceSelect';
import { RiErrorWarningLine } from 'react-icons/ri'
import firebase from '../../../config/firebase.js';
import { InvalidAlert } from '../../../SupportFunctions';
import { Modal } from 'bootstrap';

const HOURS = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"]

// DAY
const REPEATERS = ["Semana(s)", "Mês(es)", "Ano(s)"]

class NewSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            hoursListOptions: [],
            serviceList: [],

            form: {
                title: "",
                date: "",
                hour: "",
                duration: ""
            }
        }

        this.newSchedule = this.newSchedule.bind(this);
        this.hoursList = this.hoursList.bind(this);
        this.formData = this.formData.bind(this);
        this.radioData = this.radioData.bind(this);
    }

    componentDidMount() {
        this.hoursList();
    }

    // Atualiza state com valores de inputs
    formData(e) {
        let form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({ form: form });
    }

    // Atualiza state com valores de inputs
    radioData(e) {
        let form = this.state.form;

        let duration;
        // eslint-disable-next-line default-case
        switch (e.target.id) {
            case '30min':
                duration = "1"
                break;
            case '1h':
                duration = "2"
                break;
            case '1h30':
                duration = "3"
                break;
            case '2h':
                duration = "4"
                break;
        }

        form['duration'] = duration;
        this.setState({ form: form }, () => { console.log(this.state.form) });
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

    newSchedule() {     
        let invalid;

        Object.keys(this.state.form).forEach( (element) => {
            if (this.state.form[element] === "") {
                invalid = true
            }  
        })

        console.log(this.state.form)

        if (invalid) {
            InvalidAlert("Campo Inválido!", "É obrigatório preencher todos os campos.")
            return
        }

        console.log("enviar para o banco de dados")
        window.location = '/calendar';
    }

    // removeReminder() {
    //     firebase.firestore().collection("CalendarTest").delete()
    // }

    render() {
        return (
            <div class="modal fade" id="new-schedule" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Adicionar Lembrete</h5>
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
                                            <input type="date" class="form-control" placeholder="Data" name="date"
                                                value={this.state.form.date} onChange={this.formData} />
                                            <label for="floatingInput">Data</label>
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <div class="form-floating">
                                            <select class="form-select" id="floatingSelect" aria-label="Horário" name="hour" value={this.state.form.hour} onChange={this.formData}>
                                                {this.state.hoursListOptions}
                                            </select>
                                            <label for="floatingSelect">Horário</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row duration-title'>
                                    <div className='col-12'>
                                        Qual a duração na sua agenda?
                                    </div>
                                </div>

                                <div className='row duration-options'>
                                    <div className='col-3'>
                                        <input class="form-check-input" type="radio" name="isCondominium" id="30min" onChange={this.radioData} />
                                        <label class="form-check-label" for="30min">
                                            30 min
                                        </label>
                                    </div>

                                    <div className='col-3'>
                                        <input class="form-check-input" type="radio" name="isCondominium" id="1h" onChange={this.radioData} />
                                        <label class="form-check-label" for="1h">
                                            1h
                                        </label>
                                    </div>

                                    <div className='col-3'>
                                        <input class="form-check-input" type="radio" name="isCondominium" id="1h30" onChange={this.radioData} />
                                        <label class="form-check-label" for="1h30">
                                            1h 30
                                        </label>
                                    </div>

                                    <div className='col-3'>
                                        <input class="form-check-input" type="radio" name="isCondominium" id="2h" onChange={this.radioData} />
                                        <label class="form-check-label" for="2h">
                                            2h
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={this.newSchedule} class="btn btn-outline-primary schedule-button">Adicionar Lembrete</button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default NewSchedule