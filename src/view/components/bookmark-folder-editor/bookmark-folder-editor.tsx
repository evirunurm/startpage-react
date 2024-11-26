import { BookmarkEditor } from "@components/bookmark-editor/bookmark-editor";
import { Button } from "@components/atoms/button/button";
import { Input } from "@components/atoms/input/input";
import BookmarkFactory from "@application/BookmarkFactory";
import { useLocalStorageState } from "@utils/utils";
import IBookmark from "@domain/bookmarks/Bookmark";
import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import { useState } from "react";
import IBookmarkFolder from "@domain/bookmarks/BookmarkFolder";
import styles from "./bookmark-folder-editor.module.css";
import { CircularButton } from "@components/atoms/circular-button/circular-button";
import { IconPlus } from "@tabler/icons-react";

interface BookmarkFolderEditorProps {
	folderId: string;
	name: string;
	bookmarks: IBookmark[];
	onNameSave: (folderId: string, newFolderName: string) => void;
	onBookmarksUpdate: (updatedFolder: IBookmarkFolder) => void;
}

export const BookmarkFolderEditor: React.FC<BookmarkFolderEditorProps> = ({
	folderId,
	name,
	bookmarks,
	onNameSave,
	onBookmarksUpdate,
}) => {
	const {
		addBookmarkToFolder,
		deleteBookmarkFromFolder,
		updateBookmarkFromFolder,
	} = BookmarkFactory();
	const [store, setState] = useLocalStorageState<IBookmarkLibrary>(
		LocalStorageType.BookmarkLibrary
	);
	const [folderName, setFolderName] = useState<string>(name);

	const handleAddBookmark = () => {
		const newLibrary = addBookmarkToFolder(
			"New Bookmark",
			"",
			folderId,
			store!
		);
		setState(newLibrary);
		const updatedFolder = newLibrary.bookmarkFolders.find(
			(folder) => folder.id === folderId
		);
		if (updatedFolder) {
			onBookmarksUpdate(updatedFolder);
		}
	};

	const handleDeleteBookmark = (bookmarkId: string) => {
		const newLibrary = deleteBookmarkFromFolder(
			bookmarkId,
			folderId,
			store!
		);
		const updatedFolder = newLibrary.bookmarkFolders.find(
			(folder) => folder.id === folderId
		);
		if (updatedFolder) {
			onBookmarksUpdate(updatedFolder);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			console.log("Save folder name:" + folderName);
			onNameSave(folderId, folderName);
		}
	};

	const handleSaveBookmark = (bookmarkId: string, newBookmark: IBookmark) => {
		const newLibrary = updateBookmarkFromFolder(
			bookmarkId,
			newBookmark,
			folderId,
			store!
		);
		console.log("newBookmark", newBookmark);
		setState(newLibrary);
		const updatedFolder = newLibrary.bookmarkFolders.find(
			(folder) => folder.id === folderId
		);
		if (updatedFolder) {
			onBookmarksUpdate(updatedFolder);
		}
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.value) {
			setFolderName(e.currentTarget.value);
		} else {
			// Show error message
		}
		// Check whether the name is valid
		// Check whether there's been changes on bookmark links.
		const newFolderName = e.currentTarget.value;
		setFolderName(newFolderName);
	};

	return (
		<section className={styles["bookmark-folder-editor"]}>
			<div>
				<Input
					name={folderName}
					value={folderName}
					type="text"
					key={`${folderId}-name-edit`}
					onKeyDown={handleKeyPress}
					onChange={handleNameChange}
				/>
			</div>

			{bookmarks?.map((bookmark) => (
				<BookmarkEditor
					id={bookmark.id}
					key={bookmark.id}
					name={bookmark.name}
					url={bookmark.url}
					onDelete={handleDeleteBookmark}
					onSave={handleSaveBookmark}
				/>
			))}
			<CircularButton
				className={styles["bookmark-folder-editor__add-button"]}
				onPress={handleAddBookmark}
				tooltip="Add bookmark"
				tooltipPlacement="end"
			>
				<IconPlus size={21} />
			</CircularButton>
		</section>
	);
};
