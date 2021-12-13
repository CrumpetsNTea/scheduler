import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {

    const setDay = day => setState({ ...state, day });

    const setDays = (days) => {
      setState(prev => ({ ...prev, days }));
        }

  const [ state, setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyInterviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const parsedSchedule = dailyAppointments.map(appointment => {
  const interview = getInterview(state, appointment.interview);
  return (
  <Appointment 
  key={appointment.id}
    {...appointment} 
    interview={interview} 
    interviewers={dailyInterviewers}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
    />)
  })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };    
    const newState = {
      ...state,
      appointments
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => setState(newState))
  };

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };    
    const newState = {
      ...state,
      appointments
    };
    return axios.delete(`/api/appointments/${id}`, {interview})
    .then(() => setState(newState))
  };
  

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`
    const interviewersURL = `/api/interviewers`
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {parsedSchedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
