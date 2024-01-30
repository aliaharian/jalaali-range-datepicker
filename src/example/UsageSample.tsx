import { useState } from "react";
import DateRangePicker from "../components";

function UsageSample() {
  const [selectedDays, setSelectedDays] = useState<{
    from?: moment.Moment;
    to?: moment.Moment;
  }>({});
  const handleSelectDay = (date: moment.Moment) => {
    if (selectedDays.from) {
      if (selectedDays.to) {
        setSelectedDays({ from: date });
      } else {
        if (date.diff(selectedDays.from, "day") <= 0) {
          setSelectedDays({ from: date });
        } else {
          setSelectedDays({ ...selectedDays, to: date });
        }
      }
    } else {
      setSelectedDays({ from: date });
    }
  };
  return (
    <>
      <DateRangePicker
        reset={() => setSelectedDays({})}
        selectedDay={selectedDays}
        setSelectedDay={handleSelectDay}
        calendars={2}
        direction="row"
      />
    </>
  );
}

export default UsageSample;
