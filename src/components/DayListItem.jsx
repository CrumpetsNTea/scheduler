import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss'

export default function DayListItem(props) {
const formatSpots = (spots) => {
  if(spots > 1) {
    spots += " spots remaining"
  } 

  if(spots === 1) {
    spots += " spot remaining"
  }

  if(spots === 0) {
    spots = "no spots remaining"
  }
  return spots;
}

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
 });

/*  When we call the setDay action, it changes the day state. When we change the state, the <Application> renders and passes the new day to the <DayList>. 
The <DayList> renders and passes props to the <DayListItem> children causing the updates to the selected visual state.*/

  return (
    <li
    className={dayClass}
    onClick={() => props.setDay(props.name)}
    selected={props.selected}
    >
      <h2 className="text--regular" >{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}