import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import IBookmarkFolder from "@domain/bookmarks/BookmarkFolder";
import IBookmark from "@domain/bookmarks/Bookmark";
const defaultBookmarkLibrary: IBookmarkLibrary = {
    bookmarkFolders: [
        {
            name: "Folder 1",
            bookmarks: [
                { name: "Bookmark 1", url: "https://www.google.com" },
                { name: "Bookmark 2", url: "https://www.facebook.com" },
                { name: "Bookmark 3", url: "https://www.twitter.com" }
            ] as IBookmark[],
            order: 1
        } as IBookmarkFolder,
        {
            name: "Folder 2",
            bookmarks: [
                { name: "Bookmark 4", url: "https://www.youtube.com" },
                { name: "Bookmark 5", url: "https://www.linkedin.com" },
                { name: "Bookmark 6", url: "https://www.instagram.com" }
            ] as IBookmark[],
            order: 2
        } as IBookmarkFolder
    ]
} as IBookmarkLibrary;

export default function useBookmarksLoader() {
    
    const libraryHasFolderWithName = (name: string, library: IBookmarkLibrary): boolean => {
        return library.bookmarkFolders.some(folder => folder.name === name);
    }

    const folderHasBookmarkWithName = (bookmarkName: string, folderName: string, library: IBookmarkLibrary): boolean => {
        return library.bookmarkFolders
            .some(folder => folder.name === folderName
                && folder.bookmarks
                    .some(bookmark => bookmark.name === bookmarkName));
    }
    
    const addBookmarkFolder = (name: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        if (libraryHasFolderWithName(name, library)) {
            throw new Error(`Folder with name ${name} already exists`);
        }
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: library.bookmarkFolders.filter(folder => folder.name !== name)
        };
        return newLibrary;
    }

    const deleteBookmarkFolder = (name: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        if (!libraryHasFolderWithName(name, library)) {
            throw new Error(`Folder with name ${name} doesn't exist`);
        }
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: library.bookmarkFolders.filter(folder => folder.name !== name)
        };
        return newLibrary;
    }

    const editBookmarkFolderName =(oldName: string, newName: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        if (!libraryHasFolderWithName(oldName, library)) {
            throw new Error(`Folder with name ${oldName} doesn't exist`);
        }
        if (libraryHasFolderWithName(newName, library)) {
            throw new Error(`Folder with name ${newName} already exists`);
        }
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: library.bookmarkFolders.map(folder =>
                folder.name === oldName ? { ...folder, name: newName } : folder
            )
        };
        return newLibrary;
    }

    const addBookmarkToFolder = (bookmarkName: string, bookmarkUrl: string, folderName: string, library: IBookmarkLibrary): IBookmarkLibrary => {
        if (folderHasBookmarkWithName(bookmarkName, folderName, library)) {
            throw new Error(`Bookmark with name ${bookmarkName} already exists in folder ${folderName}`);
        }
        const newLibrary: IBookmarkLibrary = {
            ...library,
            bookmarkFolders: library.bookmarkFolders.map(folder =>
                folder.name === folderName
                    ? { ...folder, bookmarks: [...folder.bookmarks, { name: bookmarkName, url: bookmarkUrl } as IBookmark] }
                    : folder
            )
        };
        return newLibrary;
    }

    const getDefaultBookmaekLibrary = (): IBookmarkLibrary => defaultBookmarkLibrary;

    return {
        addBookmarkFolder,
        addBookmarkToFolder,
        deleteBookmarkFolder,
        editBookmarkFolderName,
        getDefaultBookmaekLibrary
    };
}