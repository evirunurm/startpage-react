import React, { createContext, useState, PropsWithChildren } from 'react';
import Colors from '@domain/colors/Colors';
import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { LocalStorageType } from '@domain/localStorage/LocalStorageType';
import ColorsFactory from '@application/colors/colors.factory';

interface ColorsContextType {
	colors: Colors;
	setColors: (colors: Colors) => void;
}

const ColorsContext = createContext<ColorsContextType>({} as ColorsContextType);

export const ColorsProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { getDefaultColors } = ColorsFactory();
	const [storedColors] = useLocalStorageState<Colors>(LocalStorageType.Colors);
	const [colors, setColors] = useState<Colors>(storedColors ?? getDefaultColors());

	return (
		<ColorsContext.Provider value={{ colors, setColors }}>
			{children}
		</ColorsContext.Provider>
	);
};

export default ColorsContext;