import IBookmarksViewModel from "./IBookmarksViewModel";
import IBookmarkContainer from "../../../domain/entity/bookmarks/structures/IBookmarkContainer";
import BookmarksUseCase from "../../../domain/interactors/bookmarks/bookmarksUseCase";
import BookmarksHolder from "../../../domain/entity/bookmarks/models/BookmarksHolder";
import IBookmarksListener from "../../../domain/entity/bookmarks/models/IBookmarksListener";
import BaseViewModel from "../BaseViewModel";
import BookmarkFolder from "../../../domain/entity/bookmarks/models/BookmarkFolder";
import { generateNewBookmarksContainer, generateUnique } from "../../../utils/utils";
import Bookmark from "../../../domain/entity/bookmarks/models/Bookmark";
import IBookmarkFolder from "../../../domain/entity/bookmarks/structures/IBookmarkFolder";

export default class BookmarksViewModel extends BaseViewModel implements IBookmarksViewModel, IBookmarksListener {
	public bookmarks: IBookmarkContainer | undefined;
	public bookmarkFolderEditorOpen: boolean;

	public bookmarksUseCase: BookmarksUseCase;
	public bookmarksHolder: BookmarksHolder;

	public constructor(bookmarksUseCase: BookmarksUseCase, bookmarksHolder: BookmarksHolder) {
		super();
		this.bookmarkFolderEditorOpen = false;
		this.bookmarksUseCase = bookmarksUseCase;
		this.bookmarksHolder = bookmarksHolder;
		this.bookmarksHolder.addBookmarksListener(this);
		const existingBookmarks = bookmarksHolder.getBookmarks();
		if (existingBookmarks) {
			this.bookmarks = existingBookmarks;
		} else {
			this.bookmarks = generateNewBookmarksContainer();
			bookmarksUseCase.saveBookmarkContainer(this.bookmarks);
		}
	}
	
	getFolderByID(id: string): BookmarkFolder | undefined {
		return this.bookmarksUseCase.getBookmarkFolderByID(id);
	}

	onOpenFolderCreatorClick(): void {
		this.bookmarkFolderEditorOpen = true;
		this.notifyViewAboutChanges();
	}
	
	onCreateFolderClick(bookmarkFolder: BookmarkFolder): void {
		console.log(bookmarkFolder)
		this.bookmarksUseCase.addBookmarkFolder(bookmarkFolder);
	}

	onBookmarksChanged(): void {
		this.bookmarks = this.bookmarksHolder.getBookmarks();
		this.notifyViewAboutChanges();
	}

	generateNewBookmarksContainer() {
		const newBookmarksContainer: IBookmarkContainer = {
			bookmarkFolders: [
				{
					id: generateUnique(),
					name: 'New Folder',
					bookmarks: [new Bookmark()],
					order: 0
				} as IBookmarkFolder
			]
		};
		this.bookmarksUseCase.saveBookmarkContainer(newBookmarksContainer);
		return newBookmarksContainer;
	}
}