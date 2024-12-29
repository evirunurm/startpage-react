import "vitest-axe/extend-expect";
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
	fallbackLng: 'en',
	resources: {
		en: {
			translation: {
				key: "value"
			}
		}
	}
});

afterEach(() => {
	cleanup();
	localStorage.clear();
	i18next.changeLanguage('en');
});