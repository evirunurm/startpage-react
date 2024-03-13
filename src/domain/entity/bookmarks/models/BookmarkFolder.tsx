import { generateUnique } from "../../../../utils/utils";
import IBookmark from "../structures/IBookmark";
import IBookmarkFolder from "../structures/IBookmarkFolder";

export default class BookmarkFolder implements IBookmarkFolder {
	id: string;
	name: string;
	bookmarks: IBookmark[];
	order: number;
	
	public constructor (name: string = 'New Folder') {
		this.id = generateUnique();
		this.name = name;
		this.bookmarks = [];
		this.order = 0;
	}

	public addBookmark(bookmark: IBookmark) {
		this.bookmarks.push(bookmark);
	}
	
}