import IBookmarksViewModel from "./IBookmarksViewModel";
import IBookmarkContainer from "../../../domain/entity/bookmarks/structures/IBookmarkContainer";
import BookmarksUseCase from "../../../domain/interactors/bookmarks/bookmarksUseCase";
import BookmarksHolder from "../../../domain/entity/bookmarks/models/BookmarksHolder";
import IBookmarksListener from "../../../domain/entity/bookmarks/models/IBookmarksListener";
import BaseViewModel from "../BaseViewModel";
import BookmarkFolder from "../../../domain/entity/bookmarks/models/BookmarkFolder";
import { generateNewBookmarksContainer } from "../../../utils/utils";
import Bookmark from "../../../domain/entity/bookmarks/models/Bookmark";

export default class BookmarksViewModel extends BaseViewModel implements IBookmarksViewModel, IBookmarksListener {
	public bookmarksUseCase: BookmarksUseCase;
	public bookmarksHolder: BookmarksHolder;
	public bookmarks: IBookmarkContainer | undefined;
	public isBookmarkFolderEditorOpen: boolean;
	public idBookmarkFolderEditing?: string;
	public isBookmarkEditorOpen: boolean;
	public idBookmarkEditing?: string;
	public isDeleteConfirmationOpen: boolean;
	public idBookmarkFolderDeleting?: string;

	public constructor(bookmarksUseCase: BookmarksUseCase, bookmarksHolder: BookmarksHolder) {
		super();
		this.bookmarksUseCase = bookmarksUseCase;
		this.bookmarksHolder = bookmarksHolder;
		this.isBookmarkFolderEditorOpen = false;
		this.isBookmarkEditorOpen = false;
		this.isDeleteConfirmationOpen = false;

		this.bookmarksHolder.addBookmarksListener(this);
		this.synchronizeBookmarks();
	}

	private synchronizeBookmarks() {
		const existingBookmarks = this.bookmarksHolder.getBookmarks();
		if (existingBookmarks) {
			this.bookmarks = existingBookmarks;
		} else {
			this.bookmarks = generateNewBookmarksContainer();
			this.bookmarksUseCase.saveContainer(this.bookmarks);
		}
	}

	public onDeleteFolderClick(id: string): void {
		this.isDeleteConfirmationOpen = true;
		this.idBookmarkFolderDeleting = id;
		this.notifyViewAboutChanges();
	}

	public onConfirmDeleteFolderClick(confirmation: boolean): void {
		if (confirmation && this.idBookmarkFolderDeleting) {
			this.bookmarksUseCase.removeFolder(this.idBookmarkFolderDeleting);
		}
		this.resetBookmarkFolderDeleting();
		console.log('Here')
		this.onBookmarksChanged();
	}

	public onCloseFolderEditor(): void {
		this.resetFolderEditing();
		this.resetBookmarkEditing();
		this.notifyViewAboutChanges();
	}

	public onCloseBookmarkEditor(): void {
		this.resetBookmarkEditing();
		this.notifyViewAboutChanges();
	}

	public onOpenBookmarkSaverClick(bookmarkId?: string | undefined): void {
		console.log('Clicked open bookmark editor', bookmarkId);
		this.isBookmarkEditorOpen = true;
		this.idBookmarkEditing = bookmarkId;
		this.notifyViewAboutChanges();
	}

	public onSaveBookmarkClick(bookmark: Bookmark): void {
		console.log('Clicked save bookmark', bookmark);
		if (this.idBookmarkFolderEditing) {
			this.bookmarksUseCase.add(this.idBookmarkFolderEditing, bookmark);
			this.resetBookmarkEditing();
			this.onBookmarksChanged();
		}
	}

	resetBookmarkFolderDeleting(): void {
		this.isDeleteConfirmationOpen = false;
		this.idBookmarkFolderDeleting = undefined;
	}


	resetBookmarkEditing(): void {
		this.isBookmarkEditorOpen = false;
		this.idBookmarkEditing = undefined;
	}

	resetFolderEditing(): void {
		this.isBookmarkFolderEditorOpen = false;
		this.idBookmarkFolderEditing = undefined;
	}

	getEditingBookmark(): Bookmark | undefined {
		if (this.idBookmarkEditing) {
			return this.bookmarksUseCase.getByID(this.idBookmarkEditing);
		}
		return undefined;
	}
	
	getFolderByID(id: string): BookmarkFolder | undefined {
		return this.bookmarksUseCase.getFolderByID(id);
	}

	getEditingFolder(): BookmarkFolder | undefined {
		if (this.idBookmarkFolderEditing) {
			return this.bookmarksUseCase.getFolderByID(this.idBookmarkFolderEditing);
		}
		return undefined;
	}

	onOpenFolderSaverClick(folderId?: string): void {
		console.log('Clicked open folder editor', folderId);
		this.isBookmarkFolderEditorOpen = true;
		this.idBookmarkFolderEditing = folderId;
		this.notifyViewAboutChanges();
	}
	
	onSaveFolderClick(bookmarkFolder: BookmarkFolder): void {
		console.log('Clicked save folder', bookmarkFolder);
		this.bookmarksUseCase.addFolder(bookmarkFolder);
		this.resetFolderEditing();
		this.resetBookmarkEditing();
		this.onBookmarksChanged();
	}

	onBookmarksChanged(): void {
		this.bookmarks = this.bookmarksHolder.getBookmarks();
		console.log(this.bookmarks)
		this.notifyViewAboutChanges();
	}
}