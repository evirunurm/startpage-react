import { useEffect, useState } from "react";
import { useLocalStorageState } from "@utils/utils";
import BookmarkFactory from "@application/BookmarkFactory";
import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import IBookmarkFolder from "@domain/bookmarks/BookmarkFolder";
import { BookmarkFolderEditor } from "@components/bookmark-folder-editor/bookmark-folder-editor";
import styles from "./bookmark-library-container.module.css";
import { Modal } from "@components/atoms/modal/modal";
import { BookmarkLibrary } from "@components/bookmark-library/bookmark-library";
import { CircularButton } from "@components/atoms/circular-button/circular-button";
import { IconPlus } from "@tabler/icons-react";

export const BookmarkLibraryContainer: React.FC = () => {
	const {
		editBookmarkFolderName,
		deleteBookmarkFolder,
		getDefaultBookmarkLibrary,
		getMaximumAmountOfFolders,
		addBookmarkFolder,
	} = BookmarkFactory();

	const [store, setStore] = useLocalStorageState<IBookmarkLibrary>(
		LocalStorageType.BookmarkLibrary
	);
	const [editingFolder, setEditingFolder] = useState<IBookmarkFolder | null>(
		null
	);
	const [amountFolders, setAmountFolders] = useState<number | undefined>(undefined);
	const [maxAmountFolder, setMaxAmountFolder] = useState<number | undefined>(undefined);

	const handleFolderNameSave = (folderId: string, newFolderName: string) => {
		const newLibrary = editBookmarkFolderName(
			folderId,
			newFolderName,
			store!
		);
		setStore(newLibrary);
		setEditingFolder(null);
	};

	const handleFolderEditClick = (folderId: string) => {
		const folder = store?.bookmarkFolders.find(
			(folder) => folder.id === folderId
		);
		if (folder) {
			setEditingFolder(folder);
		}
	};

	const handleFolderDelete = (folderId: string) => {
		const newLibrary = deleteBookmarkFolder(folderId, store!);
		setStore(newLibrary);
		setEditingFolder(null);
	};

	const handleAddNewFolder = () => {
		let newLibrary: IBookmarkLibrary | null = null;
		let errorCounter = 0;
		while (errorCounter < 5 && !newLibrary) {
			try {
				newLibrary = addBookmarkFolder(
					"New folder" + (errorCounter > 0 ? ` ${errorCounter}` : ""),
					store!
				);
			} catch (e) {
				errorCounter++;
			}
		}
		if (newLibrary) {
			setStore(newLibrary);
			setEditingFolder(
				newLibrary.bookmarkFolders[
				newLibrary.bookmarkFolders.length - 1
				]
			);
		} else {
			console.error(
				"Failed to add new folder, too many folders have been created."
			);
		}
	};

	const handleBookmarksUpdate = (updatedFolder: IBookmarkFolder) => {
		const newLibrary = {
			bookmarkFolders: store?.bookmarkFolders.map((folder) =>
				folder.id === updatedFolder.id ? updatedFolder : folder
			)
		} as IBookmarkLibrary;
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
			setMaxAmountFolder(getMaximumAmountOfFolders());
		}
	}, [store, getDefaultBookmarkLibrary, setStore, getMaximumAmountOfFolders]);

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
				<BookmarkFolderEditor
					key={editingFolder?.id}
					folderId={editingFolder?.id!}
					name={editingFolder?.name!}
					bookmarks={editingFolder?.bookmarks!}
					onNameSave={handleFolderNameSave}
					onBookmarksUpdate={handleBookmarksUpdate}
				/>
			</Modal>
			{amountFolders && maxAmountFolder && amountFolders < maxAmountFolder && (
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
