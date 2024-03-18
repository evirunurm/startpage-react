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

export default class BookmarksFolderEditorComponent
	extends React.Component<
		BookmarksFolderEditorComponentProps,
		BookmarksFolderEditorComponentState
	>
	implements IBaseView
{
	private bookmarksViewModel: IBookmarksViewModel;
	private bookmarkFolderID: string;

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
		this.bookmarkFolderID = bookmarkFolder.id;

		this.state = {
			bookmarkFolder: bookmarkFolder,
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
				bookmarkFolder: this.bookmarksViewModel.getFolderByID(this.bookmarkFolderID) ?? new BookmarkFolder()
			}
		);
	}

	handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { bookmarkFolder } = this.state;
		const updatedFolder = { ...bookmarkFolder, name: event.target.value };
		this.setState({ bookmarkFolder: updatedFolder });
	};

	// handleBookmarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	// Update bookmarks array based on user input
	// };

	handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { bookmarkFolder } = this.state;
		const updatedFolder = { ...bookmarkFolder, order: parseInt(event.target.value) };
		this.setState({ bookmarkFolder: updatedFolder });
	};

	public render(): JSX.Element {
		const { bookmarkFolder } = this.state;

		return (
			<>
				<p>{this.bookmarkFolderID}</p>
				<section>
					<input type="text" value={bookmarkFolder.name} onChange={this.handleNameChange} />
					<input type="number" value={bookmarkFolder.order.toString()} onChange={this.handleOrderChange} />
				</section>
				<Button
					label="Save Folder"
					onClick={(): void =>
						this.bookmarksViewModel.onCreateFolderClick(
							bookmarkFolder
						)
					}
				></Button>
			</>
		);
	}
}
