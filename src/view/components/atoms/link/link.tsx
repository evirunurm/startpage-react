import { Link as LinkAria, LinkProps } from "react-aria-components";
import styles from './link.module.css';

interface CustomLinkProps extends LinkProps {
  className?: string;
}

export const Link: React.FC<CustomLinkProps> = ({ className = '', ...props }) => (
  <LinkAria
    className={`${styles.link} ${className}`}
    {...props}
  />
);