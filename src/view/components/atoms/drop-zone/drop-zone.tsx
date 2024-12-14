import { DropZone as DropZoneAria, DropZoneProps } from "react-aria-components";
import styles from "./drop-zone.module.css";

export const DropZone = ({ className = '', ...props }: DropZoneProps) => (
    <DropZoneAria
        className={`${className} ${styles["drop-zone"]}`}
        {...props}
    >
        {props.children}
    </DropZoneAria>
);