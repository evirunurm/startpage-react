import { useEffect, useState } from "react";
import { BookmarkFolder } from "@components/bookmark-folder/bookmark-folder";
import { Button } from "@components/atoms/button/button";
import { useLocalStorageState } from "@utils/utils";
import BookmarkFactory from "@application/BookmarkFactory";
import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import IBookmarkFolder from "@domain/bookmarks/BookmarkFolder";
import { BookmarkFolderEditor } from "@components/bookmark-folder-editor/bookmark-folder-editor";
import styles from "./bookmark-library.module.css";

export const BookmarkLibrary: React.FC = () => {
	const {
		editBookmarkFolderName,
		deleteBookmarkFolder,
		getDefaultBookmaekLibrary,
		addBookmarkFolder,
	} = BookmarkFactory();

	const [store, setStore] = useLocalStorageState<IBookmarkLibrary>(
		LocalStorageType.BookmarkLibrary
	);
	const [editingFolder, setEditingFolder] = useState<IBookmarkFolder | null>(
		null
	);

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

	const handleFolderDelete = (folderName: string) => {
		const newLibrary = deleteBookmarkFolder(folderName, store!);
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

	useEffect(() => {
		if (!store) {
			setStore(getDefaultBookmaekLibrary());
		}
	}, [store, getDefaultBookmaekLibrary, setStore]);

	return (
		<div className={styles["bookmark-library"]}>
			{store?.bookmarkFolders?.map((bookmarkFolder) => (
				<BookmarkFolder
					id={bookmarkFolder.id}
					key={bookmarkFolder.id}
					name={bookmarkFolder.name}
					bookmarks={bookmarkFolder.bookmarks}
					onDelete={handleFolderDelete}
					onEditClick={handleFolderEditClick}
				/>
			))}

			{editingFolder && (
				<BookmarkFolderEditor
					key={editingFolder?.id}
					folderId={editingFolder?.id}
					name={editingFolder?.name}
					bookmarks={editingFolder?.bookmarks}
					onNameSave={handleFolderNameSave}
					onBookmarksUpdate={handleBookmarksUpdate}
				/>
			)}
			<Button
				className={styles["add-folder-button"]}
				onPress={handleAddNewFolder}
			>
				Add Folder
			</Button>
		</div>
	);
};
