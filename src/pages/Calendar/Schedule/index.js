import React, { Component } from 'react';
import { Modal } from 'bootstrap';
import firebase from '../../../config/firebase.js';
import ServiceView from '../ScheduleView/ServiceView';

class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: "80px",
            classes: 'schedule',
            content: [],
            available: true
        }

        this.componentDidMount = () => {
            var qtde = this.props.serviceQuantity
            var newHeight = 80 * parseInt(qtde)
            let heightState = String(newHeight) + "px"
            this.setState({ height: heightState })

            if (this.props.customer == "Livre") {
                this.setState({ available: false })
            }
        }

        this.shceduleViewing = this.shceduleViewing.bind(this)
        this.serviceList = this.serviceList.bind(this)
    }

    // Monta lista de serviços do atendimento
    serviceList() {
        let contentList = firebase.firestore().collection("typeServices")
        .get()
        .then( (snapshot) => {
            let lista = [];

            snapshot.forEach((doc) => {    
                lista.push({
                    name: doc.data().name,
                    price: doc.data().price,
                })
            })

            let content = []
            Array.from(this.state.scheduleData.serviceList).forEach( (service) => {
                console.log(service)
                console.log(lista[service].name)

                content.push(<ServiceView service={lista[service].name} />)
            })

            return content
        })
        .catch( (error) => {
            console.log(error)
        })
        return contentList
    }

    // Abre detalhes do atendimento
    async shceduleViewing(e) {
        let infos = {
            'customer': this.props.customer,
            'date': this.props.date,
            'hour': this.props.initialHour + " - " + this.props.finalHour,
            'services': this.props.services,
            'index': this.props.index
        }

        this.props.infos(infos)

    
        document.getElementById("delete-warning").style.display = "none"
        document.getElementById("markoff-button").style.display = "block"

        e.stopPropagation()
        var modalElement = document.getElementById("schedule-view")
        var bsModal = new Modal(modalElement)
        bsModal.toggle()
    }

    render() {

        if (this.state.available) {
            return (
                <ul className="schedule" name='available' onClick={this.shceduleViewing} style={{ height: this.state.height }}>
                    <li>
                        <p className='schedule-hour'> {this.props.initialHour} - {this.props.finalHour} </p>
                        <p className='schedule-customer'> {this.props.customer} </p>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="schedule available" style={{ height: this.state.height }}>
                    <li> </li>
                </ul>
            )
        }

    }
}

export default Schedule