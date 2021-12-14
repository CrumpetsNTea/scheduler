import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE"; 
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { bookInterview, cancelInterview } = props


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function saveInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
      bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true))
  }

  function deleteInterview(student, interviewer) {
    const interview = {
      student,
      interviewer
    };
    transition(DELETE, true)
    cancelInterview(props.id, interview)
    .then(() => {transition(EMPTY)})
    .catch(error => transition(ERROR_DELETE, true))
  }
  

  return (
    <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SAVING && <Status message={"Saving"} />}
    {mode === DELETE && <Status message={"Deleting"} />}
    {mode === CONFIRM && <Confirm
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onConfirm={deleteInterview}
  />}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={saveInterview} />}
    {mode === EDIT && <Form 
    interviewers={props.interviewers}
    student={props.interview.student}
    interviewer={props.interview.interviewer.id}
    onSave={saveInterview}
    onCancel={back}
    />}
    {mode === ERROR_SAVE && <Error onClose={back} />}
    {mode === ERROR_DELETE && <Error onClose={back} />}

    {mode === SHOW && (
    <Show
    id={props.id}
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onEdit={() => transition(EDIT)}
    onDelete={() => transition(CONFIRM)}
    />
)}    
    </article>

  );
}
