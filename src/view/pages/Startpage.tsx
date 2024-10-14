import { Fact } from "@components/fact/Fact"
import { Image } from "@components/image/Image"
import { BookmarkLibrary } from "@components/bookmarkLibrary/BookmarkLibrary";

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
    </main>
  );
};

export default Startpage;