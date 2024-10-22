import { Bookmark } from "@components/bookmark/Bookmark";
import { Button } from "@components/button/button";
import IBookmark from "@domain/bookmarks/Bookmark";

interface BookmarkFolderProps {
    id: string;
    name: string;
    bookmarks: IBookmark[];
    onDelete: (folderName: string) => void;
    onEditClick: (folderId: string) => void;
}

export const BookmarkFolder: React.FC<BookmarkFolderProps> = ({ id, name, bookmarks, onEditClick, onDelete }) => {

    const handleEditFolderClick = () => {
        onEditClick(id);
    }

    const handleDeleteFolderClick = () => {
        onDelete(id);
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
        </div>
    );
};