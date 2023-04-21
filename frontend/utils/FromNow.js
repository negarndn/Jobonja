import moment from "moment";
import eArabic from "./eArabic";

const FromNow = (createdAt) => {
  let now = new Date();
  let then = new Date(createdAt);
  now = moment(now);
  let timeDiff = now - then;
  timeDiff = timeDiff / 1000;
  let seconds = Math.floor(timeDiff % 60);
  let secondsAsString = seconds < 10 ? "0" + seconds : seconds;
  timeDiff = Math.floor(timeDiff / 60);
  let minutes = timeDiff % 60;
  let minutesAsString = minutes < 10 ? "0" + minutes : minutes;
  timeDiff = Math.floor(timeDiff / 60);
  let hours = timeDiff % 24;
  timeDiff = Math.floor(timeDiff / 24);
  let days = timeDiff;
  if (days) return `${eArabic(days)} روز پیش`;
  else if (hours) return `${eArabic(hours)} ساعت پیش`;
  else if (minutesAsString) return `${eArabic(minutesAsString)} دقیقه پیش`;
  else return `${eArabic(secondsAsString)} ثانیه پیش`;
};

export default FromNow;
