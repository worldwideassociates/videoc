"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
// import "react-day-picker/lib/style.css";

interface Props {
  date: Date;
  currentYear: number;
  onChange: (date: Date) => void;
}

export const DatePicker: React.FC<Props> = ({ date, onChange }) => {
  const months: number[] = Array.from({ length: 12 }, (_, i) => ++i);
  const days: number[] = Array.from({ length: 31 }, (_, i) => ++i);

  const fromDate = new Date("1900-01-01");
  const toDate = new Date(`${new Date().getFullYear() - 18}-01-01`);
  const years = [];
  for (let i = fromDate.getFullYear(); i <= toDate.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange({
    year,
    month,
    dateNumber
  }: {
    year: number;
    month: number;
    dateNumber: number
  }) {
    onChange(new Date(year, month, dateNumber));
  };


  const monthToString = (monthNumber: number) => {
    const monthString = monthNumber == 0 ? "01" : monthNumber < 10 ? `0${monthNumber}` : monthNumber.toString();
    const date = new Date(`2023-${monthString}-01`);
    return date.toLocaleString("en-US", { month: "long" });

  };


  return (
    <>
      <div className="flex space-x-2">
        <Select
          onValueChange={(value) =>
            // Hack  minus one because the month is being set one month behind
            handleChange({ month: parseInt(value), year: date.getFullYear(), dateNumber: date.getDate() })
          }
          defaultValue={String(date.getMonth() + 1)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className="overflow-y-scroll h-[200px]">
            <SelectGroup>
              <SelectLabel>Month</SelectLabel>
              {months.map((month, i) => (
                <SelectItem value={month.toString()} key={month}>
                  {monthToString(month)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) =>
            handleChange({ year: parseInt(value), month: date.getMonth(), dateNumber: date.getDate() })
          }
          defaultValue={date.getFullYear().toString()}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent className="overflow-y-scroll h-[200px]">
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              {years.map((year, i) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Select
        onValueChange={(value) =>
          handleChange({ year: date.getFullYear(), month: date.getMonth(), dateNumber: parseInt(value) })
        }
        defaultValue={date.getDate().toString()}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent className="overflow-y-scroll h-[200px]">
          <SelectGroup>
            <SelectLabel>Date</SelectLabel>
            {days.map((day, i) => (
              <SelectItem key={day} value={day.toString()}>
                {day}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};