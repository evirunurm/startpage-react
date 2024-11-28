import React from "react";
import { ModalContainer } from "@components/atoms/modal-container/modal-container";
import { FactTypeSettings } from "./articles/fact-type-settings/fact-type-settings";
import { ColorsSettings } from "./articles/colors-settings/colors-settings";

export const SettingsModal: React.FC = () => {

    return (
        <ModalContainer
            initialPosition="top-right"
        >
            <h1>Settings</h1>
            <FactTypeSettings />
            {/* Choosing image to display, or loading custom */}
            {/* Choosing time format, and wheter to siplay the AM/PM string */}
            <ColorsSettings />
            {/* Choosing colors for application */}
            {/* Credits and link to Github */}
        </ModalContainer>
    );
}