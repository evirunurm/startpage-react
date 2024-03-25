import BookmarkFolder from "../../../domain/entity/bookmarks/models/BookmarkFolder";
import IBookmarkContainer from "../../../domain/entity/bookmarks/structures/IBookmarkContainer";
import IBaseViewModel from "../IBaseViewModel";

export default interface IBookmarksViewModel extends IBaseViewModel {
    bookmarks?: IBookmarkContainer;
    bookmarkFolderEditorOpen: boolean;
    bookmarkFolderIdEditing?: string;

    onOpenFolderCreatorClick(folderId?: string): void;
    onSaveFolderClick(bookmarkFolder: BookmarkFolder): void;
    getEditingFolder(): BookmarkFolder | undefined ;
    getFolderByID(id: string): BookmarkFolder | undefined ;
}