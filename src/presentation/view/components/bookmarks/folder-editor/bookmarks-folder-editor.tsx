import React from "react";
import IBookmarksViewModel from "../../../../view-model/bookmarks/IBookmarksViewModel";
import IBookmarkFolder from "../../../../../domain/entity/bookmarks/structures/IBookmarkFolder";
import BookmarkFolder from "../../../../../domain/entity/bookmarks/models/BookmarkFolder";
import { Button } from "../../button/button";
import IBaseView from "../../../IBaseView";

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
	> implements IBaseView
{
	private bookmarksViewModel: IBookmarksViewModel;

	public constructor(props: BookmarksFolderEditorComponentProps) {
		super(props);
		const { bookmarksViewModel } = this.props;
		this.bookmarksViewModel = bookmarksViewModel;
		let bookmarkFolder: BookmarkFolder | undefined;

		bookmarkFolder = bookmarksViewModel.getEditingFolder();
		if (!bookmarkFolder) {
			bookmarkFolder = new BookmarkFolder();
		}

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
		console.log(this.bookmarksViewModel.getEditingFolder())
		this.setState(
			{
				bookmarkFolder: this.bookmarksViewModel.getEditingFolder() ?? new BookmarkFolder()
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
				<p>{bookmarkFolder.id}</p>
				<section>
					<input type="text" value={bookmarkFolder.name} onChange={this.handleNameChange} />
					<input type="number" value={bookmarkFolder.order.toString()} onChange={this.handleOrderChange} />
				</section>
				<Button
					label="Save Folder"
					onClick={(): void =>
						this.bookmarksViewModel.onSaveFolderClick(
							bookmarkFolder
						)
					}
				></Button>
			</>
		);
	}
}
