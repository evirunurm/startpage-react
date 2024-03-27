import React from "react";
import IBookmarksViewModel from "../../../../view-model/bookmarks/IBookmarksViewModel";
import IBookmarkFolder from "../../../../../domain/entity/bookmarks/structures/IBookmarkFolder";
import BookmarkFolder from "../../../../../domain/entity/bookmarks/models/BookmarkFolder";
import { Button } from "../../button/button";
import IBaseView from "../../../IBaseView";
import BookmarkEditorComponent from "../bookmark-editor/bookmark-editor";

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
	
	handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { bookmarkFolder } = this.state;
		const updatedFolder = { ...bookmarkFolder, order: parseInt(event.target.value) };
		this.setState({ bookmarkFolder: updatedFolder });
	};

	public render(): JSX.Element {
		const { bookmarkFolder } = this.state;

		return (
			<>
				<h2>Folder Editor: {bookmarkFolder.name} ({bookmarkFolder.id})</h2>
				<section>
					<input type="text" value={bookmarkFolder.name} onChange={this.handleNameChange} />
					<input type="number" value={bookmarkFolder.order.toString()} onChange={this.handleOrderChange} />
					<ol>
						{
							bookmarkFolder.bookmarks.map((bookmark, index) => 
								<li key={index}>
									{bookmark.name}: <strong>{bookmark.url}</strong>
									<Button
										label="Edit bookmark"
										onClick={(): void => this.bookmarksViewModel.onOpenBookmarkSaverClick(bookmark.id)}
									/>
								</li>
							)
						}
					</ol>

					{
						this.bookmarksViewModel.bookmarkEditorOpen ? 
						<BookmarkEditorComponent 
							bookmarksViewModel={this.bookmarksViewModel}
						/> : 
						<Button
							label="Add new Bookmark"
							onClick={(): void =>
								this.bookmarksViewModel.onOpenBookmarkSaverClick()
							}
						></Button>
					}

					
				</section>
				<Button
					label="Save Folder"
					onClick={(): void =>
						this.bookmarksViewModel.onSaveFolderClick(
							bookmarkFolder
						)
					}
				></Button>
				<Button
					label="Close Folder Editor"
					onClick={(): void =>
						this.bookmarksViewModel.onCloseFolderEditor()
					}
				></Button>
			</>
		);
	}
}
