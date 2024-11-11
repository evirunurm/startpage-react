import { Link } from "@components/atoms/link/Link";

interface BookmarkProps {
    name: string;
    url: string;
}

export const Bookmark: React.FC<BookmarkProps> = ({ name, url }) => {
    return (
        <div>
            <Link href={url}>{name}</Link>
        </div>
    );
};