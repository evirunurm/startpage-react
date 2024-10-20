import { Fact } from "@components/fact/Fact"
import { Image } from "@components/image/Image"
import { BookmarkLibrary } from "@components/bookmarkLibrary/BookmarkLibrary";
import { Time } from "@components/time/Time";

const Startpage = () => {
  return (
    <main>
       {/* // Settings
      // Aside
      // Aside
      // Markups */}
      <BookmarkLibrary />
      <Image />
      <Fact />
      <Time/>
    </main>
  );
};

export default Startpage;