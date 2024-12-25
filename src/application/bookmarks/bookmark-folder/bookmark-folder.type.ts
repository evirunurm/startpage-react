import IBookmark from "@domain/bookmarks/IBookmark";
import IBookmarkFolder from "@domain/bookmarks/IBookmarkFolder";
import IBookmarkLibrary from "@domain/bookmarks/IBookmarkLibrary";

export default interface IBookmarkFolderFactory {
	maxAmountBookmarks: number;
	getDefaultBookmarkFolder: () => IBookmarkFolder;
	createNewBookmark: (
		folderId: string,
		library: IBookmarkLibrary
	) => IBookmarkLibrary;
	addBookmark: (
		bookmarkName: string,
		bookmarkUrl: string,
		folderId: string,
		library: IBookmarkLibrary
	) => IBookmarkLibrary;
	deleteBookmark: (
		bookmarkId: string,
		folderId: string,
		library: IBookmarkLibrary
	) => IBookmarkLibrary;
	setBookmarks: (
		bookmarks: IBookmark[],
		folderId: string,
		library: IBookmarkLibrary
	) => IBookmarkLibrary;
	updateBookmark: (
		bookmark: IBookmark,
		folderId: string,
		library: IBookmarkLibrary
	) => IBookmarkLibrary;
}
