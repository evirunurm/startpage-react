import IBookmark from "./Bookmark";

export default interface IBookmarkFolder {
    id: string;
    name: string;
    bookmarks: IBookmark[];
    order: number;
}