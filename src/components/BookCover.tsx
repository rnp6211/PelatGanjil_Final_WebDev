import Image from "next/image";

type BookCoverProps = {
  title: string;
  coverUrl?: string | null;
  className?: string;
};

export default function BookCover({ title, coverUrl, className = "" }: BookCoverProps) {
  if (coverUrl) {
    return (
      <Image
        src={coverUrl}
        alt={`Sampul buku ${title}`}
        width={220}
        height={320}
        unoptimized
        className={`book-cover ${className}`}
      />
    );
  }

  return (
    <div className={`book-cover book-cover-placeholder ${className}`} role="img" aria-label={`Sampul buku ${title}`}>
      <span>{title.charAt(0).toUpperCase()}</span>
    </div>
  );
}
