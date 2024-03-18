import BookmarkFolder from "../../../domain/entity/bookmarks/models/BookmarkFolder";
import IBookmarkContainer from "../../../domain/entity/bookmarks/structures/IBookmarkContainer";
import IBaseViewModel from "../IBaseViewModel";

export default interface IBookmarksViewModel extends IBaseViewModel {
    bookmarks?: IBookmarkContainer;
    bookmarkFolderEditorOpen: boolean;
    bookmarkFolderIdEditing?: string;

    onOpenFolderCreatorClick(folderId?: string): void;
    onCreateFolderClick(bookmarkFolder: BookmarkFolder): void;
    getFolderByID(id: string): BookmarkFolder | undefined ;
}