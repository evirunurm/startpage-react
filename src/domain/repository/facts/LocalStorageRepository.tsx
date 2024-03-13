import IBookmarkContainer from "../../entity/bookmarks/structures/IBookmarkContainer";

// This is a repository that stores user data to Local Storage
export default interface ILocalStorageRepository {  
  getImage(): void;
  saveImage(): void;

  getColors(): void;
  saveColors(): void;

  getBookmarks(): IBookmarkContainer | undefined;
  saveBookmarks(bookmarks : IBookmarkContainer): void;
}