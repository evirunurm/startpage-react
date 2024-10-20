import { Bookmark } from "@components/bookmark/Bookmark";
import { BookmarkFolderEditor } from "@components/bookmarkFolderEditor/BookmarkFolderEditor";
import { Button } from "@components/button/button";
import IBookmark from "@domain/bookmarks/Bookmark";
import { useState } from "react";

interface BookmarkFolderProps {
    id: string;
    name: string;
    bookmarks: IBookmark[];
    onEdit: (folderId: string, newFolderName: string) => void;
    onDelete: (folderName: string) => void;
}

export const BookmarkFolder: React.FC<BookmarkFolderProps> = ({ id, name, bookmarks, onEdit, onDelete }) => {

    const [isEditing, setIsEditing ] = useState(false);

    const handleEditFolderClick = () => {
        setIsEditing(true);
        console.log(`Edit folder ${name}`);
    }

    const handleDeleteFolderClick = () => {
        onDelete(id);
    }

    const handleFolderNameSave = (folderId: string, newFolderName: string) => {
        onEdit(folderId, newFolderName);
        setIsEditing(false);
    }
    
    return (
        <div>
            <div>
                <h2>{name}</h2>
                <Button
                 label={`Edit '${name}'`}
                 onPress={handleEditFolderClick}
                 key={id}
                 />
                <Button
                label={`Delete '${name}'`}
                onPress={handleDeleteFolderClick}
                />
            </div>
            {bookmarks.map((bookmark) => (
                <Bookmark 
                    key={bookmark.id}
                    name={bookmark.name}
                    url={bookmark.url}
                />
            ))}

                {isEditing &&
                        <BookmarkFolderEditor
                            key={id}
                            id={id}
                            name={name}
                            bookmarks={bookmarks}
                            onNameSave={handleFolderNameSave}
                    />
                }
           
        </div>
    );
};