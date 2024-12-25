import IBookmarkFolder from "@domain/bookmarks/IBookmarkFolder";
import IBookmarkLibrary from "@domain/bookmarks/IBookmarkLibrary";

export default interface IBookmarkLibraryFactory {
	maxAmountFolders: number;
	getDefaultBookmarkLibrary: () => IBookmarkLibrary;
	createNewFolder: (library: IBookmarkLibrary) => IBookmarkLibrary;
	getFolderById: (
		folderId: string,
		library: IBookmarkLibrary
	) => IBookmarkFolder;
	addFolder: (
		folder: IBookmarkFolder,
		library: IBookmarkLibrary
	) => IBookmarkLibrary;
	editFolderName: (
		newName: string,
		folderId: string,
		library: IBookmarkLibrary
	) => IBookmarkLibrary;
	deleteFolder: (
		folderId: string,
		library: IBookmarkLibrary
	) => IBookmarkLibrary;
}
