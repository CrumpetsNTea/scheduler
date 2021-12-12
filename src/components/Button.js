import React from "react";
import classNames from "classnames"
import "components/Button.scss";

/* Here we are conditionally applying CSS to our buttons based on 
what props are passed to it. For instance, if props.confirm 
is truthy (meaning it is present) then the 
second argument of the classNames function which we have imported
will be button--confirm - the key is what we want to add
and the value of that key is the argument per se, meaning
if props.confirm is true then the button class
will be button button--confirm. Therefore applying the button--confrim
css*/

/* the classnames library lets us dynamically and 
conditionally add classes to our elements via the use 
of truthy and falsy values:

The classNames function takes any number of arguments which can be a string or object. 
The argument 'foo' is short for { foo: true }
If the value associated with a given key is falsy, 
that key won't be included in the output.*/

export default function Button(props) {
const buttonClass = classNames("button", {
   "button--confirm": props.confirm,
   "button--danger": props.danger
});

   return (
      <button 
      className={buttonClass} 
      onClick={props.onClick}
      disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
