import React, { Component } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri'
import { docId, weekDay_date } from '../../../components/calendarHelpers.js';
import firebase from '../../../config/firebase.js';
import { Modal } from 'bootstrap';

class ScheduleView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousState: {},
            scheduleData: {
                customer: "",
                date: "",
                hour: "",
                serviceList: [],
            },
            serviceContent: [],
            editMode: false,
        }

        this.scheduleData = this.scheduleData.bind(this);
        this.markOffClick = this.markOffClick.bind(this);
        this.markoffSchedule = this.markoffSchedule.bind(this);
    }

    scheduleData(e) {
        let data = this.state.scheduleData
        data[e.target.name] = e.target.value;
        this.setState({ scheduleData: data });
    }

    markOffClick(e) {
        document.getElementById("markoff-button").style.display = "none"
        document.getElementById("delete-warning").style.display = "block"

        document.getElementById("markoff-cancel").addEventListener('click', () => {
            document.getElementById("markoff-button").style.display = "block"
            document.getElementById("delete-warning").style.display = "none"
        })
    }

    markoffSchedule() {
        firebase.firestore().collection("schedule")
            .doc(docId(this.props.infos.date))
            .get()
            .then((snapshot) => {
                let dayArray = snapshot.data()[weekDay_date(this.props.infos.date)]
                let newArray = dayArray.splice(this.props.infos.index, 1)

                let object = {}
                object[weekDay_date(this.props.infos.date)] = dayArray

                firebase.firestore().collection('schedule')
                    .doc(docId(this.props.infos.date))
                    .update(object)
                    .then(() => {
                        document.location.reload()
                    })
            })

    }

    render() {
        return (
            <div class="modal fade" id="schedule-view" tabindex="-1" aria-labelledby="schedule-viewLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"> Ver Atendimento </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='container-lg schedule-view-content'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className='view-input'>
                                            <label> Nome do Cliente: </label>
                                            <input type="text" id="inputCustomer" class="schedule-info-input" name="customer" value={this.props.infos.customer} onChange={this.scheduleData} disabled={!this.state.editMode} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6 mt-3'>
                                        <div className='view-input'>
                                            <label> Data: </label>
                                            <input type="text" id="inputDate" class="schedule-info-input" name="date" value={this.props.infos.date} onChange={this.scheduleData} disabled={!this.state.editMode} />
                                        </div>
                                    </div>
                                    <div className='col-6 mt-3'>
                                        <div className='view-input'>
                                            <label> Horário Agendado: </label>
                                            <input type="text" id="inputHour" class="schedule-info-input" name="hour" value={this.props.infos.hour} onChange={this.scheduleData} disabled={!this.state.editMode} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 mt-3'>
                                        <div className='service-list'>
                                            <label> Lista de Serviços: </label>
                                            {this.props.infos.servicesContent}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" id="markoff-button" class="btn action-button" onClick={this.markOffClick}>Desmarcar</button>

                            <div className='delete-warning' id='delete-warning'>
                                <div className='mb-2'>
                                    <button type="button" class="btn action-button" onClick={this.markoffSchedule}> Sim </button>
                                    <button type="button" id="markoff-cancel" class="btn action-button"> Não </button>
                                </div>

                                <span className='warning'> <RiErrorWarningLine /> Tem certeza? Essa ação não poderá ser desfeita </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ScheduleView