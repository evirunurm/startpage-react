import { transformDateToString } from "@utils/utils";
import { useEffect, useState } from "react";
import styles from "./current-date.module.css";

export const CurrentDate: React.FC = () => {
  const getCurrentDate = () => transformDateToString(new Date());

  const [date, setDate] = useState<string>(getCurrentDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(getCurrentDate());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <h1 className={styles["current-date"]}>{date}</h1>;
};