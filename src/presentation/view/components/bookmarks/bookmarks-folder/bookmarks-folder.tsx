import React from "react";
import IBookmarksViewModel from "../../../../view-model/bookmarks/IBookmarksViewModel";
import BookmarkFolder from "../../../../../domain/entity/bookmarks/models/BookmarkFolder";
import IBookmark from "../../../../../domain/entity/bookmarks/structures/IBookmark";
import { Button } from "../../button/button";
import IBaseView from "../../../IBaseView";

export interface BookmarksFolderProps {
	bookmarksViewModel: IBookmarksViewModel;
	bookmarksFolderId: string;
}

export interface BookmarksFolderState {}

export default class BookmarksFolder extends 
	React.Component<
		BookmarksFolderProps, 
		BookmarksFolderState
	>
	implements IBaseView 
{
	private bookmarksViewModel: IBookmarksViewModel;	
	private bookmarksFolderId: string;
	private bookmarksFolder: BookmarkFolder;

  public constructor(props: BookmarksFolderProps) {
	super(props);

	const { bookmarksViewModel, bookmarksFolderId } = this.props;
	this.bookmarksFolderId = bookmarksFolderId;
	this.bookmarksViewModel = bookmarksViewModel;
	const folder = this.bookmarksViewModel.getFolderByID(this.bookmarksFolderId)
	if (folder) {
		this.bookmarksFolder = folder;
	} else {
		throw new Error;
	}
  }

  public componentDidMount(): void {
	this.bookmarksViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
	this.bookmarksViewModel.detachView(this);
  }

  public onViewModelChanged(): void {
	const folder = this.bookmarksViewModel.getFolderByID(this.bookmarksFolderId)
	console.log('Fetched folder', folder)
	if (folder) {
		this.setState(
			this.bookmarksFolder = folder
		);
	}
  }

  public render(): JSX.Element {
	return (
	<>
		<div className="bookmark-folder">
			<h3>{this.bookmarksFolder.name}</h3>
			{ 
				this.bookmarksFolder.bookmarks.map((bookmark : IBookmark, index: number) => (
					<li key={index}>
						{bookmark.name}: {bookmark.url} 
					</li>
				))
			}
			<Button
				label="Edit folder"
				onClick={(): void => this.bookmarksViewModel
					.onOpenFolderSaverClick(this.bookmarksFolder.id)}
			/>
			<Button
				label="Delete folder"
				onClick={(): void => this.bookmarksViewModel
					.onDeleteFolderClick(this.bookmarksFolder.id)}
			/>
		</div>
	</>
	);
  }
}