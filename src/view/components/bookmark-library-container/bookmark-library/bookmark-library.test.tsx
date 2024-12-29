import { render } from "@test/test-utils.ts";
import { axe } from "vitest-axe";
import { BookmarkLibrary } from "./bookmark-library.tsx";

describe("BookmarkLibrary", () => {
	it("is accessible", async () => {
		const { container } = render(<BookmarkLibrary
			onEditFolderClick={() => {}}
			onDeleteFolderClick={() => {}}
		/>);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});