import { Button } from "@components/atoms/button/button";
import { Input } from "@components/atoms/input/Input";
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
	const [bookmarkName, setBookmarkName] = useState(name);
	const [bookmarkUrl, setBookmarkUrl] = useState(url);

	const handleDeleteBookmark = () => {
		const confirmation = window.confirm("Are you sure you want to delete this bookmark?");
		if (confirmation) {
			onDelete(id);
		}
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.value) {
			setBookmarkName(e.currentTarget.value);
		} else {
			// Show error message
		}
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBookmarkUrl(e.currentTarget.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			console.log("Save bookmark with name:" + name);
			onSave(id, {
				id,
				name: bookmarkName,
				url: bookmarkUrl,
				order: 0,
			} as IBookmark);
		}
	};

	return (
		<section>
			<Input
				name={name}
				value={bookmarkName}
				type="text"
				key={`${id}-name-edit`}
				onKeyPress={handleKeyPress}
				onChange={handleNameChange}
			/>
			<Input
				name={name}
				value={bookmarkUrl}
				type="text"
				key={`${id}-url-edit`}
				onKeyDown={handleKeyPress}
				onChange={handleUrlChange}
			/>
			<Button onPress={handleDeleteBookmark}>Delete Bookmark</Button>
		</section>
	);
};
