import { Button } from "@components/atoms/button/button";
import { Input } from "@components/atoms/input/input";
import IBookmark from "@domain/bookmarks/IBookmark";
import { useState } from "react";
import styles from "./bookmark-editor.module.css";
import {
	IconDeviceFloppy, IconLink, IconTrashX, IconChecks
} from "@tabler/icons-react";
import classNames from 'classnames';
import { Message } from "@components/atoms/message/message";

interface BookmarkEditorProps {
	id: string;
	name: string;
	url: string;
	onSave: (newBookmark: IBookmark) => void;
	onDelete: (bookmarkId: string) => void;
	onInputFocus?: () => void;
	onInputBlur?: () => void;
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
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [bookmarkName, setBookmarkName] = useState(name);
	const [bookmarkUrl, setBookmarkUrl] = useState(url);
	const [isEditingOpen, setIsEditingOpen] = useState(false);

	const handleEditBookmarkClick = () => {
		setIsEditingOpen(true);
	};

	const handleDeleteBookmark = () => {
		setDeleteConfirmation(true);
	};

	const handleConfirmDeleteBookmark = () => {
		setDeleteConfirmation(false);
		onDelete(id);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBookmarkName(e.currentTarget.value);
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBookmarkUrl(e.currentTarget.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && (bookmarkName != name || bookmarkUrl != url)) {
			saveBookmark();
		}
	};

	const saveBookmark = () => {
		if (!bookmarkName) {
			console.error("Name is required");
			return;
		}
		const newBookmark: IBookmark = {
			id,
			name: bookmarkName,
			url: bookmarkUrl,
		}
		onSave(newBookmark);
		setIsEditingOpen(false);
	}

	return (
		<section className={styles["bookmark-editor"]}>
			<div
				className={styles["bookmark-editor__inputs"]}
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
					maxLength={25}
					max={25}
				/>
				{isEditingOpen && (
					<Input
						name={name}
						value={bookmarkUrl}
						type="text"
						key={`${id}-url-edit`}
						onKeyDown={handleKeyDown}
						onChange={handleUrlChange}
						onBlur={onInputBlur}
						onFocus={onInputFocus}
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
						<IconLink size={18} />
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
				{deleteConfirmation ? (
					<Button
						tooltipPlacement="end"
						tooltip="Confirm deletion"
						className={styles["bookmark-editor__buttons__button"]}
						onPress={handleConfirmDeleteBookmark}
						aria-label="Confirm deletion"
						padding="0.25rem"
					>
						<IconChecks size={18} />
					</Button>) : (<Button
						tooltipPlacement="end"
						tooltip="Delete bookmark"
						className={styles["bookmark-editor__buttons__button"]}
						onPress={handleDeleteBookmark}
						aria-label="Delete bookmark"
						padding="0.25rem"
					>
						<IconTrashX size={18} />
					</Button>
				)}
			</div>
		</section>
	);
};
