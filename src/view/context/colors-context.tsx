import React, { createContext, useState, PropsWithChildren } from 'react';
import Colors from '@domain/colors/Colors';
import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { LocalStorageType } from '@domain/localStorage/LocalStorageType';
import DEFAULT_COLORS from '@application/colors/default-colors';

interface ColorsContextType {
	colors: Colors;
	setColors: (colors: Colors) => void;
}

const ColorsContext = createContext<ColorsContextType>({} as ColorsContextType);

export const ColorsProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [storedColors] = useLocalStorageState<Colors>(LocalStorageType.Colors);
	const [colors, setColors] = useState<Colors>(storedColors ?? DEFAULT_COLORS);

	return (
		<ColorsContext.Provider value={{ colors, setColors }}>
			{children}
		</ColorsContext.Provider>
	);
};


export default ColorsContext;