import React, { Component } from 'react';
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { FaCalendarAlt } from 'react-icons/fa';
import SideMenu from '../components/sideMenu';
import api from '../config/api';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				user: localStorage.getItem("userId"),
				title: "",
				start: this.startStr,
				end: this.endStr,
				allDay: this.allDay,
			}
		}

		this.list = []

		this.fetchEvents = this.fetchEvents.bind(this);
		this.handleDateClick = this.handleDateClick.bind(this);
		this.handleEventClick = this.handleEventClick.bind(this);
	}

	async componentDidMount() {
		this.fetchEvents();
	}

	async fetchEvents() {
		try {
			let testeaqui = [{"user":"6502fd0ea8069442130bb803","title":"teste weber","start":"2023-11-06","end":"2023-11-07","allDay":true,"_id":"65481c046a5870e6605e6254","createdAt":"2023-11-05T22:49:40.945Z","updatedAt":"2023-11-05T22:49:40.945Z","__v":0}, {"user":"6502fd0ea8069442130bb803","title":"teste weber 2222","start":"2023-11-06","end":"2023-11-07","allDay":true,"_id":"65481c046a5870e6605e6254","createdAt":"2023-11-05T22:49:40.945Z","updatedAt":"2023-11-05T22:49:40.945Z","__v":0}]
			localStorage.setItem('calendarEvents', JSON.stringify(testeaqui));
			// const response = await api.get('user/calendar/reminder/' + localStorage.getItem("userId"));
			// this.list = response.data
			// console.log(response.data);
			// // console.log(localStorage.getItem("calendarEvents"));
			// localStorage.setItem('calendarEvents', JSON.stringify(response.data));
			// this.setState = localStorage.getItem("calendarEvents");
		} catch (error) {
			console.error('Error fetching events:', error);
		}
  	};

	async handleDateClick(selected) {
		const title = prompt('Please enter a new title for your event');
		const calendarApi = selected.view.calendar;
		calendarApi.unselect();

		if (title) {
			try {
				const response = await api.post('user/calendar/reminder/add/', {
					user: localStorage.getItem("userId"),
					title,
					start: selected.startStr,
					end: selected.endStr,
					allDay: selected.allDay,
				});

				const newEvent = {
					id: response.data.id,
					user: localStorage.getItem("userId"),
					title,
					start: selected.startStr,
					end: selected.endStr,
					allDay: selected.allDay,
				};

				calendarApi.addEvent(newEvent);

				// const updatedEvents = [...this.state.form, newEvent];
				// this.setState({ form: updatedEvents });
				localStorage.setItem('calendarEvents', JSON.stringify(response.data));
				console.log(JSON.stringify(response.data))
				
			} catch (error) {
				console.error('Error adding event:', error);
			}
		}
	};

	async handleEventClick(selected) {
		if (
			window.confirm(
				`Are you sure you want to delete the event '${selected.event.title}'`
			)
		) {
			try {
				await api.delete(`user/calendar/reminder/${selected.event.id}`);
				selected.event.remove();

				const updatedEvents = this.state.form.filter(
					(event) => event.id !== selected.event.id
				);

				this.setState({ form: updatedEvents });
				localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
			} catch (error) {
				console.error('Error deleting event:', error);
			}
		}
	};

	render() {
		return (
			<div className='home-page'>
                <SideMenu />

                <div className='calendar-page'>
                    <div className='page-title'>
                        <i> <FaCalendarAlt /> </i>
                        <h1> Meu Calendário </h1>
                    </div>
                    <span> Visualize ou adicione lembretes no seu calendário pessoal. </span>

					<Box m="20px">
						<Box display="flex" justifyContent="space-between">
						<Box flex="1 1 20%" backgroundColor="#8ECAE6" p="15px" borderRadius="4px">
							<h3>Eventos</h3>
							<List>
							{this.list.map((form) => (
								<ListItem
								key={form.id}
								sx={{
									backgroundColor: '#219EBC',
									margin: '10px 0',
									borderRadius: '2px',
								}}
								>
								<ListItemText
									primary={form.title}
									secondary={
									<Typography>
										{formatDate(this.state.form.start, {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})}
									</Typography>
									}
								/>
								</ListItem>
							))}
							</List>
						</Box>

						<Box flex="1 1 100%" ml="15px">
							<FullCalendar
							height="75vh"
							plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
							headerToolbar={{
								left: 'prev,next today',
								center: 'title',
								right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
							}}
							initialView="dayGridMonth"
							editable={true}
							selectable={true}
							selectMirror={true}
							dayMaxEvents={true}
							select={this.handleDateClick}
							eventClick={this.handleEventClick}
							// eventsSet={(events) => this.setState({ form: events })}
							/>
						</Box>
						</Box>
					</Box>
				</div>
			</div>
		);
	}
}

export default Calendar;