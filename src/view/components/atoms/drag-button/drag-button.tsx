
import { Button } from "../button/button";
import { ButtonProps } from "react-aria-components";
import { IconBaselineDensityMedium, IconGripVertical } from "@tabler/icons-react";
import styles from "./drag-button.module.css";

export const DragButton = ({ className = '', ...props }: ButtonProps) => (
    <Button
        slot="drag"
        type="button"
        padding="0 0.5rem 0 0"
        tooltipPlacement="start"
        tooltip="Drag to reorder"
        className={`${styles["drag-button"]} ${className}`}
        {...props}
    >
        <IconBaselineDensityMedium size={16} />
    </Button>
);