import { Button } from "@components/button/button";
import { Input } from "@components/input/Input";
import IBookmark from "@domain/bookmarks/Bookmark";
import { useState } from "react";

interface BookmarkEditorProps {
	id: string;
	name: string;
	url: string;
	onSave: (bookmarkId: string, newBookmark: IBookmark) => void;
	onDelete: (bookmarkId: string) => void;
}

export const BookmarkEditor: React.FC<BookmarkEditorProps> = ({
	id,
	name,
	url,
	onSave,
	onDelete,
}) => {
	const [folderName, setFolderName] = useState(name);
	const [folderUrl, setFolderUrl] = useState(url);

	const handleDeleteBookmark = () => {
		// TODO: Ask for confirmation
		onDelete(id);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFolderName(e.currentTarget.value);
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFolderUrl(e.currentTarget.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			console.log("Save folder name:" + name);
			onSave(id, {
				id,
				name: folderName,
				url: folderUrl,
				order: 0,
			} as IBookmark);
		}
	};

	return (
		<section>
			<Input
				name={name}
				value={folderName}
				type="text"
				key={`${id}-name-edit`}
				onKeyPress={handleKeyPress}
				onChange={handleNameChange}
			/>
			<Input
				name={name}
				value={folderUrl}
				type="text"
				key={`${id}-url-edit`}
				onKeyPress={handleKeyPress}
				onChange={handleUrlChange}
			/>
			<Button label="Delete Bookmark" onPress={handleDeleteBookmark} />
		</section>
	);
};
