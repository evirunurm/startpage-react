import IBookmarkFolder from "./IBookmarkFolder";

// Data structure for transferring bookmarks between layers
export default interface IBookmarkContainer {
	bookmarkFolders: IBookmarkFolder[];
}