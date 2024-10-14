

interface BookmarkProps {
    name: string;
    url: string;
}

export const Bookmark: React.FC<BookmarkProps> = ({ name, url }) => {
    return (
        <div>
            <a href={url}>{name}</a>
        </div>
    );
};