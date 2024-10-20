import { useEffect } from "react";
import { BookmarkFolder } from "@components/bookmarkFolder/BookmarkFolder";

import { useLocalStorageState } from "@utils/utils";
import BookmarkFactory from "@application/BookmarkFactory";
import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";

export const BookmarkLibrary: React.FC = () => {
    const { editBookmarkFolderName, deleteBookmarkFolder, getDefaultBookmaekLibrary } = BookmarkFactory();
    const [ store, setState] = useLocalStorageState<IBookmarkLibrary>(LocalStorageType.BookmarkLibrary);

    const handleFolderNameEdit = (folderId: string, newFolderName: string) => {
        const newLibrary = editBookmarkFolderName(folderId, newFolderName, store!);
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
                    id={bookmarkFolder.id}
                    key={bookmarkFolder.id}
                    name={bookmarkFolder.name}
                    bookmarks={bookmarkFolder.bookmarks}
                    onEdit={handleFolderNameEdit}
                    onDelete={handleFolderDelete}
                />
            ))}
        </div>
    );
};