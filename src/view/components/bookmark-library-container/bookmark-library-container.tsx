import { useEffect, useState } from "react";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import BookmarkFolderFactory from "@application/bookmarks/bookmark-folder.factory";
import BookmarkLibraryFactory from "@application/bookmarks/bookmark-library.factory";
import IBookmarkLibrary from "@domain/bookmarks/IBookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import IBookmarkFolder from "@domain/bookmarks/IBookmarkFolder";
import { BookmarkFolderEditor } from "@components/bookmark-folder-editor/bookmark-folder-editor";
import styles from "./bookmark-library-container.module.css";
import { Modal } from "@components/atoms/modal/modal";
import { BookmarkLibrary } from "@components/bookmark-library/bookmark-library";
import { CircularButton } from "@components/atoms/circular-button/circular-button";
import { IconPlus } from "@tabler/icons-react";

export const BookmarkLibraryContainer: React.FC = () => {
	const {
		maxAmountFolders,
		getDefaultBookmarkLibrary,
		editFolderName,
		createNewFolder,
		deleteFolder,
		getFolderById
	} = BookmarkLibraryFactory();

	const {
		setBookmarks,
	} = BookmarkFolderFactory();

	const [store, setStore] = useLocalStorageState<IBookmarkLibrary>(
		LocalStorageType.BookmarkLibrary
	);
	const [editingFolder, setEditingFolder] = useState<IBookmarkFolder | null>(
		null
	);
	const [amountFolders, setAmountFolders] = useState<number | undefined>(undefined);

	const handleFolderNameSave = (folderId: string, newFolderName: string) => {
		if (!store) return;
		const newLibrary = editFolderName(
			newFolderName,
			folderId,
			store
		);
		setStore(newLibrary);
		setEditingFolder(null);
	};

	const handleFolderEditClick = (folderId: string) => {
		if (!store) return;
		const folder = getFolderById(folderId, store);
		if (folder) {
			setEditingFolder(folder);
		}
	};

	const handleFolderDelete = (folderId: string) => {
		if (!store) return;
		const newLibrary = deleteFolder(folderId, store);
		setStore(newLibrary);
		setEditingFolder(null);
	};

	const handleAddNewFolder = () => {
		if (!store) return;
		try {
			const newLibrary = createNewFolder(store);
			setStore(newLibrary);
			setEditingFolder(newLibrary.bookmarkFolders[
				newLibrary.bookmarkFolders.length - 1
			]);
		} catch (error) {
			console.error(error);
			// TODO: Show error message
		}
	};

	const handleBookmarksUpdate = (updatedFolder: IBookmarkFolder) => {
		if (!store) return;
		const newLibrary = setBookmarks(updatedFolder.bookmarks, updatedFolder.id, store);
		setStore(newLibrary);
		setEditingFolder(updatedFolder);
	};

	const handleOpenEditorChange = (isOpen: boolean) => {
		if (!isOpen) {
			setEditingFolder(null);
		}
	};

	useEffect(() => {
		if (!store) {
			setStore(getDefaultBookmarkLibrary());
		} else {
			setAmountFolders(store.bookmarkFolders.length);
		}
	}, [store, getDefaultBookmarkLibrary, setStore]);

	return (
		<div className={styles["bookmark-library-container"]}>
			<BookmarkLibrary
				onEditFolderClick={handleFolderEditClick}
				onDeleteFolderClick={handleFolderDelete}
			/>
			<Modal
				isOpen={!!editingFolder}
				onOpenChange={handleOpenEditorChange}
			>
				{editingFolder && (
					<BookmarkFolderEditor
						key={editingFolder?.id}
						folderId={editingFolder.id}
						name={editingFolder.name}
						bookmarks={editingFolder.bookmarks}
						onNameSave={handleFolderNameSave}
						onBookmarksUpdate={handleBookmarksUpdate}
					/>
				)}
			</Modal>
			{amountFolders && maxAmountFolders && amountFolders < maxAmountFolders && (
				<CircularButton
					tooltip="Add Folder"
					className={styles["add-folder-button"]}
					onPress={handleAddNewFolder}
					tooltipPlacement="end"
				>
					<IconPlus
						size={21}
					/>
				</CircularButton>
			)}

		</div>
	);
};
