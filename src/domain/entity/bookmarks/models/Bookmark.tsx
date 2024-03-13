import { generateUnique } from "../../../../utils/utils";
import IBookmark from "../structures/IBookmark";

export default class Bookmark implements IBookmark {
	public id: string;
	public name: string;
	public url: string;
	public order: number;
	
	public constructor (name: string = 'New Bookmark', url: string = 'https://...') {
		this.id = generateUnique();
		this.name = name;
		this.url = url;
		this.order = 0;
	}
}