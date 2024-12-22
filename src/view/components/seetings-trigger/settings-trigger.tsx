import { CircularButton } from "@components/atoms/circular-button/circular-button";
import { IconSettings } from "@tabler/icons-react";
import React, { useState } from "react";
import styles from "./settings-trigger.module.css";
import { Modal } from "@components/atoms/modal/modal";
import SettingsModal from "./settings/settings";

export const SettingsTrigger: React.FC = () => {
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