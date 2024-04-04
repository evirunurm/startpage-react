import IBookmarkContainer from '../../domain/entity/bookmarks/structures/IBookmarkContainer';
import ILocalStorageRepository from '../../domain/repository/facts/LocalStorageRepository';

// Class that imitates access to the Cat Facts API
export default class LocalStorageRepository implements ILocalStorageRepository {
	private bookmarksRef: string;

    constructor() {
        this.bookmarksRef = 'RETROPAGE_BOOKMARKS';
    }

	getImage(): void {
		throw new Error('Method not implemented.');
	}

	saveImage(): void {
		throw new Error('Method not implemented.');
	}

	getColors(): void {
		throw new Error('Method not implemented.');
	}

	saveColors(): void {
		throw new Error('Method not implemented.');
	}

	getBookmarks(): IBookmarkContainer | undefined {
		const bookmarksString = localStorage.getItem(this.bookmarksRef);
		if (bookmarksString) {
			const bookmarks: IBookmarkContainer = JSON.parse(bookmarksString) as IBookmarkContainer;
			return bookmarks;
		}
	}

	saveBookmarks(bookmarks: IBookmarkContainer): void {
		const bookmarksString: string = JSON.stringify(bookmarks);
		localStorage.setItem(this.bookmarksRef, bookmarksString);
	}
}