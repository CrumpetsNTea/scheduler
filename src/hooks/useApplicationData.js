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
