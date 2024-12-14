import { GridList, GridListItem, GridListProps as GridListPropsAria, useDragAndDrop } from "react-aria-components";
import { DragButton } from "@components/atoms/drag-button/drag-button";
import { DropIndicator } from "@components/atoms/drop-indicator/drop-indicator";
import IBookmark from "@domain/bookmarks/Bookmark";
import { BookmarkEditor } from "@components/bookmark-editor/bookmark-editor";
import styles from "./draggable-bookmarks.module.css";
import { useState } from "react";

type DraggableBookmarksProps = GridListPropsAria<object> & {
	bookmarks: IBookmark[];
	onFolderReorder: (reorderedBookmarks: IBookmark[]) => void;
	onDeleteBookmark: (bookmarkId: string) => void;
	onSaveBookmark: (bookmarkId: string, newBookmark: IBookmark) => void;
};

export const DraggableBookmarks = ({
	bookmarks,
	onFolderReorder,
	onDeleteBookmark,
	onSaveBookmark,
	...props
}: DraggableBookmarksProps) => {
	const [dragAndDropDisabled, setDragAndDropDisabled] = useState(false);

	const { dragAndDropHooks } = useDragAndDrop({
		renderDropIndicator: (target) => (<DropIndicator target={target} />),
		getItems: (draggedBookmarkIds) => [...draggedBookmarkIds].map((draggedBookmarkId) => ({
			'custom-app-type': JSON.stringify(
				bookmarks.find((bookmark) => bookmark.id === draggedBookmarkId)
			)
		})),
		onReorder(e) {
			const updatedBookmarks = [...bookmarks];
			const movedBookmark = updatedBookmarks.find((bookmark) => bookmark.id === Array.from(e.keys)[0]);
			const targetIndex = updatedBookmarks.findIndex((bookmark) => bookmark.id === e.target.key);

			if (movedBookmark) {
				updatedBookmarks.splice(updatedBookmarks.indexOf(movedBookmark), 1); // Remove the moved bookmark
				if (e.target.dropPosition === 'before') {
					updatedBookmarks.splice(targetIndex, 0, movedBookmark); // Insert before the target
				} else if (e.target.dropPosition === 'after') {
					updatedBookmarks.splice(targetIndex + 1, 0, movedBookmark); // Insert after the target
				}
				onFolderReorder(updatedBookmarks);
			}
		},
		getAllowedDropOperations: () => ['move'],
		isDisabled: dragAndDropDisabled
	});

	const onInputFocus = () => {
		setDragAndDropDisabled((prev) => {
			console.log('onInputFocus prev', prev)
			return true
		});
	}

	const onInputBlur = () => {
		setDragAndDropDisabled((prev) => {
			console.log('onInputBlur prev', prev)
			return false
		});
	}

	return (
		<GridList
			{...props}
			aria-labelledby="Bookmarks"
			items={bookmarks}
			dragAndDropHooks={dragAndDropHooks}
			keyboardNavigationBehavior="tab"
		>
			{(bookmark: IBookmark) => (
				<GridListItem
					key={bookmark.id}
					id={bookmark.id}
					textValue={bookmark.name}
					className={styles["bookmark-folder__grid-list-item"]}
				>
					<DragButton />
					<BookmarkEditor
						id={bookmark.id}
						key={bookmark.id + "-editor"}
						name={bookmark.name}
						url={bookmark.url}
						onDelete={onDeleteBookmark}
						onSave={onSaveBookmark}
						onInputFocus={onInputFocus}
						onInputBlur={onInputBlur}
					/>
				</GridListItem>
			)}
		</GridList >
	);
};