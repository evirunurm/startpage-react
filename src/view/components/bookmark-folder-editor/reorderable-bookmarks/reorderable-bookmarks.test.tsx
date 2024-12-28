import { render } from "@test/test-utils"
import { ReorderableBookmarks } from "./reorderable-bookmarks";
import { axe } from "vitest-axe";

describe("ReorderableBookmarks", () => {
	it("is accesible", async () => {
		const { container } = render(<ReorderableBookmarks
			bookmarks={[]}
			onFolderReorder={() => { }}
			onDeleteBookmark={() => { }}
			onSaveBookmark={() => { }}
		/>);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});