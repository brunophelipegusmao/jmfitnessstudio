
interface SubtitleH2Props {
    children: React.ReactNode;
    className?: string;
}

export default function SubtitleH2({ children, className }: SubtitleH2Props) {
    return (
        <h2 className={`text-4xl text-secondary text-center font-bold mb-4 ${className}`}>
            {children}
        </h2>
    );
}