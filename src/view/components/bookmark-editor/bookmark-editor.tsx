import { Button } from "@components/atoms/button/button";
import { Input } from "@components/atoms/input/input";
import IBookmark from "@domain/bookmarks/Bookmark";
import { useState } from "react";
import styles from "./bookmark-editor.module.css";
import { IconDeviceFloppy, IconPencilMinus, IconTrashX } from "@tabler/icons-react";
import classNames from 'classnames';
import { Message } from "@components/atoms/message/message";

interface BookmarkEditorProps {
	id: string;
	name: string;
	url: string;
	onSave: (bookmarkId: string, newBookmark: IBookmark) => void;
	onDelete: (bookmarkId: string) => void;
	onInputFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onInputBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const BookmarkEditor: React.FC<BookmarkEditorProps> = ({
	id,
	name,
	url,
	onSave,
	onDelete,
	onInputFocus,
	onInputBlur
}) => {
	const [bookmarkName, setBookmarkName] = useState(name);
	const [bookmarkUrl, setBookmarkUrl] = useState(url);
	const [isEditingOpen, setIsEditingOpen] = useState(false);

	const handleEditBookmarkClick = () => {
		setIsEditingOpen(true);
	};

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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			saveBookmark();
		}
	};

	const saveBookmark = () => {
		onSave(id, {
			id,
			name: bookmarkName,
			url: bookmarkUrl,
			order: 0,
		} as IBookmark);
		setIsEditingOpen(false);
	}

	return (
		<section className={styles["bookmark-editor"]}>
			<div
				aria-label="Bookmark data"
			>
				<Input
					onBlur={onInputBlur}
					onFocus={onInputFocus}
					name={name}
					value={bookmarkName}
					type="text"
					key={`${id}-name-edit`}
					onKeyDown={handleKeyDown}
					onChange={handleNameChange}
				/>
				{isEditingOpen && (
					<Input
						name={name}
						value={bookmarkUrl}
						type="text"
						key={`${id}-url-edit`}
						onKeyDown={handleKeyDown}
						onChange={handleUrlChange}
					/>
				)}
				{bookmarkName != name || bookmarkUrl != url ?
					<Message>Enter to save changes</Message>
					: null
				}
			</div>
			<div className={classNames(
				styles["bookmark-editor__buttons"], {
				[styles["bookmark-editor__buttons--column"]]: isEditingOpen
			})}
			>
				{!isEditingOpen ? (
					<Button
						tooltip="Edit bookmark"
						className={styles["bookmark-editor__buttons__button"]}
						onPress={handleEditBookmarkClick}
						aria-label="Edit bookmark"
						padding="0.25rem"
					>
						<IconPencilMinus size={18} />
					</Button>
				) : (
					<Button
						tooltip="Save bookmark"
						className={styles["bookmark-editor__buttons__button"]}
						onPress={saveBookmark}
						aria-label="Save bookmark"
						padding="0.25rem"
					>
						<IconDeviceFloppy size={18} />
					</Button>
				)}
				<Button
					tooltipPlacement="end"
					tooltip="Delete bookmark"
					className={styles["bookmark-editor__buttons__button"]}
					onPress={handleDeleteBookmark}
					aria-label="Delete bookmark"
					padding="0.25rem"
				>
					<IconTrashX size={18} />
				</Button>
			</div>
		</section>
	);
};
