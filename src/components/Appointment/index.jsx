import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE"; 
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { bookInterview, cancelInterview } = props


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
      bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  function deleteInterview(student, interviewer) {
    const interview = {
      student,
      interviewer
    };
    transition(DELETE)
    cancelInterview(props.id, interview)
    .then(() => {transition(EMPTY)})
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
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
    {mode === SHOW && (
    <Show
    id={props.id}
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={() => transition(CONFIRM)}
    />
)}    
    </article>

  );
}
