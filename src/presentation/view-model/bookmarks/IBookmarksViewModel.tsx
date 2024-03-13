import BookmarkFolder from "../../../domain/entity/bookmarks/models/BookmarkFolder";
import IBookmarkContainer from "../../../domain/entity/bookmarks/structures/IBookmarkContainer";
import IBaseViewModel from "../IBaseViewModel";

export default interface IBookmarksViewModel extends IBaseViewModel {
    bookmarks?: IBookmarkContainer;
    bookmarkFolderEditorOpen: boolean;

    onOpenFolderCreatorClick(): void;
    onCreateFolderClick(bookmarkFolder: BookmarkFolder): void;
    getFolderByID(id: string): BookmarkFolder | undefined ;
}