import { CircularButton } from "@components/atoms/circular-button/circular-button";
import { IconSettings } from "@tabler/icons-react";
import React, { lazy, useState } from "react";
import styles from "./settings-button.module.css";
import { Modal } from "@components/atoms/modal/modal";
const SettingsModal = lazy(() => import('@components/settings/settings'));

export const SettingsButton: React.FC = () => {
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