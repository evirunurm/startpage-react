import { CircularButton } from "@components/atoms/circular-button/circular-button";
import { IconSettings } from "@tabler/icons-react";
import React, { useState } from "react";
import styles from "./settings-trigger.module.css";
import { Modal } from "@components/atoms/modal/modal";
import SettingsModal from "./settings/settings";
import { useTranslation } from "react-i18next";

export const SettingsTrigger: React.FC = () => {
	const { t } = useTranslation();
	const [isOpen, setOpen] = useState(false);

	const handleButtonPress = () => {
		setOpen(true);
	}

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
	}

	return (
		<>
			<CircularButton
				className={styles['settings-button']}
				onPress={handleButtonPress}
				tooltip={t("common.settings")}
				tooltipPlacement="start"
			>
				<IconSettings size={28} />
			</CircularButton>
			<Modal
				isOpen={isOpen}
				isDismissable
				onOpenChange={handleOpenChange}
			>
				<SettingsModal />
			</Modal>
		</>

	);
}