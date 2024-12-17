import React, { createContext, useState, PropsWithChildren } from 'react';
import Colors from '@domain/colors/Colors';
import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { LocalStorageType } from '@domain/localStorage/LocalStorageType';

interface ColorsContextType {
	colors: Colors;
	setColors: (colors: Colors) => void;
}

const defaultColors: Colors = {
	"color-primary": "#007bff",
	"color-secondary": "#6c757d",
	"color-background": "#f8f9fa",
	"color-font": "#343a40"
}

const ColorsContext = createContext<ColorsContextType>({} as ColorsContextType);

export const ColorsProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [storedColors] = useLocalStorageState<Colors>(LocalStorageType.Colors);
	const [colors, setColors] = useState<Colors>(storedColors ?? defaultColors);

	return (
		<ColorsContext.Provider value={{ colors, setColors }}>
			{children}
		</ColorsContext.Provider>
	);
};


export default ColorsContext;