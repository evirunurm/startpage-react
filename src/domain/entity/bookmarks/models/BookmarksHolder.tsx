import IBookmarkContainer from "../structures/IBookmarkContainer";
import IBookmarksListener from "./IBookmarksListener";

export default class BookmarksHolder {
	private listeners: IBookmarksListener[];
	private bookmarks?: IBookmarkContainer;

	public constructor() {
		this.listeners = [];
		this.bookmarks = undefined;
	}

	public onBookmarksChanged(bookmarks: IBookmarkContainer): void {
		this.bookmarks = bookmarks;
		this.notifyListeners();
	}

	public getBookmarks(): IBookmarkContainer | undefined  {
		return this.bookmarks;
	}

	public addBookmarksListener(factListener: IBookmarksListener): void {
		this.listeners.push(factListener);
	}

	public removeBookmarskListener(factListener: IBookmarksListener): void {
		this.listeners.splice(this.listeners.indexOf(factListener), 1);
	}

	private notifyListeners(): void {
		this.listeners.forEach((listener) => listener.onBookmarksChanged());
	}
}