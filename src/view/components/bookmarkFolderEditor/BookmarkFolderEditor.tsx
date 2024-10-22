import { BookmarkEditor } from "@components/bookmarkEditor/BookmarkEditor";
import { Button } from "@components/atoms/button/button";
import { Input } from "@components/atoms/input/Input";
import BookmarkFactory from "@application/BookmarkFactory";
import { useLocalStorageState } from "@utils/utils";
import IBookmark from "@domain/bookmarks/Bookmark";
import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import { useState } from "react";

interface BookmarkFolderEditorProps {
	id: string;
	name: string;
	bookmarks: IBookmark[];
	onNameSave: (folderId: string, newFolderName: string) => void;
}

export const BookmarkFolderEditor: React.FC<BookmarkFolderEditorProps> = ({
	id,
	name,
	bookmarks,
	onNameSave,
}) => {
	const {
		addBookmarkToFolder,
		deleteBookmarkFromFolder,
		updateBookmarkFromFolder
	} = BookmarkFactory();
	const [store, setState] = useLocalStorageState<IBookmarkLibrary>(
		LocalStorageType.BookmarkLibrary
	);
	const [folderName, setFolderName] = useState(name);

	const handleAddBookmark = () => {
		const newLibrary = addBookmarkToFolder("New Bookmark", "", id, store!);
		setState(newLibrary);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			console.log("Save folder name:" + folderName);
			onNameSave(id, folderName);
		}
	};

	const handleDeleteBookmark = (bookmarkId: string) => {
		const newLibrary = deleteBookmarkFromFolder(bookmarkId, id, store!);
		setState(newLibrary);
	};

	const handleSaveBookmark = (bookmarkId: string, newBookmark: IBookmark) => {
		const newLibrary = updateBookmarkFromFolder(
			bookmarkId,
			newBookmark,
			id,
			store!
		);
		console.log("newBookmark", newBookmark);
		setState(newLibrary);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFolderName = e.currentTarget.value;
		setFolderName(newFolderName);
	};

	return (
		<section>
			<Input
				name={folderName}
				value={folderName}
				type="text"
				key={`${id}-name-edit`}
				onKeyPress={handleKeyPress}
				onChange={handleNameChange}
			/>
			{bookmarks.map((bookmark) => (
				<BookmarkEditor
					id={bookmark.id}
					key={bookmark.id}
					name={bookmark.name}
					url={bookmark.url}
					onDelete={(bookmarkId) => handleDeleteBookmark(bookmarkId)}
					onSave={(bookmarkId, newBookmark) =>
						handleSaveBookmark(bookmarkId, newBookmark)
					}
				/>
			))}
			<Button label="Add Bookmark" onPress={handleAddBookmark} />
		</section>
	);
};
