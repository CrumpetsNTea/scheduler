import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const parsedDayListItems = props.days.map(day => <DayListItem key={day.id}
  {...day} setDay={props.onChange} selected={day.name === props.value} />)
  return (
    <ul>
      {parsedDayListItems}
    </ul>
  );
}

/*so what this does is maps over the props.days which is an array of days
and for each element in that array it sets a key equal to the id of the day, 
destructs the id, name, and spots, and
gives it a setDAy which is equal to the props.setDay which is a function
that sets the day to whatever day was clicked. It also
gives it a selected props that calls the selected css 
if elem.name === props.day which will effectively
change the CSS when the user clicks a day. This is all entered into a DayListItem 
for each day in the days array, which
then becomes the child of the DayList which is essentially a container for the 
days */