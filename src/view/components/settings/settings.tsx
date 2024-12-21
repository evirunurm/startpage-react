import React from "react";
import { ModalContainer } from "@components/atoms/modal-container/modal-container";
import { FactTypeSettings } from "./articles/fact-type-settings/fact-type-settings";
import { ColorsSettings } from "./articles/colors-settings/colors-settings";
import { ImageSettings } from "./articles/image-settings/image-settings";
import { TimeFormatSettings } from "./articles/time-format-settings/time-format-settings";
import { CryptocurrencySettings } from "./articles/cryptocurrency-settings/cryptocurrency-settings";

const SettingsModal: React.FC = () => {
	return (
		<ModalContainer
			initialPosition="top-right"
		>
			<h1>Settings</h1>
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