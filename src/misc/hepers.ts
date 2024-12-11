export const searchText = (search: string, text: string): boolean => {
  const re = new RegExp("\\w*" + search + "\\w*", "ig");
  return re.test(text);
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDateTime = new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .replace("at", "|");

  return formattedDateTime;
};

export const currentDate = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isdatePassed = (date: string | undefined): boolean => {
  if(!date)
    return false

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMin = currentDate.getMinutes();

  const year = +date.slice(0, 4);
  const month = +date.slice(5, 7);
  const day = +date.slice(8, 10);
  const hour = +date.slice(11, 13);
  const min = +date.slice(14, 16);

  if (currentYear < year) return true;

  if (currentYear > year) return false;

  if (currentMonth < month) return true;

  if (currentMonth > month) return false;

  if (currentDay < day) return true;

  if (currentDay > day) return false;

  if (currentHour < hour) return true;

  if (currentHour > hour) return false;

  if (currentMin < min) return true;

  return false;
};

export const formatAMPM = (dateString: string) => {
  const hour: number = Number(dateString.slice(11, 13));
  const min: number = Number(dateString.slice(14, 16));
  const foramtMin = min > 10 ? String(min) : `0${min}`;

  if (hour >= 12) {
    if (hour > 12) return `${hour - 12}:${foramtMin} PM`;
    else return `${hour}:${foramtMin} PM`;
  } else {
    if (hour === 0) return `12:${foramtMin} AM`;
    else return `${hour}:${foramtMin} AM`;
  }
};
