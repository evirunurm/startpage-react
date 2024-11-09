import { useEffect, useState } from "react";
import { BookmarkFolder } from "@components/bookmarkFolder/BookmarkFolder";
import { Button } from "@components/atoms/button/button";
import { useLocalStorageState } from "@utils/utils";
import BookmarkFactory from "@application/BookmarkFactory";
import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import IBookmarkFolder from "@domain/bookmarks/BookmarkFolder";
import { BookmarkFolderEditor } from "@components/bookmarkFolderEditor/BookmarkFolderEditor";
import styles from "./bookmark-library.module.css";

export const BookmarkLibrary: React.FC = () => {
	const {
		editBookmarkFolderName,
		deleteBookmarkFolder,
		getDefaultBookmaekLibrary,
		addBookmarkFolder,
	} = BookmarkFactory();
	const [store, setState] = useLocalStorageState<IBookmarkLibrary>(
		LocalStorageType.BookmarkLibrary
	);
	const [editingFolder, setEditingFolder] = useState<IBookmarkFolder | null>(
		null
	);

	const handleFolderNameSave = (folderId: string, newFolderName: string) => {
		handleFolderNameEdit(folderId, newFolderName);
	};

	const handleFolderNameEdit = (folderId: string, newFolderName: string) => {
		const newLibrary = editBookmarkFolderName(
			folderId,
			newFolderName,
			store!
		);
		setState(newLibrary);
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
		setState(newLibrary);
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
			setState(newLibrary!);
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
			...store!,
			bookmarkFolders: store?.bookmarkFolders.map((folder) =>
				folder.id === updatedFolder.id ? updatedFolder : folder
			),
		} as IBookmarkLibrary;
		setState(newLibrary);
		setEditingFolder(updatedFolder);
	};

	useEffect(() => {
		if (!store) {
			setState(getDefaultBookmaekLibrary());
		}
	}, [store, getDefaultBookmaekLibrary, setState]);

	return (
		<div className={styles['bookmark-library']}>
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
			<Button className={styles['add-folder-button']}
			onPress={handleAddNewFolder}>Add Folder</Button>
		</div>
	);
};
