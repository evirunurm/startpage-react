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
	public bookmarkEditorOpen: boolean;
	public bookmarkFolderIdEditing?: string;
	public bookmarkIdEditing?: string;

	public bookmarksUseCase: BookmarksUseCase;
	public bookmarksHolder: BookmarksHolder;

	public constructor(bookmarksUseCase: BookmarksUseCase, bookmarksHolder: BookmarksHolder) {
		super();
		this.bookmarkFolderEditorOpen = false;
		this.bookmarkEditorOpen = false;
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

	onOpenBookmarkSaverClick(bookmarkId?: string | undefined): void {
		console.log('Clicked open bookmark editor', bookmarkId);
		this.bookmarkEditorOpen = true;
		this.bookmarkIdEditing = bookmarkId;
		this.notifyViewAboutChanges();
	}

	onSaveBookmarkClick(bookmark: Bookmark): void {
		console.log('Clicked save bookmark', bookmark);
		if (this.bookmarkFolderIdEditing) {
			this.bookmarksUseCase.addBookmark(this.bookmarkFolderIdEditing, bookmark);
			this.onBookmarksChanged();
		}
	}

	getEditingBookmark(): Bookmark | undefined {
		if (this.bookmarkIdEditing) {
			return this.bookmarksUseCase.getBookmarkByID(this.bookmarkIdEditing);
		}
		return undefined;
	}
	
	getFolderByID(id: string): BookmarkFolder | undefined {
		return this.bookmarksUseCase.getBookmarkFolderByID(id);
	}

	getEditingFolder(): BookmarkFolder | undefined {
		if (this.bookmarkFolderIdEditing) {
			return this.bookmarksUseCase.getBookmarkFolderByID(this.bookmarkFolderIdEditing);
		}
		return undefined;
	}

	onOpenFolderSaverClick(folderId?: string): void {
		console.log('Clicked open folder editor', folderId);
		this.bookmarkFolderEditorOpen = true;
		this.bookmarkFolderIdEditing = folderId;
		this.notifyViewAboutChanges();
	}
	
	onSaveFolderClick(bookmarkFolder: BookmarkFolder): void {
		console.log('Clicked save folder', bookmarkFolder);
		this.bookmarksUseCase.addBookmarkFolder(bookmarkFolder);
		this.onBookmarksChanged();
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