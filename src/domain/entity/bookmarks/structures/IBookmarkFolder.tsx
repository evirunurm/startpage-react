import IBookmark from "./IBookmark";

// Data structure for transferring bookmark folders between layers
export default interface IBookmarkFolder {
	id: string;
	name: string;
	bookmarks: IBookmark[];
	order: number;
	addBookmark(bookmark: IBookmark): void;
}