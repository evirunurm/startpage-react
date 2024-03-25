import React from "react";
import { Button } from "../../button/button";
import IBookmarkContainer from "../../../../../domain/entity/bookmarks/structures/IBookmarkContainer";
import IBookmarksViewModel from "../../../../view-model/bookmarks/IBookmarksViewModel";
import IBookmarkFolder from "../../../../../domain/entity/bookmarks/structures/IBookmarkFolder";
import BookmarksFolderEditorComponent from "../folder-editor/bookmarks-folder-editor";
import BookmarksFolder from "../bookmarks-folder/bookmarks-folder";
import IBaseView from "../../../IBaseView";

export interface BookmarksContainerProps {
	bookmarksViewModel: IBookmarksViewModel;
}

export interface BookmarksContainerState {
	bookmarks?: IBookmarkContainer;
	bookmarkFolderEditorOpen: boolean;
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
		bookmarkFolderEditorOpen: this.bookmarksViewModel.bookmarkFolderEditorOpen,
		bookmarkFolderIdEditing: this.bookmarksViewModel.bookmarkFolderIdEditing
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
		bookmarkFolderEditorOpen: this.bookmarksViewModel.bookmarkFolderEditorOpen,
		bookmarkFolderIdEditing: this.bookmarksViewModel.bookmarkFolderIdEditing,
	});
  }

  public render(): JSX.Element {
	const {
		bookmarks,
		bookmarkFolderEditorOpen,
		bookmarkFolderIdEditing
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
		<Button label="Create new folder" onClick={(): void => this.bookmarksViewModel.onOpenFolderCreatorClick()} />
		{
			bookmarkFolderEditorOpen ? 
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