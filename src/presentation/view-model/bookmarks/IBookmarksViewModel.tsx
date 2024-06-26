import Bookmark from "../../../domain/entity/bookmarks/models/Bookmark";
import BookmarkFolder from "../../../domain/entity/bookmarks/models/BookmarkFolder";
import IBookmarkContainer from "../../../domain/entity/bookmarks/structures/IBookmarkContainer";
import IBaseViewModel from "../IBaseViewModel";

export default interface IBookmarksViewModel extends IBaseViewModel {
    bookmarks?: IBookmarkContainer;
    isBookmarkFolderEditorOpen: boolean;
    idBookmarkFolderEditing?: string;
    isBookmarkEditorOpen: boolean;
    idBookmarkEditing?: string;
    isDeleteConfirmationOpen: boolean;
    idBookmarkFolderDeleting?: string;

    onOpenBookmarkSaverClick(bookmarkId?: string): void;
    onOpenFolderSaverClick(folderId?: string): void;
    onSaveBookmarkClick(bookmark: Bookmark): void;
    onSaveFolderClick(bookmarkFolder: BookmarkFolder): void;
    getEditingBookmark(): Bookmark | undefined ;
    getEditingFolder(): BookmarkFolder | undefined ;
    getFolderByID(id: string): BookmarkFolder | undefined ;
    onDeleteFolderClick(id: string): void;
    onConfirmDeleteFolderClick(confirmation: boolean): void;
	onCloseFolderEditor(): void;
	onCloseBookmarkEditor(): void;
    onDeleteBookmarkClick(id: string): void;
}