import { Bookmark } from "@components/bookmark/Bookmark";
import { Button } from "@components/button/button";
import IBookmark from "@domain/bookmarks/Bookmark";

interface BookmarkFolderProps {
    name: string;
    bookmarks: IBookmark[];
    onEdit: (folderName: string, newFolder: string) => void;
    onDelete: (folderName: string) => void;
}

export const BookmarkFolder: React.FC<BookmarkFolderProps> = ({ name, bookmarks, onEdit, onDelete }) => {

    const handleEditFolderClick = () => {
        onEdit(name, 'New Name');
    }

    const handleDeleteFolderClick = () => {
        onDelete(name);
    }
    
    return (
        <div>
            <div>
                <h2>{name}</h2>
                <Button
                 label={`Edit '${name}'`}
                 onPress={handleEditFolderClick}
                 key={name}
                 />
                <Button
                label={`Delete '${name}'`}
                onPress={handleDeleteFolderClick}
                />
            </div>
            {bookmarks.map((bookmark) => (
                <Bookmark 
                    key={bookmark.name}
                    name={bookmark.name}
                    url={bookmark.url}
                />
            ))}
        </div>
    );
};