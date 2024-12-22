import IBookmarkFolder from "@domain/bookmarks/IBookmarkFolder";
import IBookmark from "@domain/bookmarks/IBookmark";
import { generateUniqueId } from "@utils/utils";
import IBookmarkLibrary from "@domain/bookmarks/IBookmarkLibrary";
import { IBookmarkFolderFactory } from "@domain/factories/bookmarks/IBookmarkFolderFactory";

const DEFAULT_BOOKMARK_FOLDER: IBookmarkFolder = {
	name: "Folder Name",
	bookmarks: [],
	id: "",
};

const DEFAULT_BOOKMARK: IBookmark = {
	name: "Bookmark",
	url: "https://www.retropage.netlify.app",
	id: "",
};

const MAX_AMOUNT_BOOKMARKS: number = 10;

export default function BookmarkFolderFactory(): IBookmarkFolderFactory {
	const defaultBookmarkFolder: IBookmarkFolder = DEFAULT_BOOKMARK_FOLDER;
	const defaultBookmark: IBookmark = DEFAULT_BOOKMARK;
	const maxAmountBookmarks: number = MAX_AMOUNT_BOOKMARKS;

	const createNewBookmark = (
		folderId: string,
		library: IBookmarkLibrary
	): IBookmarkLibrary => {
		const folder = library.bookmarkFolders.find((folder) => folder.id === folderId);

		if (!folder || folder.bookmarks.length >= maxAmountBookmarks) {
			return library;
		}

		const newBookmark = getDefaultBookmark();
		return {
			bookmarkFolders: library.bookmarkFolders.map((folder) =>
				folder.id === folderId
					? {
						...folder,
						bookmarks: [...folder.bookmarks, newBookmark],
					}
					: folder
			),
		};
	};

	const setBookmarks = (
		newBookmarks: IBookmark[],
		folderId: string,
		library: IBookmarkLibrary
	): IBookmarkLibrary => {
		return {
			bookmarkFolders: library.bookmarkFolders.map((folder) =>
				folder.id === folderId
					? { ...folder, bookmarks: newBookmarks }
					: folder
			),
		};
	};

	const addBookmark = (
		bookmarkName: string,
		bookmarkUrl: string,
		folderId: string,
		library: IBookmarkLibrary
	): IBookmarkLibrary => {
		const newBookmark: IBookmark = {
			name: bookmarkName,
			url: bookmarkUrl,
			id: generateUniqueId(),
		} as IBookmark;
		return {
			bookmarkFolders: library.bookmarkFolders.map((folder) =>
				folder.id === folderId
					? {
						...folder,
						bookmarks: [...folder.bookmarks, newBookmark],
					}
					: folder
			),
		};
	};

	const deleteBookmark = (
		bookmarkId: string,
		folderId: string,
		library: IBookmarkLibrary
	): IBookmarkLibrary => {
		return {
			bookmarkFolders: library.bookmarkFolders.map((folder) =>
				folder.id === folderId
					? {
						...folder,
						bookmarks: folder.bookmarks.filter(
							(bookmark) => bookmark.id !== bookmarkId
						),
					}
					: folder
			),
		};
	};

	const updateBookmark = (
		newBookmark: IBookmark,
		folderId: string,
		library: IBookmarkLibrary
	): IBookmarkLibrary => {
		return {
			bookmarkFolders: library.bookmarkFolders.map((folder) =>
				folder.id === folderId
					? {
						...folder,
						bookmarks: folder.bookmarks.map((bookmark) =>
							bookmark.id === newBookmark.id
								? newBookmark
								: bookmark
						),
					}
					: folder
			),
		};
	};

	const getDefaultBookmarkFolder = (): IBookmarkFolder =>
		JSON.parse(
			JSON.stringify({ ...defaultBookmarkFolder, id: generateUniqueId() })
		);

	const getDefaultBookmark = (): IBookmark =>
		JSON.parse(
			JSON.stringify({ ...defaultBookmark, id: generateUniqueId() })
		);

	return {
		maxAmountBookmarks,
		getDefaultBookmarkFolder,
		createNewBookmark,
		addBookmark,
		deleteBookmark,
		setBookmarks,
		updateBookmark,
	};
}
