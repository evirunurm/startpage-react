// Data structure for transferring bookmarks between layers
export default interface IBookmark {
	id: string;
	name: string;
	url: string;
	order: number;
}