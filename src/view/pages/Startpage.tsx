import { Fact } from "@components/atoms/fact/Fact"
import { Image } from "@components/image/Image"
import { BookmarkLibrary } from "@components/bookmarkLibrary/BookmarkLibrary";
import { DateTime } from "@components/dateTime/DateTime";

const Startpage = () => {
  return (
    <main>
      <BookmarkLibrary />
      <Image />
      <Fact />
      <DateTime/>
    </main>
  );
};

export default Startpage;