import { Input } from "@components/atoms/input/input";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import IBookmark from "@domain/bookmarks/IBookmark";
import IBookmarkLibrary from "@domain/bookmarks/IBookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { useState } from "react";
import IBookmarkFolder from "@domain/bookmarks/IBookmarkFolder";
import styles from "./bookmark-folder-editor.module.css";
import { CircularButton } from "@components/atoms/circular-button/circular-button";
import { IconPlus } from "@tabler/icons-react";
import { Message } from "@components/atoms/message/message";
import { ModalContainer } from "@components/atoms/modal-container/modal-container";
import { DraggableBookmarks } from "./draggable-bookmarks/draggable-bookmarks";
import BookmarkLibraryFactory from "@application/bookmarks/bookmark-library.factory";
import BookmarkFolderFactory from "@application/bookmarks/bookmark-folder.factory";

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
		getFolderById
	} = BookmarkLibraryFactory();

	const {
		createNewBookmark,
		deleteBookmark,
		updateBookmark,
		setBookmarks
	} = BookmarkFolderFactory();

	const [store, setState] = useLocalStorageState<IBookmarkLibrary>(
		LocalStorageType.BookmarkLibrary
	);
	const [folderName, setFolderName] = useState<string>(name);

	const handleAddBookmark = () => {
		if (!store) return;
		const newLibrary = createNewBookmark(folderId, store);
		setState(newLibrary);
		const updatedFolder = getFolderById(folderId, newLibrary);
		if (updatedFolder) {
			onBookmarksUpdate(updatedFolder);
		}
	};

	const handleDeleteBookmark = (bookmarkId: string) => {
		if (!store) return;
		const newLibrary = deleteBookmark(
			bookmarkId,
			folderId,
			store
		);
		const updatedFolder = getFolderById(folderId, newLibrary);
		if (updatedFolder) {
			onBookmarksUpdate(updatedFolder);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onNameSave(folderId, folderName);
		}
	};

	const handleSaveBookmark = (newBookmark: IBookmark) => {
		if (!store) return;

		const newLibrary = updateBookmark(
			newBookmark,
			folderId,
			store
		);
		setState(newLibrary);
		const updatedFolder = getFolderById(folderId, newLibrary);
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

	const handleBookmarksReorder = (reorderedBookmarks: IBookmark[]) => {
		const updateLibrary = setBookmarks(reorderedBookmarks, folderId, store!);
		onBookmarksUpdate(updateLibrary.bookmarkFolders.find((folder) => folder.id === folderId)!);
		setState(updateLibrary);
	};

	return (
		<ModalContainer
			initialPosition="center"
		>
			<div className={styles["bookmark-folder-editor"]}>
				<div>
					<Input
						name={folderName}
						value={folderName}
						type="text"
						key={`${folderId}-name-edit`}
						onKeyDown={handleKeyPress}
						onChange={handleNameChange}
					/>
					{folderName !== name &&
						<Message>Enter to save changes</Message>
					}
				</div>
				<DraggableBookmarks
					bookmarks={bookmarks}
					onDeleteBookmark={handleDeleteBookmark}
					onSaveBookmark={handleSaveBookmark}
					onFolderReorder={handleBookmarksReorder}
				/>
				<CircularButton
					className={styles["bookmark-folder-editor__add-button"]}
					onPress={handleAddBookmark}
					tooltip="Add bookmark"
					tooltipPlacement="end"
				>
					<IconPlus size={21} />
				</CircularButton>
			</div>

		</ModalContainer>
	);
};
