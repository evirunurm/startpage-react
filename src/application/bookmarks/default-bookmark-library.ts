import IBookmarkLibrary from "@domain/bookmarks/IBookmarkLibrary";
import { generateUniqueId } from "@utils/utils";

export default {
	bookmarkFolders: [
		{
			id: generateUniqueId(),
			name: "_social",
			bookmarks: [
				{
					id: generateUniqueId(),
					name: "Bookmark 1",
					url: "",
				}, {
					id: generateUniqueId(),
					name: "Bookmark 2",
					url: "",
				}, {
					id: generateUniqueId(),
					name: "Bookmark 3",
					url: "",
				}, {
					id: generateUniqueId(),
					name: "Bookmark 4",
					url: ""
				}
			]
		}, {
			id: generateUniqueId(),
			name: "_video",
			bookmarks: [
				{
					id: generateUniqueId(),
					name: "Bookmark 1",
					url: "",
				}, {
					id: generateUniqueId(),
					name: "Bookmark 2",
					url: "",
				}, {
					id: generateUniqueId(),
					name: "Bookmark 3",
					url: ""
				}
			]
		}, {
			id: generateUniqueId(),
			name: "_news",
			bookmarks: [
				{
					id: generateUniqueId(),
					name: "Bookmark 1",
					url: "",
				}, {
					id: generateUniqueId(),
					name: "Bookmark 2",
					url: "",
				}, {
					id: generateUniqueId(),
					name: "Bookmark 3",
					url: ""
				}
			]
		}, {
			id: generateUniqueId(),
			name: "_random",
			bookmarks: [
				{
					id: generateUniqueId(),
					name: "Bookmark 1",
					url: "",
				}, {
					id: generateUniqueId(),
					name: "Bookmark 2",
					url: "",
				}, {
					id: generateUniqueId(),
					name: "Bookmark 3",
					url: ""
				}
			]
		}
	]
} as IBookmarkLibrary;