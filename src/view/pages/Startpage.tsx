import { Fact } from "@components/fact/fact";
import { Image } from "@components/image/image";
import { DateTime } from "@components/date-time/date-time";
import { StartpageLayout } from "@components/layouts/startpage-layout/startpage-layout";
import { RowLayout } from "@components/layouts/row-layout/row-layout";
import { ColumnLayout } from "@components/layouts/column-layout/column-layout";
import { HorizontalLine } from "@components/atoms/horizontal-line/horizontal-line";
import { BookmarkLibraryContainer } from "@components/bookmark-library-container/bookmark-library-container";
import { SettingsButton } from "@components/seetings-button/settings-button";
import { useContext, useEffect } from "react";
import Colors from "@domain/colors/Colors";
import ColorsContext from "@context/colors-context";
import { CryptocurrencyInfo } from "@components/cryptocurrency/cryptocurrency-info";


const Startpage = () => {
	const { colors } = useContext(ColorsContext);

	const updateCSSVariables = (colors: Colors) => {
		Object.keys(colors).forEach((color: string) => {
			document.documentElement.style.setProperty(`--${color}`, colors[color as keyof Colors]);
		});
	}

	useEffect(() => {
		if (colors) {
			updateCSSVariables(colors);
		}

	}, [colors]);

	return (
		<StartpageLayout>
			<SettingsButton />
			<RowLayout>
				<ColumnLayout>
					<DateTime />
					<CryptocurrencyInfo />
					<Fact />
				</ColumnLayout>
				<Image />
			</RowLayout>
			<HorizontalLine />
			<BookmarkLibraryContainer />
		</StartpageLayout>
	);
};

export default Startpage;