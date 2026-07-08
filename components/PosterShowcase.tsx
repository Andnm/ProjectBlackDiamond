import Image, { type StaticImageData } from "next/image";

type Props = {
  image: StaticImageData;
  alt: string;
  eyebrow?: string;
  title?: string;
  caption?: string;
  variant?: "banner" | "portrait";
  priority?: boolean;
  className?: string;
};

export function PosterShowcase({
  image,
  alt,
  eyebrow,
  title,
  caption,
  variant = "banner",
  priority = false,
  className = "",
}: Props) {
  const frameWidth = variant === "portrait" ? "max-w-2xl" : "max-w-5xl";

  return (
    <figure className={`mx-auto flex w-full flex-col items-center ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-6 text-center">
          {eyebrow && <p className="eyebrow mb-3 opacity-70">{eyebrow}</p>}
          {title && <h3 className="font-headline text-3xl md:text-4xl">{title}</h3>}
        </div>
      )}
      <div
        className={`w-full ${frameWidth} overflow-hidden border border-outline/10 bg-surface-container-lowest shadow-2xl shadow-black/40`}
      >
        <Image
          alt={alt}
          className="h-auto w-full"
          placeholder="blur"
          priority={priority}
          sizes={variant === "portrait" ? "(min-width: 768px) 42rem, 100vw" : "(min-width: 1024px) 64rem, 100vw"}
          src={image}
        />
      </div>
      {caption && (
        <figcaption className="mt-5 max-w-2xl text-center text-sm leading-relaxed text-on-surface-variant">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
