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
  //call updateSpots which will set the state for us with the correct number of spots available
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
    //call updateSpots which will set the state for us with the correct number of spots available
  .then(() => updateSpots(newState, id))
  
};

function getSpotsForDay(newDay, appointments) {
  let spots = 0;
  //increments spots depending on how many appointments with null interviews there are
  newDay.appointments.forEach((id) => {if (appointments[id].interview === null) {
    spots++
  }});
  return spots;
}


function updateSpots(newState, id) {
  //returns an array containing the day object that has the appointment
  const day = newState.days.filter((element) =>
    element.appointments.includes(id)
  );

  //extracts the day from within the array containing our day object as the result of the .filter above
  //as spreading the day without doing this it was causing almighty errors in the application
  //upon setting the state with it, as it was effectively trying to set 
  //the day to an array containing an object
  const dayNoArray = day[0];

  const spots = getSpotsForDay(dayNoArray, newState.appointments);

  //spreads our new day with the updated spots into a variable
  const updatedDayWithSpots = { ...dayNoArray, spots };

  //grabs the index of the day that we are updating the spots of
  const indexOfDay = newState.days.findIndex(day => day.name === dayNoArray.name)
   
  //assigns our new day with the updated spots to the corresponding position in the passedInState array of days
  newState.days[indexOfDay] = updatedDayWithSpots;
  
  //then we set the state with our new passedInState, which now contains our updated spot count for the given day
  //We then call this entire function when we want to set the state after
  //booking a new interview or deleting an interview - setting the state with the updated spots
  setState(newState);
};



return {state, setDay, bookInterview, cancelInterview}
};
