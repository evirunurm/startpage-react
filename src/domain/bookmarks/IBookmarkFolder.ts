import IBookmark from "./IBookmark";

export default interface IBookmarkFolder {
	id: string;
	name: string;
	bookmarks: IBookmark[];
}
