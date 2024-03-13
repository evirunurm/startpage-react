import { generateNewBookmarksContainer } from '../../../utils/utils';
import Bookmark from '../../entity/bookmarks/models/Bookmark'
import BookmarkFolder from '../../entity/bookmarks/models/BookmarkFolder';
import BookmarksHolder from '../../entity/bookmarks/models/BookmarksHolder';
import IBookmarkContainer from '../../entity/bookmarks/structures/IBookmarkContainer';
import ILocalStorageRepository from '../../repository/facts/LocalStorageRepository';

export default class BookmarksUseCase {
	private localStorageRepository: ILocalStorageRepository;
	private bookmarksHolder: BookmarksHolder;

	public constructor(localStorageRepository: ILocalStorageRepository,
		bookmarksHolder: BookmarksHolder) {
		this.localStorageRepository = localStorageRepository;
		this.bookmarksHolder = bookmarksHolder;
		this.syncronizeBookmarks();
	}

	public syncronizeBookmarks(): void {
		const bookmarks : IBookmarkContainer | undefined = this.localStorageRepository.getBookmarks();
		if (bookmarks) {
			this.bookmarksHolder.onBookmarksChanged(bookmarks);
		} else {
			const newEmptyBookmarks = generateNewBookmarksContainer();
			this.saveBookmarkContainer(newEmptyBookmarks);
		}
	}

	public addBookmark(bookmarkFolderId: string, name: string, url: string): void {
		const bookmarks : IBookmarkContainer | undefined = this.localStorageRepository.getBookmarks();
		
		if (bookmarks) {
			const folder = bookmarks.bookmarkFolders.find(folder => folder.id === bookmarkFolderId);

			if (folder) {
				const newBookmark = new Bookmark(name, url);
				folder.bookmarks.push(newBookmark);
				this.localStorageRepository.saveBookmarks(bookmarks);
				this.bookmarksHolder.onBookmarksChanged(bookmarks);
			}
		}
	}

	public saveBookmarkContainer(bookmarkContainer: IBookmarkContainer): void {
		this.localStorageRepository.saveBookmarks(bookmarkContainer);
		this.bookmarksHolder.onBookmarksChanged(bookmarkContainer);
	}

	public addBookmarkFolder(bookmarkFolder: BookmarkFolder): void {
		const bookmarks : IBookmarkContainer | undefined  = this.localStorageRepository.getBookmarks();
		console.log(bookmarks)
		if (bookmarks) {
			bookmarks.bookmarkFolders.push(bookmarkFolder);
			this.localStorageRepository.saveBookmarks(bookmarks);
			this.bookmarksHolder.onBookmarksChanged(bookmarks);
		}
	}

	public getBookmarkFolderByID(id: string): BookmarkFolder | undefined {
		const bookmarks : IBookmarkContainer | undefined  = this.localStorageRepository.getBookmarks();

		if (bookmarks) {
			const folder = bookmarks.bookmarkFolders.find(folder => folder.id === id);
			return folder;
		}
		return undefined;
	}
}