import { useEffect } from "react";
import { BookmarkFolder } from "@components/bookmarkFolder/BookmarkFolder";

import { useLocalStorageState } from "@utils/utils";
import useBookmarksLoader from "@application/BookmarksLoader";
import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";

export const BookmarkLibrary: React.FC = () => {
    const { editBookmarkFolderName, deleteBookmarkFolder, getDefaultBookmaekLibrary } = useBookmarksLoader();
    // const [ store, setLibraryState ] = useLibraryState();
    const [ store, setState] = useLocalStorageState<IBookmarkLibrary>(LocalStorageType.BookmarkLibrary);

    const handleFolderEdit = (oldFolderName: string, newFolderName: string) => {
        const newLibrary = editBookmarkFolderName(oldFolderName, newFolderName, store!);
        setState(newLibrary);
    }

    const handleFolderDelete = (folderName: string) => {
        const newLibrary = deleteBookmarkFolder(folderName, store!);
        setState(newLibrary);
    }

    useEffect(() => {
        if (!store) {
            setState(getDefaultBookmaekLibrary());
        }
    }, [store , getDefaultBookmaekLibrary, setState]);
    

    return (
        <div>
            {store?.bookmarkFolders?.map((bookmarkFolder) => (
                <BookmarkFolder
                    key={bookmarkFolder.name}
                    name={bookmarkFolder.name}
                    bookmarks={bookmarkFolder.bookmarks}
                    onEdit={handleFolderEdit}
                    onDelete={handleFolderDelete}
                />
            ))}
        </div>
    );
};