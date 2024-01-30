import { useEffect, useState } from "react";
import CalendarItem from "./CalendarItem";
import moment from "moment-jalaali";
import clsx from "clsx";
moment.loadPersian({ dialect: "persian-modern" });
type Props = {
  selectedDay: { from?: moment.Moment; to?: moment.Moment };
  setSelectedDay: (date: moment.Moment) => void;
  reset: () => void;
  calendars?: 1 | 2;
  direction?: "row" | "column";
};
const DateRangePicker = ({
  selectedDay,
  setSelectedDay,
  reset,
  calendars = 2,
  direction = "row",
}: Props) => {
  const now = new Date();
  const jToday = moment(now);
  const [hovered, setHovered] = useState<moment.Moment>();
  const [date, setDate] = useState<moment.Moment>(moment(now));
  const [nextMonthDate, setNextMonth] = useState<moment.Moment>(
    moment(now).add(1, "jMonth")
  );
  useEffect(() => {
    setNextMonth(moment(date).add(1, "jMonth"));
  }, [date]);
  const handleNextMonth = () => {
    setDate(moment(date).add(1, "jMonth"));
  };
  const handlePrevMonth = () => {
    setDate(moment(date).subtract(1, "jMonth"));
  };

  return (
    <div
      className={clsx(
        "w-full grid p-4",
        direction === "row" ? "grid-cols-2" : "grid-cols-1"
      )}
    >
      <CalendarItem
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        onPrevMonth={handlePrevMonth}
        onNextMonth={
          calendars === 1 || direction === "column"
            ? handleNextMonth
            : undefined
        }
        date={date}
        jToday={jToday}
        reset={reset}
        hovered={hovered}
        setHovered={setHovered}
      />
      {calendars === 2 && (
        <CalendarItem
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          onNextMonth={direction === "row" ? handleNextMonth : undefined}
          date={nextMonthDate}
          jToday={jToday}
          reset={reset}
          hovered={hovered}
          setHovered={setHovered}
        />
      )}
    </div>
  );
};
export default DateRangePicker;
