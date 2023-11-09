import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { InvalidAlert, SuccessAlert } from "../SupportFunctions";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState(
    JSON.parse(localStorage.getItem("calendarEvents")) || []
  );

  const fetchEvents = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.get(`https://liveasy-services.onrender.com/user/calendar/reminder/${userId}`);
      setCurrentEvents(response.data);
      localStorage.setItem("calendarEvents", JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateClick = async (arg) => {
    console.log(arg);
    const title = prompt('Enter event title:');
    console.log(title);
    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (title !== null && title !== "") {  
      const newEvent = { title, start: arg.startStr, end: arg.endStr, allDay: arg.allDay, user: userId };
      try {
        console.log('New Event:', newEvent); 
        const response = await axios.post('https://liveasy-services.onrender.com/user/calendar/reminder/add', newEvent);
        setCurrentEvents([...currentEvents, response.data]);
        console.log(response.data._id);
        localStorage.setItem("idDelete", response.data._id);
        console.log(localStorage.getItem("idDelete"));
        localStorage.setItem("calendarEvents", JSON.stringify([...currentEvents, response.data]));
      } catch (error) {
        InvalidAlert("Erro", "Ocorreu um erro ao cadastrar o evento")
      }
      SuccessAlert("Sucesso", "Evento cadastrado com sucesso");
    }
  };  

  const handleEventClick = async (eventClickInfo) => {
    const title = prompt('Edit event title:', eventClickInfo.event.title);
    if (title) {
      const updatedEvent = { ...eventClickInfo.event.toPlainObject(), title };
      try {
        // Chame a API para atualizar o evento no banco de dados
        await axios.put('https://liveasy-services.onrender.com/user/calendar/reminder', updatedEvent);
        const updatedEvents = currentEvents.map((event) =>
          event.id === eventClickInfo.event.id ? updatedEvent : event
        );
        setCurrentEvents(updatedEvents);
        localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
      } catch (error) {
        console.error('Error updating event:', error);
      }
    }
  };

  const handleEventDelete = async (eventId) => {
    const id = localStorage.getItem("idDelete");
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const idToDelete = eventId._id || eventId; // Extrai o ID do evento
        await axios.delete(`https://liveasy-services.onrender.com/user/calendar/reminder/${id}`);
        const updatedEvents = currentEvents.filter((event) => event._id !== idToDelete);
        setCurrentEvents(updatedEvents);
        localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
      } catch (error) {
        InvalidAlert("Erro", "Ocorreu um erro ao deletar o evento");
      }
      SuccessAlert("Sucesso", "Evento deletado com sucesso");
    }
  };  
  
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
    <div style={{ textAlign: 'center', color: '#219EBC' }}>
        <i style={{ fontSize: '2em' }}>
          <BiCalendar />
        </i>
        <h1>Calendário</h1>
    </div>
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor='#023047'
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5" color='white'>Eventos</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: '#219EBC',
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventDelete}
            events={currentEvents}
          />
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Calendar;
