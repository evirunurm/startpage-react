import React from "react";
import IBookmarksViewModel from "@viewModels/bookmarks/IBookmarksViewModel";
import IBookmark from "@entity/bookmarks/structures/IBookmark";
import { Button } from "@components/button/button";
import IBaseView from "@view/IBaseView";
import IBookmarkFolder from "@entity/bookmarks/structures/IBookmarkFolder";
import { DialogTrigger } from "react-aria-components";
import ModalComponent from "@components/modal/modal";

export interface BookmarksFolderProps {
	bookmarksViewModel: IBookmarksViewModel;
	bookmarksFolderId: string;
}

export interface BookmarksFolderState {
	bookmarksFolder: IBookmarkFolder;
}


export default class BookmarksFolder extends 
	React.Component<
		BookmarksFolderProps, 
		BookmarksFolderState
	>
	implements IBaseView 
{
	private bookmarksViewModel: IBookmarksViewModel;	
	private bookmarksFolderId: string;

	public constructor(props: BookmarksFolderProps) {
		super(props);

		const { bookmarksViewModel, bookmarksFolderId } = this.props;
		this.bookmarksViewModel = bookmarksViewModel;

		this.bookmarksFolderId = bookmarksFolderId;

		const folder: IBookmarkFolder | undefined = this.bookmarksViewModel.getFolderByID(bookmarksFolderId)
		if (!folder) throw new Error();

		this.state = {
			bookmarksFolder: folder,
		};
	}

	public componentDidMount(): void {
		this.bookmarksViewModel.attachView(this);
	}

	public componentWillUnmount(): void {
		this.bookmarksViewModel.detachView(this);
	}

	public componentDidUpdate(prevProps: BookmarksFolderProps): void {
		this.bookmarksFolderId = this.props.bookmarksFolderId;
		console.log(this.bookmarksViewModel.getFolderByID(this.props.bookmarksFolderId))
        if (prevProps.bookmarksFolderId !== this.props.bookmarksFolderId) {
            // this.updateFolderState(this.props.bookmarksFolderId);
        }
    }

	public onViewModelChanged(): void {
		const folder = this.bookmarksViewModel.getFolderByID(this.bookmarksFolderId);
		if (!folder) return;
		this.setState({
			bookmarksFolder: folder,
		});
	}

	public render(): JSX.Element {
		const { bookmarksFolder } = this.state;

		return (
		<>
			<div className="bookmark-folder">
				<h3>{bookmarksFolder.name}</h3>
				{ 
					bookmarksFolder.bookmarks.map((bookmark : IBookmark, index: number) => (
						<li key={index}>
							{bookmark.name}: {bookmark.url} 
						</li>
					))
				}
				<Button
					label="Edit folder"
					onPress={(): void => this.bookmarksViewModel
						.onOpenFolderSaverClick(bookmarksFolder.id)}
				/>
				<DialogTrigger>
					<Button
						label="Delete folder"
						onPress={(): void => this.bookmarksViewModel
							.onDeleteFolderClick(bookmarksFolder.id)}
					/>
					<ModalComponent 
						title="Delete folder"
						text="Are you sure you want to delete this folder?"
						options={[
							{
								text: 'Confirm',
								onClick: (): void => this.bookmarksViewModel.onConfirmDeleteFolderClick(true)
							},
							{
								text: 'Cancel',
								onClick: (): void => this.bookmarksViewModel.onConfirmDeleteFolderClick(false)
							}
						]}
					/>
				</DialogTrigger>
				
			</div>
		</>
		);
	}
}