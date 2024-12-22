import { describe, it, expect, beforeEach } from "vitest";
import BookmarkLibraryFactory from "./bookmark-library.factory";
import { IBookmarkLibraryFactory } from "@domain/factories/bookmarks/IBookmarkLibraryFactory";

describe("BookmarkLibraryFactory", () => {
	let bookmarkLibraryFactory: IBookmarkLibraryFactory;
	beforeEach(() => {
		bookmarkLibraryFactory = BookmarkLibraryFactory();
	});

	it("should return a default bookmark library with at least one folder", () => {
		const { getDefaultBookmarkLibrary } = bookmarkLibraryFactory;
		const defaultBookmarkLibrary = getDefaultBookmarkLibrary();

		expect(defaultBookmarkLibrary).toBeDefined();
		expect(defaultBookmarkLibrary.bookmarkFolders).toBeDefined();
		expect(defaultBookmarkLibrary.bookmarkFolders.length).toBeGreaterThan(
			0
		);
	});

	it("should return a default bookmark library with four folders", () => {
		const { getDefaultBookmarkLibrary } = bookmarkLibraryFactory;
		const defaultBookmarkLibrary = getDefaultBookmarkLibrary();

		expect(defaultBookmarkLibrary.bookmarkFolders.length).toBe(4);
	});

	it("should have a maximun amount of folders", () => {
		const { maxAmountFolders } = BookmarkLibraryFactory();

		expect(maxAmountFolders).toBeGreaterThan(0);
	});

	it("should allow to create a new folder", () => {
		const { createNewFolder } =
			BookmarkLibraryFactory();
		const initialLibrary = {
			bookmarkFolders: [
				{
					name: "Folder",
					bookmarks: [],
					id: "0",
				},
			],
		};

		const library = createNewFolder(initialLibrary);

		expect(library.bookmarkFolders.length).toBe(2);
	});

	it("should create new folder with name 'Folder Name'", () => {
		const { createNewFolder } =
			BookmarkLibraryFactory();
		const initialLibrary = {
			bookmarkFolders: [
				{
					name: "Folder",
					bookmarks: [],
					id: "0",
				},
			],
		};

		const library = createNewFolder(initialLibrary);

		const newFolder =
			library.bookmarkFolders[library.bookmarkFolders.length - 1];
		expect(newFolder.name).toBe("Folder Name");
	});

	it("should create a new folder with name 'Folder Name 1' in case a folder with name 'Folder Name' already exists", () => {
		const { createNewFolder } = BookmarkLibraryFactory();
		const initialLibrary = {
			bookmarkFolders: [
				{
					name: "Folder Name",
					bookmarks: [],
					id: "0",
				},
			],
		};
		const library = createNewFolder(initialLibrary);

		const newFolder =
			library.bookmarkFolders[library.bookmarkFolders.length - 1];
		expect(newFolder.name).toBe("Folder Name 1");
	});

	it("should create a new folder with name 'Folder Name 1' in case a folder with name 'Folder Name' already exists", () => {
		const { createNewFolder } = BookmarkLibraryFactory();
		const initialLibrary = {
			bookmarkFolders: [
				{
					name: "Folder Name",
					bookmarks: [],
					id: "0",
				},
				{
					name: "Folder Name 1",
					bookmarks: [],
					id: "2",
				},
				{
					name: "Folder Name 2",
					bookmarks: [],
					id: "3",
				},
			],
		};
		const library = createNewFolder(initialLibrary);

		const newFolder =
			library.bookmarkFolders[library.bookmarkFolders.length - 1];
		expect(newFolder.name).toBe("Folder Name 3");
	});

	it("should delete a folder with passed down name", () => {
		const { deleteFolder } = BookmarkLibraryFactory();
		const folderIdToDelete = "2";
		const initialLibrary = {
			bookmarkFolders: [
				{
					name: "Folder Name",
					bookmarks: [],
					id: "1",
				},
				{
					name: "Folder Name 1",
					bookmarks: [],
					id: folderIdToDelete,
				},
			],
		};

		const library = deleteFolder(folderIdToDelete, initialLibrary);

		const deletedFolder = library.bookmarkFolders.find(
			(folder) => folder.id === folderIdToDelete
		);
		expect(library.bookmarkFolders.length).toBeGreaterThan(0);
		expect(deletedFolder).toBeUndefined();
	});

	it("should not delete folder if passed down different name", () => {
		const { deleteFolder } = BookmarkLibraryFactory();
		const folderIdToNotDelete = "1";
		const folderIdToDelete = "2";

		const initialLibrary = {
			bookmarkFolders: [
				{
					name: "Folder Name",
					bookmarks: [],
					id: folderIdToNotDelete,
				},
				{
					name: "Folder Name 1",
					bookmarks: [],
					id: folderIdToDelete,
				},
			],
		};
		const library = deleteFolder(folderIdToDelete, initialLibrary);

		const notDeletedFolder = library.bookmarkFolders.find(
			(folder) => folder.id === folderIdToNotDelete
		);
		expect(notDeletedFolder).toBeDefined();
	});

	it("should not delete the last folder", () => {
		const { deleteFolder } = BookmarkLibraryFactory();
		const folderIdToNotDelete = "1";

		const initialLibrary = {
			bookmarkFolders: [
				{
					name: "Folder",
					bookmarks: [],
					id: folderIdToNotDelete,
				}
			],
		};

		expect(() => deleteFolder(folderIdToNotDelete, initialLibrary)).toThrowError();
	});

	it("should edit name of exiting folder", () => {
		const { editFolderName } = BookmarkLibraryFactory();
		const folderIdToRename = "1";
		const newName = "New Folder Name";
		const initialLibrary = {
			bookmarkFolders: [
				{
					name: "Folder Name",
					bookmarks: [],
					id: "1",
				},
				{
					name: "Folder Name 1",
					bookmarks: [],
					id: folderIdToRename,
				},
			],
		};

		const library = editFolderName(
			newName,
			folderIdToRename,
			initialLibrary
		);

		const renamedFolder = library.bookmarkFolders.find(
			(folder) => folder.id === folderIdToRename
		);
		expect(renamedFolder?.name).toBe(newName);
	});
});
