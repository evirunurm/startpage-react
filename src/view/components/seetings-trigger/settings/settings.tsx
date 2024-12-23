import React from "react";
import { ModalContainer } from "@components/atoms/modal-container/modal-container";
import { FactTypeSettings } from "./articles/fact-type-settings/fact-type-settings";
import { ColorsSettings } from "./articles/colors-settings/colors-settings";
import { ImageSettings } from "./articles/image-settings/image-settings";
import { TimeFormatSettings } from "./articles/time-format-settings/time-format-settings";
import { CryptocurrencySettings } from "./articles/cryptocurrency-settings/cryptocurrency-settings";
import styles from "./settings.module.css";
import { useTranslation } from "react-i18next";

const SettingsModal: React.FC = () => {
	const { t } = useTranslation();

	return (
		<ModalContainer
			initialPosition="top-right"
			className={styles["settings"]}
		>
			<h2 className={styles.settings__title}>{t("common.settings")}</h2>
			<FactTypeSettings />
			<ImageSettings />
			<ColorsSettings />
			<TimeFormatSettings />
			<CryptocurrencySettings />
			{/* Credits and link to Github */}
		</ModalContainer>
	);
}

export default SettingsModal;