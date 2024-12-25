import IBookmark from '@domain/bookmarks/IBookmark';
import { generateUniqueId } from '@utils/utils';
import DEFAULT_BOOKMARK from './default-bookmark'

export default function BookmarkFactory() {
	const getDefaultBookmark = (): IBookmark =>
		JSON.parse(
			JSON.stringify({ ...DEFAULT_BOOKMARK, id: generateUniqueId() })
		);

	return {
		getDefaultBookmark,
	};
}
