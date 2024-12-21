import { PropsWithChildren } from "react";
import styles from "./tag.module.css";
import { Link, LinkProps, TooltipTrigger } from "react-aria-components";
import { ToolTip } from "../tooltip/tooltip";

type Props = LinkProps & {
	tooltip?: string;
}

export const Tag = ({
	children,
	tooltip,
	...props
}: PropsWithChildren<Props>) => (
	<TooltipTrigger
		delay={800}
		closeDelay={0}
	>
		<Link
			{...props}
			className={styles.tag}
		>
			{children}
		</Link >
		{!tooltip ? null :
			<ToolTip
				placement='left'
				text={tooltip}
			/>
		}
	</TooltipTrigger>
);