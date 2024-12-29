
import { Button } from "../button/button";
import { ButtonProps } from "react-aria-components";
import { IconBaselineDensityMedium } from "@tabler/icons-react";
import styles from "./drag-button.module.css";
import { useTranslation } from "react-i18next";

export const DragButton = ({ className = '', ...props }: ButtonProps) => {
	const { t } = useTranslation();

	return (
		<Button
			slot="drag"
			padding="0 0.5rem 0 0"
			tooltipPlacement="start"
			tooltip={t('common.drag-reorder')}
			aria-label={t('common.drag-reorder')}
			className={`${styles["drag-button"]} ${className}`}
			{...props}
		>
			<IconBaselineDensityMedium size={18} />
		</Button>
	);
};