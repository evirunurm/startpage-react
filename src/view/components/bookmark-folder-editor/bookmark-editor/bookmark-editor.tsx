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
import { useTranslation } from "react-i18next";

const MAX_NAME_LENGTH = 25;
const MAX_URL_LENGTH = 2048;

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
	const { t } = useTranslation();
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
		let newName = e.currentTarget.value;
		if (newName.length > MAX_NAME_LENGTH) newName = newName.slice(0, MAX_NAME_LENGTH);
		setBookmarkName(newName);
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newURL = e.currentTarget.value;
		if (newURL.length > MAX_URL_LENGTH) newURL = newURL.slice(0, MAX_URL_LENGTH);
		setBookmarkUrl(newURL);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && (bookmarkName != name || bookmarkUrl != url)) {
			saveBookmark();
		}
	};

	const saveBookmark = () => {
		if (!bookmarkName) return;
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
			<div className={styles["bookmark-editor__inputs"]}>
				<Input
					type="text"
					key={`${id}-name-edit`}
					name={name}
					value={bookmarkName}
					aria-label={t('common.bookmark-name')}
					onBlur={onInputBlur}
					onFocus={onInputFocus}
					onKeyDown={handleKeyDown}
					onChange={handleNameChange}
					maxLength={MAX_NAME_LENGTH}
				/>
				{isEditingOpen && (
					<Input
						aria-label={t('common.bookmark-url')}
						name={name}
						value={bookmarkUrl}
						type="text"
						key={`${id}-url-edit`}
						onKeyDown={handleKeyDown}
						onChange={handleUrlChange}
						onBlur={onInputBlur}
						onFocus={onInputFocus}
						maxLength={MAX_URL_LENGTH}
					/>
				)}
				{bookmarkName != name || bookmarkUrl != url ?
					<Message>{t('common.enter-save-changes')}</Message>
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
						tooltip={t('common.edit-url')}
						aria-label={t('common.edit-url')}
						className={styles["bookmark-editor__buttons__button"]}
						onPress={handleEditBookmarkClick}
						padding="0.25rem"
					><IconLink size={18} /></Button>
				) : (
					<Button
						tooltip={t('common.save-bookmark')}
						aria-label={t('common.save-bookmark')}
						className={styles["bookmark-editor__buttons__button"]}
						onPress={saveBookmark}
						padding="0.25rem"
					><IconDeviceFloppy size={18} /></Button>
				)}
				{deleteConfirmation ? (
					<Button
						tooltip={t('common.confirm-deletion')}
						aria-label={t('common.confirm-deletion')}
						className={styles["bookmark-editor__buttons__button"]}
						onPress={handleConfirmDeleteBookmark}
						padding="0.25rem"
						tooltipPlacement="end"
					><IconChecks size={18} /></Button>
				) : (
					<Button
						aria-label={t('common.delete-bookmark')}
						tooltip={t('common.delete-bookmark')}
						className={styles["bookmark-editor__buttons__button"]}
						onPress={handleDeleteBookmark}
						tooltipPlacement="end"
						padding="0.25rem"
					><IconTrashX size={18} /></Button>
				)}
			</div>
		</section>
	);
};
