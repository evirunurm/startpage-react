import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import IBookmarkFolder from "@domain/bookmarks/BookmarkFolder";
import IBookmark from "@domain/bookmarks/Bookmark";
import { generateUniqueId } from "@utils/utils";

const defaultBookmarkLibrary: IBookmarkLibrary = {
    bookmarkFolders: [
        {
            id: generateUniqueId(),
            name: "Folder 1",
            bookmarks: [
                { id: generateUniqueId(), name: "Bookmark 1", url: "https://www.google.com" },
                { id: generateUniqueId(), name: "Bookmark 2", url: "https://www.facebook.com" },
                { id: generateUniqueId(), name: "Bookmark 3", url: "https://www.twitter.com" }
            ] as IBookmark[],
            order: 1
        } as IBookmarkFolder,
        {
            id: generateUniqueId(),
            name: "Folder 2",
            bookmarks: [
                { id: generateUniqueId(), name: "Bookmark 4", url: "https://www.youtube.com" },
                { id: generateUniqueId(), name: "Bookmark 5", url: "https://www.linkedin.com" },
                { id: generateUniqueId(), name: "Bookmark 6", url: "https://www.instagram.com" }
            ] as IBookmark[],
            order: 2
        } as IBookmarkFolder
    ]
} as IBookmarkLibrary;

export default function BookmarkFactory() {

    const libraryHasFolderWithName = (name: string, library: IBookmarkLibrary): boolean => {
        return library.bookmarkFolders.some(folder => folder.name === name);
    }

    const libraryHasFolderWithId = (id: string, library: IBookmarkLibrary): boolean => {
        return library.bookmarkFolders.some(folder => folder.id === id);
    }

    const updateBookmarkFolderBookmarks = (folderId: string, newBookmarks: IBookmark[], library: IBookmarkLibrary): IBookmarkLibrary => {
        const newLibrary: IBookmarkLibrary = {
            bookmarkFolders: library.bookmarkFolders
                .map(folder => folder.id === folderId ?
                    {
                        ...folder,
                        bookmarks: newBookmarks
                    }
                    : folder)
        };
        return newLibrary;
    }

    const addBookmarkFolder = (name: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        if (libraryHasFolderWithName(name, library)) {
            throw new Error(`Folder with name ${name} already exists`);
        }
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: [...library.bookmarkFolders, { name, bookmarks: [], order: 0, id: generateUniqueId() } as IBookmarkFolder]
        };
        return newLibrary;
    }

    const deleteBookmarkFolder = (id: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        if (!libraryHasFolderWithId(id, library)) {
            throw new Error(`Folder with name ${id} doesn't exist`);
        }
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: library.bookmarkFolders.filter(folder => folder.id !== id)
        };
        return newLibrary;
    }

    const editBookmarkFolderName = (folderId: string, newName: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        if (!libraryHasFolderWithId(folderId, library)) {
            throw new Error(`Folder with id ${folderId} doesn't exist`);
        }
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: library.bookmarkFolders.map(folder =>
                folder.id === folderId ? { ...folder, name: newName } : folder
            )
        };
        return newLibrary;
    }

    const addBookmarkToFolder = (bookmarkName: string, bookmarkUrl: string, folderId: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: library.bookmarkFolders.map(folder =>
                folder.id === folderId
                    ? { ...folder, bookmarks: [...folder.bookmarks, { name: bookmarkName, url: bookmarkUrl, id: generateUniqueId() } as IBookmark] }
                    : folder
            )
        };
        return newLibrary;
    }

    const deleteBookmarkFromFolder = (bookmarkId: string, folderId: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: library.bookmarkFolders.map(folder =>
                folder.id === folderId
                    ? { ...folder, bookmarks: folder.bookmarks.filter(bookmark => bookmark.id !== bookmarkId) }
                    : folder
            )
        };
        return newLibrary;
    }

    const updateBookmarkFromFolder = (bookmarkId: string, newBookmark: IBookmark, folderId: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: library.bookmarkFolders.map(folder =>
                folder.id === folderId
                    ? { ...folder, bookmarks: folder.bookmarks.map(bookmark => bookmark.id === bookmarkId ? newBookmark : bookmark) }
                    : folder
            )
        };
        return newLibrary;
    }

    const getDefaultBookmarkLibrary = (): IBookmarkLibrary => defaultBookmarkLibrary;

    const getMaximumAmountOfFolders = (): number => 4;

    return {
        addBookmarkFolder,
        addBookmarkToFolder,
        deleteBookmarkFromFolder,
        updateBookmarkFromFolder,
        deleteBookmarkFolder,
        editBookmarkFolderName,
        getDefaultBookmarkLibrary,
        updateBookmarkFolderBookmarks,
        getMaximumAmountOfFolders
    };
}