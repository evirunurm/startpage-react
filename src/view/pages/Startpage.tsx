import React from "react";
import { Fact } from "@components/fact/fact";
import { Image } from "@components/image/image";
import { DateTime } from "@components/date-time";
import { StartpageLayout } from "@components/layouts/startpage-layout/startpage-layout";
import { RowLayout } from "@components/layouts/row-layout/row-layout";
import { ColumnLayout } from "@components/layouts/column-layout/column-layout";
import { HorizontalLine } from "@components/atoms/horizontal-line/horizontal-line";
import { BookmarkLibraryContainer } from "@components/bookmark-library-container/bookmark-library-container";
import { SettingsTrigger } from "@components/seetings-trigger/settings-trigger";
import { useContext, useEffect } from "react";
import ColorsContext from "@context/colors-context";
import { CryptocurrencyInfo } from "@components/cryptocurrency/cryptocurrency-info";
import ColorsFactory from "@application/colors/colors.factory";

const Startpage: React.FC = () => {
	const { colors } = useContext(ColorsContext);
	const { updateCSSVariables } = ColorsFactory();

	useEffect(() => {
		if (colors) {
			updateCSSVariables(colors);
		}
	}, [colors, updateCSSVariables]);

	return (
		<StartpageLayout>
			<SettingsTrigger />
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