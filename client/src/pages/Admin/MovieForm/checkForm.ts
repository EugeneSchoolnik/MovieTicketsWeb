import { Movie } from "../../../components/MovieItem/movie";

type movie = Omit<Movie, "id" | "price" | "duration" | "banner"> & {
  price: string;
  duration: string;
  date: string;
  period: string;
  banner: object;
};

export type form = {
  [T in keyof movie]: {
    value: movie[T];
    error: string;
  };
};

export const errors = {
  empty: "The field can't be empty",
  outOfRange(min: number, max: number) {
    return `The value must be from ${min} to ${max}`;
  },
  emptyList: "Select at least one value",
  time: "Specify time from 09:00am to 08:00pm",
  fileExtension(arr: string[]) {
    return `Allowed file extension: ${arr.join(", ")}`;
  },
};

const checkForm = (form: form): boolean => {
  let checked = true;
  for (let i of Object.keys(form)) {
    const k = i as keyof form;
    const item = form[k];
    item.error = "";
    switch (k) {
      case "title":
        if (!item.value) item.error = errors.empty;
        break;
      case "price":
        const price = Number(item.value);
        if (price < 4 || price > 8) item.error = errors.outOfRange(4, 8);
        break;
      case "genres":
        if (!(item.value as string[]).length) item.error = errors.emptyList;
        break;
      case "storyline":
        if (!item.value) item.error = errors.empty;
        break;
      case "time":
        const [from, to] = [
          [9, 0],
          [20, 0],
        ]; // 09:00 - 20:00
        const [hours, minutes] = (item.value as string).split(":").map(i => Number(i));
        if ((from[1] > minutes && from[0] == hours) || from[0] > hours) item.error = errors.time;
        if ((to[1] < minutes && to[0] == hours) || to[0] < hours) item.error = errors.time;
        break;
      case "duration":
        const duration = Number(item.value);
        if (duration < 45 || duration > 180) item.error = errors.outOfRange(45, 180);
        break;
      case "date":
        if (!item.value) {
          item.error = "Enter the date";
          break;
        }
        const inputDate = new Date(item.value as string);
        const currentDate = new Date();
        currentDate.setHours(23, 59, 59, 999);
        if (inputDate <= currentDate) item.error = "Enter a date later than the current day";
        break;
      case "period":
        const period = Number(item.value);
        if (period < 3 || period > 7) item.error = errors.outOfRange(3, 7);
        break;
      case "banner":
        if (!item.value[0]) {
          item.error = "Pick an image";
          break;
        }
        const allowed = ["jpg", "png", "svg"];
        const extension: string = item.value[0].name.split(".").pop();
        if (!allowed.includes(extension)) item.error = errors.fileExtension(allowed);
        break;
    }
    if (item.error) checked = false;
  }

  return checked;
};

export default checkForm;
