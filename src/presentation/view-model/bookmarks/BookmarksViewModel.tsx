import IBookmarksViewModel from "./IBookmarksViewModel";
import IBookmarkContainer from "@entity/bookmarks/structures/IBookmarkContainer";
import BookmarksUseCase from "@interactors/bookmarks/bookmarksUseCase";
import BookmarksHolder from "@entity/bookmarks/models/BookmarksHolder";
import IBookmarksListener from "@entity/bookmarks/models/IBookmarksListener";
import BaseViewModel from "@viewModels/BaseViewModel";
import BookmarkFolder from "@entity/bookmarks/models/BookmarkFolder";
import { generateNewBookmarksContainer } from "@utils/utils";
import Bookmark from "@entity/bookmarks/models/Bookmark";

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

	public onDeleteBookmarkClick(id: string): void {
		this.bookmarksUseCase.remove(id);
		this.resetBookmarkEditing();
		this.onBookmarksChanged();
	}

	public onDeleteFolderClick(id: string): void {
		this.isDeleteConfirmationOpen = true;
		this.idBookmarkFolderDeleting = id;
		this.notifyViewAboutChanges();
	}

	public onConfirmDeleteFolderClick(confirmation: boolean): void {
		if (!confirmation || !this.idBookmarkFolderDeleting) return;
		
		const bookmarkFolder = this.idBookmarkFolderDeleting;
		this.resetBookmarkFolderDeleting();
		this.bookmarksUseCase.removeFolder(bookmarkFolder);
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
		this.isBookmarkEditorOpen = true;
		this.idBookmarkEditing = bookmarkId;
		this.notifyViewAboutChanges();
	}

	public onSaveBookmarkClick(bookmark: Bookmark): void {
		if (!this.idBookmarkFolderEditing) return;

		this.bookmarksUseCase.add(this.idBookmarkFolderEditing, bookmark);
		this.resetBookmarkEditing();
		this.onBookmarksChanged();
	}

	private resetBookmarkFolderDeleting(): void {
		this.isDeleteConfirmationOpen = false;
		this.idBookmarkFolderDeleting = undefined;
	}

	private resetBookmarkEditing(): void {
		this.isBookmarkEditorOpen = false;
		this.idBookmarkEditing = undefined;
	}

	private resetFolderEditing(): void {
		this.isBookmarkFolderEditorOpen = false;
		this.idBookmarkFolderEditing = undefined;
	}

	public getEditingBookmark(): Bookmark | undefined {
		if (!this.idBookmarkEditing) return;
			
		return this.bookmarksUseCase.getByID(this.idBookmarkEditing);
	}
	
	public getFolderByID(id: string): BookmarkFolder | undefined {
		return this.bookmarksUseCase.getFolderByID(id);
	}

	public getEditingFolder(): BookmarkFolder | undefined {
		if (!this.idBookmarkFolderEditing) return;

		return this.bookmarksUseCase.getFolderByID(this.idBookmarkFolderEditing);
	}

	public onOpenFolderSaverClick(folderId?: string): void {
		if (folderId) {
			this.idBookmarkFolderEditing = folderId;
		} else {
			const newFolder = new BookmarkFolder();
			this.idBookmarkFolderEditing = newFolder.id;
			this.addFolder(newFolder);
		}
		this.isBookmarkFolderEditorOpen = true;
		this.onBookmarksChanged();
	}
	
	public onSaveFolderClick(bookmarkFolder: BookmarkFolder): void {
		this.bookmarksUseCase.addFolder(bookmarkFolder);
		this.resetFolderEditing();
		this.resetBookmarkEditing();
		this.onBookmarksChanged();
	}

	private addFolder(bookmarkFolder: BookmarkFolder): void {
		this.bookmarksUseCase.addFolder(bookmarkFolder);
		this.onBookmarksChanged();
	}

	public onBookmarksChanged(): void {
		this.bookmarks = this.bookmarksHolder.getBookmarks();
		this.notifyViewAboutChanges();
	}
}