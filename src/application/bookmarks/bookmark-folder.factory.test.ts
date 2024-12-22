import { describe, it, expect, beforeEach } from "vitest";
import BookmarkFolderFactory from "./bookmark-folder.factory";
import { IBookmarkFolderFactory } from "@domain/factories/bookmarks/IBookmarkFolderFactory";
import IBookmarkLibrary from "@domain/bookmarks/IBookmarkLibrary";
import IBookmark from "@domain/bookmarks/IBookmark";

describe("BookmarkFolderFactory", () => {
	let bookmarkFolderFactory: IBookmarkFolderFactory;

	beforeEach(() => {
		bookmarkFolderFactory = BookmarkFolderFactory();
	});

	it("should return a default bookmark folder with no bookmarks", () => {
		const { getDefaultBookmarkFolder } = bookmarkFolderFactory;
		const defaultBookmarkFolder = getDefaultBookmarkFolder();

		expect(defaultBookmarkFolder).toBeDefined();
		expect(defaultBookmarkFolder.bookmarks).toBeDefined();
		expect(defaultBookmarkFolder.bookmarks.length).toBe(0);
	});

	it("should return the maximum amount of bookmarks greater than 0", () => {
		const { maxAmountBookmarks } = bookmarkFolderFactory;

		expect(maxAmountBookmarks).toBeDefined();
		expect(maxAmountBookmarks).toBeGreaterThan(0);
	});

	it("should return the maximum amount of bookmarks less than 15", () => {
		const { maxAmountBookmarks } = bookmarkFolderFactory;

		expect(maxAmountBookmarks).toBeDefined();
		expect(maxAmountBookmarks).toBeLessThan(15);
	});

	it("should add a bookmark", () => {
		const { addBookmark, getDefaultBookmarkFolder } = bookmarkFolderFactory;
		const name = "Bookmark 1";
		const url = "https://www.bookmark.com";
		const folder = getDefaultBookmarkFolder();
		const initialLibrary = {
			bookmarkFolders: [folder],
		} as IBookmarkLibrary;

		const library = addBookmark(name, url, folder.id, initialLibrary);

		const addedFolder = library.bookmarkFolders[0];
		expect(addedFolder.bookmarks).toBeDefined();
		expect(addedFolder.bookmarks.length).toBe(1);
	});

	it("should add a bookmark with passed down name and url", () => {
		const { addBookmark, getDefaultBookmarkFolder } = bookmarkFolderFactory;
		const name = "Bookmark 1";
		const url = "https://www.bookmark.com";
		const folder = getDefaultBookmarkFolder();
		const initialLibrary = {
			bookmarkFolders: [folder],
		} as IBookmarkLibrary;

		const library = addBookmark(name, url, folder.id, initialLibrary);

		const addedFolder = library.bookmarkFolders[0];
		const bookmark = addedFolder.bookmarks[0];
		expect(bookmark).toBeDefined();
		expect(bookmark.name).toBe(name);
		expect(bookmark.url).toBe(url);
	});

	it("should delete a bookmark with passed id", () => {
		const { deleteBookmark, getDefaultBookmarkFolder } =
			bookmarkFolderFactory;
		const folder = getDefaultBookmarkFolder();
		const bookmarkIdToDelete = "1";
		folder.bookmarks = [
			{
				id: bookmarkIdToDelete,
				name: "Bookmark",
				url: "https://www.bookmark.com",
			},
		];
		const initialLibrary = {
			bookmarkFolders: [folder],
		} as IBookmarkLibrary;

		const library = deleteBookmark(
			bookmarkIdToDelete,
			folder.id,
			initialLibrary
		);

		const updatedFolder = library.bookmarkFolders[0];
		const deletedBookmark = updatedFolder.bookmarks.find(
			(bookmark) => bookmark.id === bookmarkIdToDelete
		);
		expect(deletedBookmark).toBeUndefined();
	});

	it("should not delete a bookmark with a not passed down id", () => {
		const { deleteBookmark, getDefaultBookmarkFolder } =
			bookmarkFolderFactory;
		const folder = getDefaultBookmarkFolder();
		const bookmarkIdNotToDelete = "1";
		const bookmarkIdToDelete = "2";
		folder.bookmarks = [
			{
				id: bookmarkIdNotToDelete,
				name: "Bookmark 1",
				url: "https://www.bookmark.com",
			},
			{
				id: bookmarkIdToDelete,
				name: "Bookmark 2",
				url: "https://www.bookmark.com",
			},
		];
		const initialLibrary = {
			bookmarkFolders: [folder],
		} as IBookmarkLibrary;

		const library = deleteBookmark(
			bookmarkIdToDelete,
			folder.id,
			initialLibrary
		);

		const updatedFolder = library.bookmarkFolders[0];
		const deletedBookmark = updatedFolder.bookmarks.find(
			(bookmark) => bookmark.id === bookmarkIdNotToDelete
		);
		expect(deletedBookmark).toBeDefined();
	});

	it("should set the bookamarks of a folder", () => {
		const { setBookmarks, getDefaultBookmarkFolder } =
			bookmarkFolderFactory;
		const folder = getDefaultBookmarkFolder();
		const initialLibrary = {
			bookmarkFolders: [folder],
		} as IBookmarkLibrary;
		const bookmarks = [
			{
				id: "1",
				name: "Bookmark",
				url: "https://www.bookmark.com",
			},
		];

		const library = setBookmarks(bookmarks, folder.id, initialLibrary);

		const updatedFolder = library.bookmarkFolders[0];
		expect(updatedFolder.bookmarks.length).toBe(1);
	});

	it("should overwrite the bookmarks of a folder", () => {
		const { setBookmarks, getDefaultBookmarkFolder } =
			bookmarkFolderFactory;
		const folder = getDefaultBookmarkFolder();
		folder.bookmarks = [
			{
				id: "1",
				name: "Bookmark 1",
				url: "https://www.bookmark.com",
			},
			{
				id: "2",
				name: "Bookmark 2",
				url: "https://www.bookmark.com",
			},
		];
		const initialLibrary = {
			bookmarkFolders: [folder],
		} as IBookmarkLibrary;
		const bookmarks = [
			{
				id: "1",
				name: "Bookmark",
				url: "https://www.bookmark.com",
			},
		];

		const library = setBookmarks(bookmarks, folder.id, initialLibrary);

		const updatedFolder = library.bookmarkFolders[0];
		expect(updatedFolder.bookmarks.length).toBe(1);
	});

	it("should update a bookmark with provided name and url", () => {
		const { updateBookmark, getDefaultBookmarkFolder } =
			bookmarkFolderFactory;
		const folder = getDefaultBookmarkFolder();
		const bookmarkId = "1";
		const bookmarkNewName = "New Bookmark";
		const bookmarkNewUrl = "https://www.new-bookmark.com";
		folder.bookmarks = [
			{
				id: bookmarkId,
				name: "Bookmark",
				url: "https://www.bookmark.com",
			},
		];
		const initialLibrary: IBookmarkLibrary = {
			bookmarkFolders: [folder],
		};
		const newBookmark: IBookmark = {
			id: bookmarkId,
			name: bookmarkNewName,
			url: bookmarkNewUrl,
		};

		const library = updateBookmark(newBookmark, folder.id, initialLibrary);

		const updatedFolder = library.bookmarkFolders[0];
		const updatedBookmark = updatedFolder.bookmarks.find(
			(b) => b.id === bookmarkId
		);
		expect(updatedBookmark).toBeDefined();
		expect(updatedBookmark?.name).toBe(bookmarkNewName);
		expect(updatedBookmark?.url).toBe(bookmarkNewUrl);
	});

	it("should not allow to create more than maximum amount of bookmarks", () => {
		const { createNewBookmark, getDefaultBookmarkFolder, maxAmountBookmarks } =
			bookmarkFolderFactory;

		const folder = getDefaultBookmarkFolder();
		folder.bookmarks = Array.from({ length: maxAmountBookmarks }, (_, i) => ({
			id: i.toString(),
			name: `Bookmark ${i}`,
			url: `https://www.bookmark.com/${i}`,
		}));
		const initialLibrary: IBookmarkLibrary = {
			bookmarkFolders: [folder],
		};

		const library = createNewBookmark(folder.id, initialLibrary);

		const newFolder = library.bookmarkFolders[0];
		expect(newFolder.bookmarks.length).toBe(maxAmountBookmarks);
	});
});
