import React, { Component } from 'react';
import firebase from 'firebase';

import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import Schedule from '../Schedule';

const HOURS = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]

class CalendarMonth extends Component {

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

            teste: [],

            Sunday: [{
                'hour': "12:00",
                'services': [1, 2, 3, 4],
                'customer': "Guilherme Weber",
                'finished': false,
            },
            {
                'hour': "18:00",
                'services': [5, 2, 3],
                'customer': "Bruno Weber",
                'finished': false,
            },
            {
                'hour': "08:00",
                'services': [6, 2, 3, 5, 4],
                'customer': "Aldamir Weber",
                'finished': false,
            }]
        }

        this.componentDidMount = () => {
            // this.dayInit()




            this.docContentSave()

        }

        this.dayInit = this.dayInit.bind(this);
        this.databaseReturn = this.databaseReturn.bind(this);
        this.docContentSave = this.docContentSave.bind(this);
    }

    async docContentSave() {
        var dataBaseValue = await this.databaseReturn("schedule", "15-05-2022>21-05-2022")

        let sundayColumn = this.dayInit("Domingo", dataBaseValue.Sunday)
        let mondayColumn = this.dayInit("Segunda", dataBaseValue.Monday)
        let tuesdayColumn = this.dayInit("Terça", dataBaseValue.Tuesday)
        let wednesdayColumn = this.dayInit("Quarta", dataBaseValue.Wednesday)
        let thursdayColumn = this.dayInit("Quinta", dataBaseValue.Thursday)
        let fridayColumn = this.dayInit("Sexta", dataBaseValue.Friday)
        let saturdayColumn = this.dayInit("Sábado", dataBaseValue.Saturday)
        
        this.setState({teste: mondayColumn})

        this.setState(prevState => {
            let columns = Object.assign({}, prevState.columns);
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

    async databaseReturn(collectionId, docId) {
        let snapshotData = await firebase.firestore().collection(collectionId)
            .doc(docId)
            .get()
            .then((snapshot) => {
                return snapshot.data()
            })

        return snapshotData
    }

    dayInit(weekday, dayContent) {
        // Simula array do dia
        let dayCalendar = dayContent

        // Simula o state de resultado
        let calendarColumn = []

        calendarColumn.push(<label className='day'> {weekday} </label>)

        var scheduleQuantity = 27
        for (var i = 0; i < scheduleQuantity; i++) {
            // console.log(HOURS[i])

            var add = false

            Object.keys(dayCalendar).forEach((schedule) => {

                if (dayCalendar[schedule].hour == HOURS[i]) {

                    calendarColumn.push(<Schedule initialHour={HOURS[i]} finalHour={HOURS[i + Object.keys(dayCalendar[schedule].services).length]}
                        customer={dayCalendar[schedule].customer} serviceQuantity={Object.keys(dayCalendar[schedule].services).length} available="false" />)

                    add = true
                    i += (Object.keys(dayCalendar[schedule].services).length - 1)
                }
            })

            if (!add) {
                calendarColumn.push(<Schedule initialHour={HOURS[i]} finalHour={HOURS[i + 1]} customer="Livre" serviceQuantity="1" />)
            }
        }

        return calendarColumn
    }

    render() {
        return (
            <section className='calendar-month mt-3'>
                <div className='container-lg date-controller'>
                    <div className='row'>
                        <div className='col-xxl-2 order-xxl-1 col-lg-2 order-lg-1 col-md-6 order-md-1 align'>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn bt-controller"> <AiOutlineLeft /> </button>
                                <button type="button" class="btn bt-controller"> Hoje </button>
                                <button type="button" class="btn bt-controller"> <AiOutlineRight /> </button>
                            </div>
                        </div>

                        <div className='col-xxl-8 order-xxl-2 col-lg-7 order-lg-2 col-md-12 order-md-3 align'>
                            <h3 className='month-name'> Dezembro / 2022 </h3>
                        </div>

                        {/* <div className='col-xxl-2 order-xxl-3 col-lg-3 order-lg-3 col-md-5 order-md-2'>
                            <div class="form-floating">
                                <input type="month" class="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Selecione um mês</label>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* <div className='calendar mt-4'>
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
                    
                </div > */}
            </section >
        )
    }
}

export default CalendarMonth