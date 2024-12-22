import { act, render } from "@test/test-utils"
import { CurrentTime } from "./current-time";
import { formatTime } from "@utils/date-utils";
import { TimeFormat } from "@domain/timeFomat/ITimeFormat";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { getEnumArray } from "@utils/utils";

type TimeFormatData = {
	key: string;
	value: TimeFormat;
}

const formats: TimeFormatData[] = getEnumArray(TimeFormat);

describe("CurrentTime", () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.runOnlyPendingTimers()
		vi.useRealTimers();
	});

	it("prints the time as a heading", () => {
		const { getByRole } = render(<CurrentTime />);

		expect(getByRole('heading')).toBeDefined();
	});

	it("prints by default the current time as 12 hour AM/PM format", () => {
		const { getByText } = render(<CurrentTime />);
		const formattedDate = formatTime(new Date(), TimeFormat.TWELVE_HOUR_AM_PM);

		expect(getByText(formattedDate)).toBeDefined();
	});

	it.each(formats)("prints the current time in time format if saved in local storage %s", (timeFormat: TimeFormatData) => {
		localStorage.setItem(LocalStorageType.TimeFormat, timeFormat.value);
		const { getByText } = render(<CurrentTime />);

		const formattedDate = formatTime(new Date(), timeFormat.value);
		expect(getByText(formattedDate)).toBeDefined();
	});

	it("updates the time every minute", () => {
		const { getByText } = render(<CurrentTime />);

		act(() => {
			vi.advanceTimersByTime(60000);
		});

		const updatedTime = formatTime(new Date(), TimeFormat.TWELVE_HOUR_AM_PM);
		expect(getByText(updatedTime)).toBeDefined();
	});

	it("updates the time every second", () => {
		localStorage.setItem(LocalStorageType.TimeFormat, TimeFormat.TWELVE_HOUR_WITH_SECONDS);
		const { getByText } = render(<CurrentTime />);

		act(() => {
			vi.advanceTimersByTime(1000);
		});

		const updatedTime = formatTime(new Date(), TimeFormat.TWELVE_HOUR_WITH_SECONDS);
		expect(getByText(updatedTime)).toBeDefined();
	});
});