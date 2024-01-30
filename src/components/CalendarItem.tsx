import ChangeMonthButton from "./ChangeMonthButton";
import moment from "moment-jalaali";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";

type Props = {
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  date: moment.Moment;
  jToday: moment.Moment;
  selectedDay: { from?: moment.Moment; to?: moment.Moment };
  setSelectedDay: (date: moment.Moment) => void;
  reset: () => void;
  hovered?: moment.Moment;
  setHovered: Dispatch<SetStateAction<moment.Moment | undefined>>;
};
const CalendarItem = ({
  reset,
  onPrevMonth,
  onNextMonth,
  date,
  jToday,
  selectedDay,
  setSelectedDay,
  hovered,
  setHovered,
}: Props) => {
  const [emptyDays, setEmptyDays] = useState(
    date.startOf("jMonth").day() > 5 ? 0 : date.startOf("jMonth").day() + 1
  );
  useEffect(() => {
    setEmptyDays(
      date.startOf("jMonth").day() > 5 ? 0 : date.startOf("jMonth").day() + 1
    );
  }, [date]);
  const isSameDate = (
    date1?: moment.Moment,
    date2?: moment.Moment,
    day?: number
  ) => {
    return (
      date1?.jYear() === date2?.jYear() &&
      date1?.jMonth() === date2?.jMonth() &&
      (day || date1?.jDate()) === date2?.jDate()
    );
  };
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        reset();
      }
    });
    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          reset();
        }
      });
    };
  }, []);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full  max-w-[336px]">
        {/* header */}
        <div className="w-full flex items-center justify-between py-2 px-4">
          <div>
            {onPrevMonth && (
              <ChangeMonthButton
                onClick={onPrevMonth}
                icon={<div> {"<"} </div>}
              />
            )}
          </div>
          <div>
            {date.format("jMMMM")} {date.jYear()}
          </div>
          <div>
            {onNextMonth && (
              <ChangeMonthButton
                onClick={onNextMonth}
                icon={<div> {">"} </div>}
              />
            )}
          </div>
        </div>
        <div className="w-full flex-col justify-center flex mt-3">
          {/* week days */}
          <div className="grid grid-cols-7 my-auto">
            {["ش", "ی", "د", "س", "چ", "پ", "ج"].map(
              (item: string, index: number) => {
                return (
                  <div
                    className="w-12 text-center text-sm text-gray-400"
                    key={index}
                  >
                    {item}
                  </div>
                );
              }
            )}
          </div>
          {/* month days */}
          <div className="grid grid-cols-7 mt-4">
            {/* find first day of month 0 is sunday!*/}
            {[...Array(emptyDays)].map((item, index) => (
              <div key={"empty" + item + index} className="w-12 h-12" />
            ))}
            {[...Array(moment.jDaysInMonth(date.jYear(), date.jMonth()))].map(
              (item, index) => {
                const day = index + 1;
                const fullDate = moment(
                  `${date.jYear()}/${date.jMonth() + 1}/${day}`,
                  "jYYYY/jM/jD"
                );
                const isPast = fullDate.diff(jToday, "day") < 0;
                return (
                  <div
                    className={clsx(
                      `w-12 text-md flex items-center justify-center h-12`,

                      (isSameDate(fullDate, selectedDay.from) ||
                        isSameDate(fullDate, selectedDay.to)) &&
                        "!bg-primary",
                      isSameDate(fullDate, selectedDay.from) && "rounded-s-xl",
                      isSameDate(fullDate, selectedDay.to) && "rounded-e-xl",
                      fullDate.diff(selectedDay.from) > 0 &&
                        fullDate.diff(selectedDay.to) < 0 &&
                        "bg-primary/20 rounded-none",
                      !selectedDay.to &&
                        selectedDay.from &&
                        fullDate.diff(hovered, "day") < 0 &&
                        fullDate.diff(selectedDay.from, "day") > 0 &&
                        "bg-primary/20",
                      fullDate.diff(hovered, "day") === 0 &&
                        fullDate.diff(selectedDay.from, "day") !== 1 &&
                        !selectedDay.to &&
                        selectedDay.from &&
                        "bg-primary/20"
                    )}
                    onMouseEnter={() => setHovered(fullDate)}
                    onMouseLeave={() => setHovered(undefined)}
                    onClick={() =>
                      !isPast &&
                      (!selectedDay.from ||
                        fullDate.diff(selectedDay.from, "day") !== 1) &&
                      setSelectedDay(fullDate)
                    }
                    key={"day" + item + index}
                  >
                    <div
                      className={clsx(
                        "cursor-pointer flex w-full h-full rounded-full items-center justify-center",
                        "hover:border hover:border-[1.5px] hover:border-gray-500",
                        isPast && "text-gray-300 cursor-default border-none",
                        // isToday && "border border-gray-300",
                        selectedDay.from &&
                          fullDate.diff(selectedDay.from, "day") === 1 &&
                          "cursor-default hover:border-none hover:text-gray-300"
                      )}
                    >
                      {day}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CalendarItem;
