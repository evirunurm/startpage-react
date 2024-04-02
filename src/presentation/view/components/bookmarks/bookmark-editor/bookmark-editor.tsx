import React from "react";
import IBookmarksViewModel from "@viewModels/bookmarks/IBookmarksViewModel";
import { Button } from "@components/button/button";
import IBaseView from "@view/IBaseView";
import IBookmark from "@entity/bookmarks/structures/IBookmark";
import Bookmark from "@entity/bookmarks/models/Bookmark";

export interface BookmarkEditorComponentProps {
	bookmarksViewModel: IBookmarksViewModel;
	bookmarkID?: string;
}

export interface BookmarkEditorEditorComponentState {
	bookmark: IBookmark;
}

export default class BookmarkEditorComponent
	extends React.Component<
		BookmarkEditorComponentProps,
		BookmarkEditorEditorComponentState
	> implements IBaseView
{
	private bookmarksViewModel: IBookmarksViewModel;

	public constructor(props: BookmarkEditorComponentProps) {
		super(props);
		const { bookmarksViewModel } = this.props;
		this.bookmarksViewModel = bookmarksViewModel;
		let bookmark: Bookmark | undefined;

		bookmark = bookmarksViewModel.getEditingBookmark();
		if (!bookmark) {
			bookmark = new Bookmark();
		}

		this.state = {
			bookmark: bookmark,
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
				bookmark: this.bookmarksViewModel.getEditingBookmark() ?? new Bookmark()
			}
		);
	}

	handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { bookmark } = this.state;
		const updatedBookmark = { ...bookmark, name: event.target.value };
		this.setState({ bookmark: updatedBookmark });
	};

	handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { bookmark } = this.state;
		const updatedBookmark = { ...bookmark, order: parseInt(event.target.value) };
		this.setState({ bookmark: updatedBookmark });
	};

	public render(): JSX.Element {
		const { bookmark } = this.state;

		return (
			<>
				<h3>Bookmark Editor: {bookmark.name} ({bookmark.id})</h3>
				<section>
					<input type="text" value={bookmark.name} onChange={this.handleNameChange} />
					<input type="number" value={bookmark.order.toString()} onChange={this.handleOrderChange} />
				</section>
				<Button
					label="Save Bookmark"
					onClick={(): void =>
						this.bookmarksViewModel.onSaveBookmarkClick(
							bookmark
						)
					}
				></Button>
				<Button
					label="Close"
					onClick={(): void =>
						this.bookmarksViewModel.onCloseBookmarkEditor()
					}
				></Button>
			</>
		);
	}
}
