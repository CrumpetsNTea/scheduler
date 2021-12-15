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
  const newState = {
    ...state,
    appointments
  };
  return axios.put(`/api/appointments/${id}`, {interview})
  .then(() => updateSpots(newState, id))
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
  .then(() => updateSpots(newState, id))
  
};


function updateSpots(passedInState, id) {
  let spots = 0;
  //returns an array containing the day object that has the appointment
  const day = passedInState.days.filter((element) =>
    element.appointments.includes(id)
  );

  //extracts the day from within the array containing our day object as the result of the .filter above
  //as spreading the day without doing this it was causing almighty errors in the application
  //upon setting the state with it, as it was effectively trying to set 
  //the day to an array containing an object
  const dayNoArray = day[0];

  //increments spots depending on how many appointments with null interviews there are
  for (const appointmentId of dayNoArray.appointments) {
    if (passedInState.appointments[appointmentId].interview === null) {
      spots++;  
      }
  }

  //spreads our new day with the updated spots into a variable
  const updatedDayWithSpots = { ...dayNoArray, spots };

  //grabs the index of the day that we are updating the spots of
  const indexOfDay = passedInState.days.findIndex(day => day.name === dayNoArray.name)
   
  //assigns our new day with the updated spots to the corresponding position in the passedInState array of days
  passedInState.days[indexOfDay] = updatedDayWithSpots;
  
  //then we set the state with our new passedInState, which now contains our updated spot count for the given day
  //We then call this entire function when we want to set the state after
  //booking a new interview or deleting an interview - setting the state with the updated spots
  setState(passedInState);
};



return {state, setDay, bookInterview, cancelInterview}
};
