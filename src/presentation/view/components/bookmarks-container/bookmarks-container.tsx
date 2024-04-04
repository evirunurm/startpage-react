import React from "react";
import { Button } from "@components/button/button";
import IBookmarkContainer from "@entity/bookmarks/structures/IBookmarkContainer";
import IBookmarksViewModel from "@viewModels/bookmarks/IBookmarksViewModel";
import IBookmarkFolder from "@entity/bookmarks/structures/IBookmarkFolder";
import BookmarksFolderEditorComponent from "@components/folder-editor/bookmarks-folder-editor";
import BookmarksFolder from "@components/bookmarks-folder/bookmarks-folder";
import IBaseView from "@view/IBaseView";

export interface BookmarksContainerProps {
	bookmarksViewModel: IBookmarksViewModel;
}

export interface BookmarksContainerState {
	bookmarks?: IBookmarkContainer;
	isBookmarkFolderEditorOpen: boolean;
	bookmarkFolderIdEditing?: string;
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
		bookmarkFolderIdEditing: this.bookmarksViewModel.idBookmarkFolderEditing
	};
  }

  public componentDidMount(): void {
	this.bookmarksViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
	this.bookmarksViewModel.detachView(this);
  }

  public onViewModelChanged(): void {
	this.setState({
		bookmarks: this.bookmarksViewModel.bookmarks,
		isBookmarkFolderEditorOpen: this.bookmarksViewModel.isBookmarkFolderEditorOpen,
		bookmarkFolderIdEditing: this.bookmarksViewModel.idBookmarkFolderEditing
	});
  }

  public render(): JSX.Element {
	const {
		bookmarks,
		isBookmarkFolderEditorOpen,
		bookmarkFolderIdEditing,
	} = this.state;

	return (
	<>
		{
		(bookmarks && bookmarks.bookmarkFolders) ? 
			bookmarks.bookmarkFolders.map((bookmarkFolder: IBookmarkFolder) => 
			{
				return (
				<BookmarksFolder
					bookmarksViewModel={this.bookmarksViewModel}
					bookmarksFolderId={bookmarkFolder.id}
					key={bookmarkFolder.id}
				/>)
			}) 
		: null
		}
		<p>{bookmarkFolderIdEditing}</p>
		<Button label="Create new folder" onPress={(): void => this.bookmarksViewModel.onOpenFolderSaverClick()} />
		{
		isBookmarkFolderEditorOpen ? 
		<BookmarksFolderEditorComponent 
			bookmarksViewModel={this.bookmarksViewModel}
			bookmarkFolderID={bookmarkFolderIdEditing}
		/>
		: null
		}	
	</>
	);
  }
}