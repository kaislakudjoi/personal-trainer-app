import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // month view
import timeGridPlugin from '@fullcalendar/timegrid'; // week and day views
import interactionPlugin from '@fullcalendar/interaction';
import { getTrainings } from '../api/trainingApi'; 
import dayjs from 'dayjs';

// Calendar component
export function Calendar() {
    // State to hold the events
    const [events, setEvents] = useState([]);

    // Fetch trainings from the API
    useEffect(() => {
        getTrainings().then(data => {
            const transformed = data.map(training => {
                // Parse the date using dayjs
                const startDate = dayjs(training.date);
                // Throw an error if the date is invalid
                if (!startDate.isValid()) {
                    console.error("Invalid date:", training.date);

                    return null;
                }

                return {
                    // Show the training activity and customer name if available
                    title: training.activity + (training.customer?.firstname ? ` (${training.customer.firstname} ${training.customer.lastname})` : ''),
                    start: startDate.toISOString(),
                    end: startDate.add(training.duration, 'minute').toISOString()
                };
            }).filter(Boolean); // Delete null values
            // Set the events to the state
            setEvents(transformed);
        });
    }, []);
    
    return (
        <div style={{ padding: 20 }}>
            <h1>Training Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                height={800}
            />
        </div>
    );
}
