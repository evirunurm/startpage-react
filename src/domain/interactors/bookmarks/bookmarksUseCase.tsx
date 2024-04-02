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
		
		if (bookmarks) {
			const folder = bookmarks.bookmarkFolders.find(folder => folder.id === bookmarkFolderId);

			if (folder) {
				const existingBookmark = folder.bookmarks.find(bm => bm.id === bookmark.id);
				if (existingBookmark) {
					console.log('Updaing existing bookmark', existingBookmark)
					existingBookmark.name = bookmark.name;
					existingBookmark.order = bookmark.order;
					existingBookmark.url = bookmark.url;
					this.localStorageRepository.saveBookmarks(bookmarks);
				} else {
					console.log('Inserting new bookmark', bookmark)
					folder.bookmarks.push(bookmark);
					this.localStorageRepository.saveBookmarks(bookmarks);
				}
				this.bookmarksHolder.onBookmarksChanged(bookmarks);
			}
		}
	}

	public removeFolder(bookmarkFolderId: string): void {
		const bookmarks : IBookmarkContainer | undefined = this.localStorageRepository.getBookmarks();
		if (bookmarks) {
			const folderIndex = bookmarks.bookmarkFolders.findIndex(folder => folder.id === bookmarkFolderId);
			if (folderIndex > -1) {
				bookmarks.bookmarkFolders.splice(folderIndex, 1);
				this.localStorageRepository.saveBookmarks(bookmarks);
				this.bookmarksHolder.onBookmarksChanged(bookmarks);
			}
		}
	}

	public saveContainer(bookmarkContainer: IBookmarkContainer): void {
		this.localStorageRepository.saveBookmarks(bookmarkContainer);
		this.bookmarksHolder.onBookmarksChanged(bookmarkContainer);
	}

	public addFolder(bookmarkFolder: BookmarkFolder): void {
		const bookmarks : IBookmarkContainer | undefined  = this.localStorageRepository.getBookmarks();
		console.log('Adding BookmarkFolder', bookmarks)
		if (bookmarks) {
			const folder = bookmarks.bookmarkFolders.find(folder => folder.id === bookmarkFolder.id);
			if (folder) {
				folder.bookmarks = bookmarkFolder.bookmarks;
				folder.name = bookmarkFolder.name;
				folder.order = bookmarkFolder.order;
				this.localStorageRepository.saveBookmarks(bookmarks);
			} else {
				bookmarks.bookmarkFolders.push(bookmarkFolder);
				this.localStorageRepository.saveBookmarks(bookmarks);
				this.bookmarksHolder.onBookmarksChanged(bookmarks);
			}
		}
	}

	public getFolderByID(id: string): BookmarkFolder | undefined {
		const bookmarks : IBookmarkContainer | undefined  = this.localStorageRepository.getBookmarks();

		if (bookmarks) {
			const folder = bookmarks.bookmarkFolders.find(folder => folder.id === id);
			return folder;
		}
		return undefined;
	}

	public getByID(id: string): Bookmark | undefined {
		const bookmarksContainer : IBookmarkContainer | undefined  = this.localStorageRepository.getBookmarks();

		if (bookmarksContainer) {
			// Flatten all the folders and bookmarks
			const flatBookmarks: IBookmark[] = bookmarksContainer.bookmarkFolders
				.flatMap(folder => folder.bookmarks);
	
			// Find the bookmark with the given id
			const bookmark: Bookmark | undefined = flatBookmarks
				.find(bookmark => bookmark.id === id);
	
			return bookmark;
		}

		return undefined;
	}
	
}