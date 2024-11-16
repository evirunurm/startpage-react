import { Fact } from "@components/fact/fact";
import { Image } from "@components/image/image"
import { BookmarkLibrary } from "@components/bookmark-library/bookmark-library";
import { DateTime } from "@components/date-time/date-time";
import { StartpageLayout } from "@components/layouts/startpage-layout/startpage-layout";
import { RowLayout } from "@components/layouts/row-layout/row-layout";
import { ColumnLayout } from "@components/layouts/column-layout/column-layout";

const Startpage = () => {
  return (
    <StartpageLayout>
      <RowLayout>
        <ColumnLayout>
          <DateTime/>
          <Fact />
        </ColumnLayout>
        <Image />
      </RowLayout>
      <BookmarkLibrary />
    </StartpageLayout>
  );
};

export default Startpage;