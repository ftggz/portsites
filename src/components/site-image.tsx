import { getImage, type ImageKey } from "@/lib/images";

type LoadingProps = {
  priority?: boolean;
};

type SiteImageProps = LoadingProps & {
  image: ImageKey;
  alt: string;
  sizes: string;
  className?: string;
};

export function SiteImage({ image, alt, sizes, priority = false, className }: SiteImageProps) {
  const asset = getImage(image);
  return (
    <img
      src={asset.src}
      srcSet={asset.srcSet}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}

type ArtDirectedImageProps = LoadingProps & {
  mobile: ImageKey;
  desktop: ImageKey;
  alt: string;
  sizes: string;
  media?: string;
  className?: string;
  imgClassName?: string;
};

export function ArtDirectedImage({
  mobile,
  desktop,
  alt,
  sizes,
  priority = false,
  media = "(min-width: 48rem)",
  className,
  imgClassName,
}: ArtDirectedImageProps) {
  const small = getImage(mobile);
  const large = getImage(desktop);
  return (
    <picture className={className}>
      <source
        media={media}
        srcSet={large.srcSet}
        sizes={sizes}
        width={large.width}
        height={large.height}
      />
      <img
        src={small.src}
        srcSet={small.srcSet}
        sizes={sizes}
        width={small.width}
        height={small.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}
