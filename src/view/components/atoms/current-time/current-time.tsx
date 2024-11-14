import { transformDateTo12H, transformDateTo24H } from "@utils/utils";
import { useEffect, useState } from "react";
import styles from "./current-time.module.css";

export const CurrentTime: React.FC = () => {
  const getCurrentTime = (hour24: boolean = true) => 
    hour24 ? transformDateTo24H(new Date()) : transformDateTo12H(new Date());

  const [time, setTime] = useState<string>(getCurrentTime(false));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime(false));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <h2 className={styles["current-time"]}>{time}</h2>;
};