import { useState } from "react"
export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace = false) {
    if(replace === true)  {
      setHistory(history)
    } else {
    //pushes the latest mode to the history array
    setHistory((prev) => [...prev, mode])
  }
    //sets the current mode to the latest mode
    setMode(mode);
}


function back() {
    setHistory((prev) => {
      prev.pop(); //removes the latest item leaving us with the one that we want to grab at the end of the array
      setMode(prev[prev.length - 1]) //since prev is an array, we need to return the most recent item which is found at .length - 1
      //returns the value of prev which should be an array with the history of the modes
      return prev;
    });
    
  }


return { mode, transition, back };

}