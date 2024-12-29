import { ModalContainer } from "@components/atoms/modal-container/modal-container";
import styles from "./settings.module.css";
import { useTranslation } from "react-i18next";
import { lazy } from "react";
const FactTypeSettings = lazy(() => import('./articles/fact-type-settings'));
const ColorsSettings = lazy(() => import('./articles/colors-settings'));
const ImageSettings = lazy(() => import('./articles/image-settings'));
const TimeFormatSettings = lazy(() => import('./articles/time-format-settings'));
const CryptocurrencySettings = lazy(() => import('./articles/cryptocurrency-settings'));

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
			{/* Credits and link to GitHub */}
		</ModalContainer>
	);
}

export default SettingsModal;