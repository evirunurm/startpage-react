import { Bookmark } from "@components/bookmark/Bookmark";
import { Button } from "@components/atoms/button/button";
import IBookmark from "@domain/bookmarks/Bookmark";

interface BookmarkFolderProps {
	id: string;
	name: string;
	bookmarks: IBookmark[];
	onDelete: (folderName: string) => void;
	onEditClick: (folderId: string) => void;
}

export const BookmarkFolder: React.FC<BookmarkFolderProps> = ({
	id,
	name,
	bookmarks,
	onEditClick,
	onDelete,
}) => {
	const handleEditFolderClick = () => {
		onEditClick(id);
	};

	const handleDeleteFolderClick = () => {
		if (
			window.confirm(
				`Are you sure you want to delete the folder '${name}'?`
			)
		) {
			onDelete(id);
		}
	};

	return (
		<div>
			<div>
				<h2>{name}</h2>
				<Button
					onPress={handleEditFolderClick}
					key={id}
				>{`Edit '${name}'`}</Button>
				<Button
					onPress={handleDeleteFolderClick}
				>{`Delete '${name}'`}</Button>
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
