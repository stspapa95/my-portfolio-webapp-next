import Image from "next/image";
import { PlaceholderMedia } from "@/components/placeholder-media";

const darkBlur =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGfAD//2Q==";

type ProjectMediaProps = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  sizes: string;
  priority?: boolean;
};

export function ProjectMedia({
  src,
  alt,
  label = "product shot — 16:10",
  className = "",
  sizes,
  priority = false,
}: ProjectMediaProps) {
  if (!src) {
    return <PlaceholderMedia label={label} className={className} />;
  }

  return (
    <div className={`relative size-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        placeholder="blur"
        blurDataURL={darkBlur}
        priority={priority}
      />
    </div>
  );
}
