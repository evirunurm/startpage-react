import React from "react";
import styles from "./settings.module.css";
import { ModalContainer } from "@components/atoms/modal-container/modal-container";
import { Article } from "@components/atoms/article/article";
import { FactTypeSettings } from "./articles/fact-type-settings.tsx/fact-type-settings";

export const SettingsModal: React.FC = () => {

    return (
        <ModalContainer
            initialPosition="top-right"
        >
            <h1>Settings</h1>
            <FactTypeSettings />
            {/* Choosing fact type */}
            {/* Choosing image to display, or loading custom */}
            {/* Choosing time format, and wheter to siplay the AM/PM string */}
            {/* Choosing colors for application */}
            {/* Credits and link to Github */}
        </ModalContainer>
    );
}