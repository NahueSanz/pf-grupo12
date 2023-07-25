import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";

import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

async function hola(email) {
  let dato = await fetch("http://localhost:3001/public/property/" + email);
  return await dato.json();
}

const DateRangePickerComp = () => {
  //date state
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  });
  const [responseData, setResponseData] = useState(null);
  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    let local = localStorage;
    let det = local.getItem("email");
    //console.log(det);
    hola(det)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // Add an empty dependency array to run this effect only once on mount

  useEffect(() => {
    //set current date on component Load
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const handleDateChange = (item) => {
    setSelectedDates(item.selection);
  };

  const handleFetchData = async () => {
    const email = localStorage.getItem("email");

    try {
      const response = await hola(email);
      setResponseData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="calendarWrap">
      <input
        value={`${format(
          selectedDates?.startDate || new Date(),
          "dd/MM/yyyy"
        )} to ${format(
          selectedDates?.endDate || addDays(new Date(), 7),
          "dd/MM/yyyy"
        )}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRangePicker
            onChange={handleDateChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={[selectedDates]}
            months={2}
            direction="vertical"
            className="calendarElement"
          />
        )}
      </div>
      <button onClick={handleFetchData}>Fetch Data</button>

      {/* Display the response data */}
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DateRangePickerComp;
