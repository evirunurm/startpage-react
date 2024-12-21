import { GridList, GridListItem, GridListProps as GridListPropsAria, useDragAndDrop } from "react-aria-components";
import { DragButton } from "@components/atoms/drag-button/drag-button";
import { DropIndicator } from "@components/atoms/drop-indicator/drop-indicator";
import IBookmark from "@domain/bookmarks/IBookmark";
import { BookmarkEditor } from "@components/bookmark-editor/bookmark-editor";
import styles from "./draggable-bookmarks.module.css";
import { useEffect, useState, useCallback } from "react";

type DraggableBookmarksProps = GridListPropsAria<object> & {
	bookmarks: IBookmark[];
	onFolderReorder: (reorderedBookmarks: IBookmark[]) => void;
	onDeleteBookmark: (bookmarkId: string) => void;
	onSaveBookmark: (newBookmark: IBookmark) => void;
};

type DraggableBookmark = IBookmark & {
	dragAndDropDisabled: boolean;
}

export const DraggableBookmarks = ({
	bookmarks,
	onFolderReorder,
	onDeleteBookmark,
	onSaveBookmark,
	...props
}: DraggableBookmarksProps) => {
	const [dragAndDropDisabled, setDragAndDropDisabled] = useState(false);
	const [draggableBookmarks, setDraggableBookmarks] = useState<DraggableBookmark[]>(bookmarks.map((bookmark) => ({
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
		<GridList
			{...props}
			aria-labelledby="Bookmarks"
			items={draggableBookmarks}
			dragAndDropHooks={dragAndDropHooks}
			keyboardNavigationBehavior="tab"
		>
			{(bookmark: DraggableBookmark) => (
				<GridListItem
					key={bookmark.id}
					id={bookmark.id}
					textValue={bookmark.name}
					className={styles["bookmark-folder__grid-list-item"]}
					style={bookmark.dragAndDropDisabled ? {} : { WebkitUserDrag: 'element' } as React.CSSProperties}
				>
					<DragButton />
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
				</GridListItem>
			)}
		</GridList >
	);
};