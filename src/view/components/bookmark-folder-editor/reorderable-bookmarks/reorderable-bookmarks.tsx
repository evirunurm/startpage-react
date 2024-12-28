import { Cell, Column, Row, Table, TableBody, TableHeader, useDragAndDrop } from "react-aria-components";
import { DragButton } from "@components/atoms/drag-button/drag-button";
import { DropIndicator } from "@components/atoms/drop-indicator/drop-indicator";
import IBookmark from "@domain/bookmarks/IBookmark";
import { BookmarkEditor } from "../bookmark-editor/bookmark-editor";
import styles from "./reorderable-bookmarks.module.css";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

type ReorderableBookmarksProps = {
	bookmarks: IBookmark[];
	onFolderReorder: (reorderedBookmarks: IBookmark[]) => void;
	onDeleteBookmark: (bookmarkId: string) => void;
	onSaveBookmark: (newBookmark: IBookmark) => void;
};

type ReorderableBookmark = IBookmark & {
	dragAndDropDisabled: boolean;
}

export const ReorderableBookmarks = ({
	bookmarks,
	onFolderReorder,
	onDeleteBookmark,
	onSaveBookmark
}: ReorderableBookmarksProps) => {
	const { t } = useTranslation();
	const [dragAndDropDisabled, setDragAndDropDisabled] = useState(false);
	const [draggableBookmarks, setDraggableBookmarks] = useState<ReorderableBookmark[]>(bookmarks.map((bookmark) => ({
		...bookmark,
		dragAndDropDisabled: false
	})));

	const updateDraggableBookmarks = useCallback(() => {
		setDraggableBookmarks(
			bookmarks.map((bookmark) => ({
				...bookmark,
				dragAndDropDisabled
			}))
		);
	}, [bookmarks, dragAndDropDisabled]);

	const { dragAndDropHooks } = useDragAndDrop({
		renderDropIndicator: (target) => (<DropIndicator target={target} />),
		getItems: (draggedBookmarkIds) => [...draggedBookmarkIds].map((id) => ({
			'custom-app-type': JSON.stringify(bookmarks.find((bookmark) => bookmark.id === id))
		})),
		onReorder(e) {
			const updatedBookmarks = [...bookmarks];
			const movedBookmark = updatedBookmarks.find((bookmark) => bookmark.id === Array.from(e.keys)[0]);
			const targetIndex = updatedBookmarks.findIndex((bookmark) => bookmark.id === e.target.key);

			if (movedBookmark) {
				updatedBookmarks.splice(updatedBookmarks.indexOf(movedBookmark), 1);
				const insertIndex = e.target.dropPosition === 'before' ? targetIndex : targetIndex + 1;
				updatedBookmarks.splice(insertIndex, 0, movedBookmark);
				onFolderReorder(updatedBookmarks);
			}
		},
		getAllowedDropOperations: () => ['move'],
		isDisabled: dragAndDropDisabled
	});

	const handleInputFocus = () => setDragAndDropDisabled(true);
	const handleInputBlur = () => setDragAndDropDisabled(false);

	useEffect(() => {
		updateDraggableBookmarks();
	}, [bookmarks, updateDraggableBookmarks]);

	return (
		<Table
			aria-label="Bookmarks"
			dragAndDropHooks={dragAndDropHooks}
		>
			<TableHeader className={styles["header"]}>
				<Column>{t('common.reorder')}</Column>
				<Column isRowHeader>{t('common.name')}</Column>
			</TableHeader>
			<TableBody
				className={styles["body"]}
				items={draggableBookmarks}
			>
				{(bookmark: ReorderableBookmark) => (
					<Row
						id={bookmark.id}
						key={bookmark.id}
						textValue={bookmark.name}
						className={styles["body__row"]}
						style={bookmark.dragAndDropDisabled ? {} : { WebkitUserDrag: 'element' } as React.CSSProperties}
					>
						<Cell className={styles["body__row__drag-button"]}>
							<DragButton />
						</Cell>
						<Cell className={styles["body__row__bookmark-editor"]}>
							<BookmarkEditor
								id={bookmark.id}
								key={`${bookmark.id}-editor`}
								name={bookmark.name}
								url={bookmark.url}
								onDelete={onDeleteBookmark}
								onSave={onSaveBookmark}
								onInputFocus={handleInputFocus}
								onInputBlur={handleInputBlur}
							/>
						</Cell>
					</Row>
				)}
			</TableBody>
		</Table >
	);
};