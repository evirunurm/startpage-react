import React from "react";
import IBaseView from "../../../BaseView";
import IBookmarksViewModel from "../../../../view-model/bookmarks/IBookmarksViewModel";
import BookmarkFolder from "../../../../../domain/entity/bookmarks/models/BookmarkFolder";
import IBookmark from "../../../../../domain/entity/bookmarks/structures/IBookmark";

export interface BookmarksFolderProps {
	bookmarksViewModel: IBookmarksViewModel;
	bookmarksFolder: BookmarkFolder;
}

export interface BookmarksFolderState {
	// bookmarksFolder: BookmarksFolder;
}

export default class BookmarksFolder extends React.Component<BookmarksFolderProps, BookmarksFolderState>
  implements IBaseView {
  private bookmarksViewModel: IBookmarksViewModel;
  private bookmarksFolder: BookmarkFolder;

  public constructor(props: BookmarksFolderProps) {
	super(props);

	const { bookmarksViewModel, bookmarksFolder } = this.props;
	this.bookmarksViewModel = bookmarksViewModel;
	this.bookmarksFolder = bookmarksFolder;

	// this.state = {
	// 	bookmarksFolder: bookmarksFolder
	// };
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
		// bookmarksFolder: this.bookmarksViewModel.bookmarks,
	});
  }

  public render(): JSX.Element {
	return (
	<>
		<div className="bookmark-folder">
			<h3>{this.bookmarksFolder.name}</h3>
			{ 
				this.bookmarksFolder.bookmarks.map((bookmark : IBookmark, index: number) => (
					<li key={index}>{bookmark.name}: {bookmark.url}</li>
				))
			}
		</div>
	</>
	);
  }
}