import React from "react";
import IBaseView from "../../../BaseView";
import IBookmarksViewModel from "../../../../view-model/bookmarks/IBookmarksViewModel";
import IBookmarkFolder from "../../../../../domain/entity/bookmarks/structures/IBookmarkFolder";
import BookmarkFolder from "../../../../../domain/entity/bookmarks/models/BookmarkFolder";
import { Button } from "../../button/button";

export interface BookmarksFolderEditorComponentProps {
	bookmarksViewModel: IBookmarksViewModel;
	bookmarkFolderID?: string;
}

export interface BookmarksFolderEditorComponentState {
	bookmarkFolder: IBookmarkFolder;
}

export default class BookmarksFolderEditorComponent extends React.Component<BookmarksFolderEditorComponentProps, BookmarksFolderEditorComponentState>
  implements IBaseView {
  private bookmarksViewModel: IBookmarksViewModel;
  private bookmarkFolderID?: string;

  public constructor(props: BookmarksFolderEditorComponentProps) {
	super(props);
	const { bookmarksViewModel, bookmarkFolderID } = this.props;
	this.bookmarksViewModel = bookmarksViewModel;
	let bookmarkFolder: BookmarkFolder | undefined;
	if (bookmarkFolderID) {
		bookmarkFolder = bookmarksViewModel.getFolderByID(bookmarkFolderID);
	}
	if (!bookmarkFolder) {
		bookmarkFolder = new BookmarkFolder();
	}

	this.bookmarkFolderID = bookmarkFolderID;
	this.bookmarksViewModel = bookmarksViewModel;

	this.state = {
		bookmarkFolder: bookmarkFolder
	};
  }

  public componentDidMount(): void {
	this.bookmarksViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
	this.bookmarksViewModel.detachView(this);
  }

  public onViewModelChanged(): void {
	this.setState({});
  }

  public render(): JSX.Element {
	const {
		bookmarkFolder
	} = this.state;

	return (
	<>
		<p>{JSON.stringify(bookmarkFolder)}</p>
		<Button 
			label="Save Folder"
			onClick={(): void => this.bookmarksViewModel.onCreateFolderClick(bookmarkFolder)}	
		>
			
		</Button>
	</>
	);
  }
}