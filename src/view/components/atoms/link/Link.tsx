import { Link as LinkAria, LinkProps } from "react-aria-components";

export const Link = ({ ...props }: LinkProps) => {
	return <LinkAria {...props} />;
};
