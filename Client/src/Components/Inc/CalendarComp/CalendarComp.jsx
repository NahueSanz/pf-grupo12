import { useEffect, useRef, useState } from "react"
import { Calendar } from "react-date-range"
import format from "date-fns/format"

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const CalendarComp = () => {

    //date state
    const [calendar, setCalendar] = useState('')

    // open close
    const [open, setOpen] = useState(false)

    // get the target element to toggle
    const refOne = useRef(null)

    useEffect(() => {
        //set current date on component Load
        setCalendar(format(new Date(), 'MM/dd/yyyy'))
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true);
    }, [])

    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        if(e.key === "Escape"){
            setOpen(false)
        }
    }

    const hideOnClickOutside = (e) => {
        console.log(refOne.current);
        console.log(e.target);
        if(refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    };

    //on date change, store date in state
    const handleSelect = (date) => {
        //console.log(date);
        setCalendar(format(date, 'MM/dd/yyyy'))
    }
  return (
    <div className="calendarWrap">
      <input value={calendar} readOnly className="inputBox" onClick={() => setOpen(open => !open)}/>

    <div ref={refOne}>
      {open && (
        <Calendar
          date={new Date()}
          onChange={handleSelect}
          className="calendarElement"
        />
      )}
    </div>
    </div>
  );
}

export default CalendarComp