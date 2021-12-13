export function getAppointmentsForDay(state, day) {
  const daysArray = state.days.filter(current => current.name === day)
  if (daysArray[0] === undefined){
    return [];
  }
  const appointmentsArray = daysArray[0].appointments;
  const appointmentsForDay = [];
  for (let appointment of Object.values(state.appointments)) {
    if (appointmentsArray.includes(appointment.id)) {
      appointmentsForDay.push(appointment)
    }
  }
  return appointmentsForDay
};

export function getInterviewersForDay(state, day) {
  const daysArray = state.days.filter(current => current.name === day)
  if (daysArray[0] === undefined){
    return [];
  }
  const interviewersArray = daysArray[0].interviewers;
  const interviewersForDay = [];
  for (let interviewer of Object.values(state.interviewers)) {
    if (interviewersArray.includes(interviewer.id)) {
      interviewersForDay.push(interviewer)
    }
  }
  return interviewersForDay;
};

export function getInterview(state, interview) {
  let result = null;
if (interview !== null) {
result = {};

const student = interview.student;
const interviewerId = interview.interviewer;
const interviewerName = state.interviewers[interviewerId].name;
const interviewerAvatar = state.interviewers[interviewerId].avatar;
result.student = student;
result.interviewer = { id: interviewerId, name: interviewerName, avatar: interviewerAvatar };
}
return result;
};
