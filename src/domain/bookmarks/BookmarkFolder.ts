import IBookmark from "./Bookmark";

export default interface IBookmarkFolder {
    name: string;
    bookmarks: IBookmark[];
    order: number;
}