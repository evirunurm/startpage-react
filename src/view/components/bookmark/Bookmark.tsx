import { Link } from "@components/atoms/link/link";
import styles from "./bookmark.module.css";

interface BookmarkProps {
    name: string;
    url: string;
}

export const Bookmark: React.FC<BookmarkProps> = ({ name, url }) => {
    return (
        <Link className={styles.bookmark} href={url}>{name}</Link>
    );
};