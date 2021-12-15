import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
const [ state, setState ] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

const setDay = day => setState({ ...state, day });

//Gets all of our data from the server
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
}, [])

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };    
  return axios.put(`/api/appointments/${id}`, {interview})
  .then(() => {
    //setState with updated spots for the day that was just changed
    setState((prev) => {
      const days = updateSpots(prev, appointments);
      return {
        ...prev,
        appointments,
        days
      };
    });
  });
}


function cancelInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };    
  return axios.delete(`/api/appointments/${id}`, {interview})
    .then(() => {
      //setState with updated spots for the day that was just changed
      setState((prev) => {
        const days = updateSpots(prev, appointments);
        return {
          ...prev,
          appointments,
          days
        };
      });
    });
};

const updateSpots = (state, appointments) => {
  let spots = 0;
 
  // find the day in the days object that matches the current state.day using it's name:
  const dayObj = state.days.find((day) => day.name === state.day);
  
  //increment spots based on how many interviews are set to null
  dayObj.appointments.forEach((id) => {
    if (appointments[id].interview === null) {
      spots++;
    }
  });

  // create a new object to hold the day with the updated spots
  const newDay = { ...dayObj, spots };
  //insert that updated day into the days object given to us by the state
  const newDays = state.days.map((day) => (day.name === state.day ? newDay : day));
  //returns the array of days objects with the updated state (tested with Gary's updateSpotsTest - does not mutate state)
  return newDays;
};

return {state, setDay, bookInterview, cancelInterview}
};
