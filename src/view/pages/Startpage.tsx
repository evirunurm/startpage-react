import { Fact } from "@components/fact/fact";
import { Image } from "@components/image/image"
import { DateTime } from "@components/date-time/date-time";
import { StartpageLayout } from "@components/layouts/startpage-layout/startpage-layout";
import { RowLayout } from "@components/layouts/row-layout/row-layout";
import { ColumnLayout } from "@components/layouts/column-layout/column-layout";
import { HorizontalLine } from "@components/atoms/horizontal-line/horizontal-line";
import { BookmarkLibraryContainer } from "@components/bookmark-library-container/bookmark-library-container";
import { SettingsButton } from "@components/seetings-button/settings-button";

const Startpage = () => {
  return (
    <StartpageLayout>
      <SettingsButton />
      <RowLayout>
        <ColumnLayout>
          <DateTime />
          <Fact />
        </ColumnLayout>
        <Image />
      </RowLayout>
      <HorizontalLine />
      <BookmarkLibraryContainer />
    </StartpageLayout >
  );
};

export default Startpage;