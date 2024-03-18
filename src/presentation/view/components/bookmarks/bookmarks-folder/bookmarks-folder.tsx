import React from "react";
import IBaseView from "../../../BaseView";
import IBookmarksViewModel from "../../../../view-model/bookmarks/IBookmarksViewModel";
import BookmarkFolder from "../../../../../domain/entity/bookmarks/models/BookmarkFolder";
import IBookmark from "../../../../../domain/entity/bookmarks/structures/IBookmark";
import { Button } from "../../button/button";

export interface BookmarksFolderProps {
	bookmarksViewModel: IBookmarksViewModel;
	bookmarksFolder: BookmarkFolder;
}

export interface BookmarksFolderState {}

export default class BookmarksFolder extends React.Component<BookmarksFolderProps, BookmarksFolderState>
  implements IBaseView {
  private bookmarksViewModel: IBookmarksViewModel;
  private bookmarksFolder: BookmarkFolder;

  public constructor(props: BookmarksFolderProps) {
	super(props);

	const { bookmarksViewModel, bookmarksFolder } = this.props;
	this.bookmarksViewModel = bookmarksViewModel;
	this.bookmarksFolder = bookmarksFolder;
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
	return (
	<>
		<div className="bookmark-folder">
			<h3>{this.bookmarksFolder.name}</h3>
			{ 
				this.bookmarksFolder.bookmarks.map((bookmark : IBookmark, index: number) => (
					<li key={index}>{bookmark.name}: {bookmark.url}</li>
				))
			}
			<Button
				label="Edit"
				onClick={(): void => this.bookmarksViewModel.onOpenFolderCreatorClick(this.bookmarksFolder.id)}
			/>

		</div>
	</>
	);
  }
}