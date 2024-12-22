import { Bookmark } from "./bookmark/bookmark";
import IBookmark from "@domain/bookmarks/IBookmark";
import { IconPencil, IconX } from "@tabler/icons-react";
import { CircularButton } from "@components/atoms/circular-button/circular-button";
import styles from "./bookmark-folder.module.css";

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
	onDelete
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
		<div className={styles["bookmark-folder"]}>
			<div className={styles["bookmark-folder__title"]}>
				<h2 className={styles["bookmark-folder__title__text"]}>{name}</h2>
				<CircularButton
					tooltip="Delete folder"
					className={styles["bookmark-folder__title__delete-button"]}
					onPress={handleDeleteFolderClick}
				>
					<IconX size={21} />
				</CircularButton>
				<CircularButton
					tooltip="Edit folder"
					className={styles["bookmark-folder__title__edit-button"]}
					onPress={handleEditFolderClick}
					key={id}
				>
					<IconPencil size={21} />
				</CircularButton>
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
