import IBookmarkLibrary from "@domain/bookmarks/IBookmarkLibrary";
import IBookmarkFolder from "@domain/bookmarks/IBookmarkFolder";
import IBookmark from "@domain/bookmarks/IBookmark";
import { generateUniqueId } from "@utils/utils";
import BookmarkFolderFactory from "./bookmark-folder.factory";
import { IBookmarkLibraryFactory } from "@domain/factories/bookmarks/IBookmarkLibraryFactory";

const DEFAULT_BOOKMARK_LIBRARY: IBookmarkLibrary = {
	bookmarkFolders: [
		{
			id: generateUniqueId(),
			name: "Folder 1",
			bookmarks: [
				{
					id: generateUniqueId(),
					name: "Bookmark 1",
					url: "https://www.google.com",
				},
				{
					id: generateUniqueId(),
					name: "Bookmark 2",
					url: "https://www.facebook.com",
				},
				{
					id: generateUniqueId(),
					name: "Bookmark 3",
					url: "https://www.twitter.com",
				},
			] as IBookmark[],
		} as IBookmarkFolder,
		{
			id: generateUniqueId(),
			name: "Folder 2",
			bookmarks: [
				{
					id: generateUniqueId(),
					name: "Bookmark 4",
					url: "https://www.youtube.com",
				},
				{
					id: generateUniqueId(),
					name: "Bookmark 5",
					url: "https://www.linkedin.com",
				},
				{
					id: generateUniqueId(),
					name: "Bookmark 6",
					url: "https://www.instagram.com",
				},
			] as IBookmark[],
		} as IBookmarkFolder,
	],
} as IBookmarkLibrary;

const MAX_AMOUNT_FOLDERS: number = 4;

export default function BookmarkLibraryFactory(): IBookmarkLibraryFactory {
	const { getDefaultBookmarkFolder } = BookmarkFolderFactory();
	const defaultBookmarkLibrary: IBookmarkLibrary = DEFAULT_BOOKMARK_LIBRARY;
	const maxAmountFolders: number = MAX_AMOUNT_FOLDERS;

	const getDefaultBookmarkLibrary = (): IBookmarkLibrary =>
		JSON.parse(JSON.stringify(defaultBookmarkLibrary));

	const libraryHasFolderWithName = (
		library: IBookmarkLibrary,
		name: string
	): boolean => {
		return library.bookmarkFolders.some((folder) => folder.name === name);
	};

	const libraryHasFolderWithId = (
		library: IBookmarkLibrary,
		id: string
	): boolean => {
		return library.bookmarkFolders.some((folder) => folder.id === id);
	};

	const createNewFolder = (library: IBookmarkLibrary): IBookmarkLibrary => {
		if (library.bookmarkFolders.length >= maxAmountFolders) {
			throw new Error(
				`You can't have more than ${maxAmountFolders} folders`
			);
		}
		const newBookmarkFolder: IBookmarkFolder = getDefaultBookmarkFolder();
		for (
			let existingNewFolders = 0;
			existingNewFolders < maxAmountFolders;
			existingNewFolders++
		) {
			const folderName =
				existingNewFolders === 0
					? newBookmarkFolder.name
					: `${newBookmarkFolder.name} ${existingNewFolders}`;
			if (libraryHasFolderWithName(library, folderName)) {
				continue;
			} else {
				newBookmarkFolder.name = folderName;
				break;
			}
		}

		const newLibrary: IBookmarkLibrary = addFolder(
			{
				...newBookmarkFolder,
				id: generateUniqueId(),
			} as IBookmarkFolder,
			library
		);

		return newLibrary;
	};

	const deleteFolder = (
		id: string,
		library: IBookmarkLibrary
	): IBookmarkLibrary => {
		if (!libraryHasFolderWithId(library, id)) {
			throw new Error(`Folder with name ${id} doesn't exist`);
		}
		return {
			bookmarkFolders: library.bookmarkFolders.filter(
				(folder) => folder.id !== id
			),
		};
	};

	const addFolder = (
		folder: IBookmarkFolder,
		library: IBookmarkLibrary
	): IBookmarkLibrary => {
		if (library.bookmarkFolders.length >= maxAmountFolders) {
			throw new Error(
				`You can't have more than ${maxAmountFolders} folders`
			);
		}
		if (libraryHasFolderWithName(library, folder.name)) {
			throw new Error(`Folder with name ${folder.name} already exists`);
		}
		if (libraryHasFolderWithId(library, folder.id)) {
			throw new Error(`Folder with id ${folder.id} already exists`);
		}
		return {
			bookmarkFolders: [...library.bookmarkFolders, folder],
		} as IBookmarkLibrary;
	};

	const editFolderName = (
		newName: string,
		folderId: string,
		library: IBookmarkLibrary
	): IBookmarkLibrary => {
		if (!libraryHasFolderWithId(library, folderId)) {
			throw new Error(`Folder with id ${folderId} doesn't exist`);
		}

		return {
			bookmarkFolders: library.bookmarkFolders.map((folder) =>
				folder.id === folderId ? { ...folder, name: newName } : folder
			),
		};
	};

	const getFolderById = (
		folderId: string,
		library: IBookmarkLibrary
	): IBookmarkFolder => {
		const folder = library.bookmarkFolders.find(
			(folder) => folder.id === folderId
		);
		if (!folder) {
			throw new Error(`Folder with id ${folderId} doesn't exist`);
		}
		return folder;
	};

	return {
		maxAmountFolders,
		getDefaultBookmarkLibrary,
		getFolderById,
		createNewFolder,
		deleteFolder,
		addFolder,
		editFolderName,
	};
}
