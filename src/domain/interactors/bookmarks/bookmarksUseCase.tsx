import { generateNewBookmarksContainer } from '../../../utils/utils';
import Bookmark from '../../entity/bookmarks/models/Bookmark'
import BookmarkFolder from '../../entity/bookmarks/models/BookmarkFolder';
import BookmarksHolder from '../../entity/bookmarks/models/BookmarksHolder';
import IBookmark from '../../entity/bookmarks/structures/IBookmark';
import IBookmarkContainer from '../../entity/bookmarks/structures/IBookmarkContainer';
import ILocalStorageRepository from '../../repository/facts/LocalStorageRepository';

export default class BookmarksUseCase {
	private localStorageRepository: ILocalStorageRepository;
	private bookmarksHolder: BookmarksHolder;

	public constructor(localStorageRepository: ILocalStorageRepository,
		bookmarksHolder: BookmarksHolder) {
		this.localStorageRepository = localStorageRepository;
		this.bookmarksHolder = bookmarksHolder;
		this.syncronize();
	}

	public syncronize(): void {
		const bookmarks : IBookmarkContainer | undefined = this.localStorageRepository.getBookmarks();
		if (bookmarks) {
			this.bookmarksHolder.onBookmarksChanged(bookmarks);
		} else {
			const newEmptyBookmarks = generateNewBookmarksContainer();
			this.saveContainer(newEmptyBookmarks);
		}
	}

	public add(bookmarkFolderId: string, bookmark: Bookmark): void {
		const bookmarks : IBookmarkContainer | undefined = this.localStorageRepository.getBookmarks();
		if (!bookmarks) return;
		
		const folder = bookmarks.bookmarkFolders.find(folder => folder.id === bookmarkFolderId);
		if (!folder) return;
		
		const existingBookmark = folder.bookmarks.find(bm => bm.id === bookmark.id);
		if (existingBookmark) {
			existingBookmark.name = bookmark.name;
			existingBookmark.order = bookmark.order;
			existingBookmark.url = bookmark.url;
			this.localStorageRepository.saveBookmarks(bookmarks);
		} else {
			folder.bookmarks.push(bookmark);
			this.localStorageRepository.saveBookmarks(bookmarks);
		}
		this.bookmarksHolder.onBookmarksChanged(bookmarks);
	}

	public remove(bookmarkId: string): void {
		const bookmarks : IBookmarkContainer | undefined = this.localStorageRepository.getBookmarks();
		if (!bookmarks) return;

		const folderWithBookmark = bookmarks.bookmarkFolders.find(folder =>
			folder.bookmarks.some(bookmark => bookmark.id === bookmarkId)
		);
	
		if (!folderWithBookmark) return;

		const bookmarkIndex = folderWithBookmark.bookmarks.findIndex(bookmark => bookmark.id === bookmarkId);
		if (bookmarkIndex === -1) return;
	
		folderWithBookmark.bookmarks.splice(bookmarkIndex, 1);
		this.localStorageRepository.saveBookmarks(bookmarks);
		this.bookmarksHolder.onBookmarksChanged(bookmarks);
	}

	public removeFolder(bookmarkFolderId: string): void {
		const bookmarks : IBookmarkContainer | undefined = this.localStorageRepository.getBookmarks();
		if (!bookmarks) return;

		const folderIndex = bookmarks.bookmarkFolders
			.findIndex(folder => folder.id === bookmarkFolderId);
		if (folderIndex > -1) {
			bookmarks.bookmarkFolders.splice(folderIndex, 1);
			this.localStorageRepository.saveBookmarks(bookmarks);
			this.bookmarksHolder.onBookmarksChanged(bookmarks);
		}
	}

	public saveContainer(bookmarkContainer: IBookmarkContainer): void {
		this.localStorageRepository.saveBookmarks(bookmarkContainer);
		this.bookmarksHolder.onBookmarksChanged(bookmarkContainer);
	}

	public addFolder(bookmarkFolder: BookmarkFolder): void {
		const bookmarks : IBookmarkContainer | undefined  = this.localStorageRepository.getBookmarks();
		if (!bookmarks) return;

		const folder = bookmarks.bookmarkFolders
			.find(folder => folder.id === bookmarkFolder.id);
		if (folder) {
			folder.bookmarks = bookmarkFolder.bookmarks;
			folder.name = bookmarkFolder.name;
			folder.order = bookmarkFolder.order;
			this.localStorageRepository.saveBookmarks(bookmarks);
		} else {
			bookmarks.bookmarkFolders.push(bookmarkFolder);
			this.localStorageRepository.saveBookmarks(bookmarks);
		}
		this.bookmarksHolder.onBookmarksChanged(bookmarks);
	}

	public getFolderByID(id: string): BookmarkFolder | undefined {
		const bookmarks : IBookmarkContainer | undefined  = this.localStorageRepository.getBookmarks();
		if (!bookmarks) return;

		const folder = bookmarks.bookmarkFolders
			.find(folder => folder.id === id);
		return folder;
	}

	public getByID(id: string): Bookmark | undefined {
		const bookmarks : IBookmarkContainer | undefined  = this.localStorageRepository.getBookmarks();
		if (!bookmarks) return;

		const flatBookmarks: IBookmark[] = bookmarks.bookmarkFolders
			.flatMap(folder => folder.bookmarks);
		const bookmark: Bookmark | undefined = flatBookmarks
			.find(bookmark => bookmark.id === id);
		return bookmark;
	}
	
}