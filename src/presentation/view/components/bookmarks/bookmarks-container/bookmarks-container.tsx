import React from "react";
import { Button } from "@components/button/button";
import IBookmarkContainer from "@entity/bookmarks/structures/IBookmarkContainer";
import IBookmarksViewModel from "@viewModels/bookmarks/IBookmarksViewModel";
import IBookmarkFolder from "@entity/bookmarks/structures/IBookmarkFolder";
import BookmarksFolderEditorComponent from "@components/bookmarks/folder-editor/bookmarks-folder-editor";
import BookmarksFolder from "@components/bookmarks/bookmarks-folder/bookmarks-folder";
import IBaseView from "@view/IBaseView";
import ModalComponent from "@components/modal/modal";

export interface BookmarksContainerProps {
	bookmarksViewModel: IBookmarksViewModel;
}

export interface BookmarksContainerState {
	bookmarks?: IBookmarkContainer;
	isBookmarkFolderEditorOpen: boolean;
	bookmarkFolderIdEditing?: string;
	isDeleteFolderConfirmationOpen: boolean
}

export default class BookmarksContainer extends 
	React.Component<
		BookmarksContainerProps, 
		BookmarksContainerState
	> 
	implements IBaseView 
{
  private bookmarksViewModel: IBookmarksViewModel;

  public constructor(props: BookmarksContainerProps) {
	super(props);

	const { bookmarksViewModel } = this.props;
	this.bookmarksViewModel = bookmarksViewModel;

	this.state = {
		bookmarks: bookmarksViewModel.bookmarks,
		isBookmarkFolderEditorOpen: this.bookmarksViewModel.isBookmarkFolderEditorOpen,
		bookmarkFolderIdEditing: this.bookmarksViewModel.idBookmarkFolderEditing,
		isDeleteFolderConfirmationOpen: this.bookmarksViewModel.isDeleteConfirmationOpen
	};
  }

  public componentDidMount(): void {
	this.bookmarksViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
	this.bookmarksViewModel.detachView(this);
  }

  public onViewModelChanged(): void {
	this.setState(
	{
		bookmarks: this.bookmarksViewModel.bookmarks,
		isBookmarkFolderEditorOpen: this.bookmarksViewModel.isBookmarkFolderEditorOpen,
		bookmarkFolderIdEditing: this.bookmarksViewModel.idBookmarkFolderEditing,
		isDeleteFolderConfirmationOpen: this.bookmarksViewModel.isDeleteConfirmationOpen
	});
  }

  public render(): JSX.Element {
	const {
		bookmarks,
		isBookmarkFolderEditorOpen,
		bookmarkFolderIdEditing,
		isDeleteFolderConfirmationOpen
	} = this.state;

	return (
	<>
		{
			bookmarks ? bookmarks.bookmarkFolders.map((bookmarkFolder: IBookmarkFolder, index: number) => (
				<BookmarksFolder
					bookmarksViewModel={this.bookmarksViewModel}
					bookmarksFolderId={bookmarkFolder.id}
					key={index}
				/>
			)) 
			: null
		}
		<p>{bookmarkFolderIdEditing}</p>
		<Button label="Create new folder" onClick={(): void => this.bookmarksViewModel.onOpenFolderSaverClick()} />
		{
			isBookmarkFolderEditorOpen ? 
			<BookmarksFolderEditorComponent 
				bookmarksViewModel={this.bookmarksViewModel}
				bookmarkFolderID={bookmarkFolderIdEditing}
			/>
			: null
		}	
		{
			isDeleteFolderConfirmationOpen ? 
			<ModalComponent 
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
			: null
		}	
	</>
	);
  }
}