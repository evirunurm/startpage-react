import { useEffect } from "react";
import { BookmarkFolder } from "@components/bookmark-folder/bookmark-folder";
import { useLocalStorageState } from "@utils/utils";
import BookmarkFactory from "@application/BookmarkFactory";
import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import styles from "./bookmark-library.module.css";

interface BookmarkLibraryProps {
	onEditFolderClick: (folderId: string) => void;
	onDeleteFolderClick: (folderId: string) => void;
}

export const BookmarkLibrary: React.FC<BookmarkLibraryProps> = ({
	onEditFolderClick,
	onDeleteFolderClick
}: BookmarkLibraryProps) => {
	const {
		getDefaultBookmarkLibrary,
	} = BookmarkFactory();

	const [store, setStore] = useLocalStorageState<IBookmarkLibrary>(
		LocalStorageType.BookmarkLibrary
	);

	useEffect(() => {
		if (!store) {
			setStore(getDefaultBookmarkLibrary());
		}
	}, [store, getDefaultBookmarkLibrary, setStore]);

	return (
		<section className={styles["bookmark-library"]}>
			{store?.bookmarkFolders?.map((bookmarkFolder) => (
				<BookmarkFolder
					id={bookmarkFolder.id}
					key={bookmarkFolder.id}
					name={bookmarkFolder.name}
					bookmarks={bookmarkFolder.bookmarks}
					onDelete={onDeleteFolderClick}
					onEditClick={onEditFolderClick}
				/>
			))}
		</section>
	);
};
