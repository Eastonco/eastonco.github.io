import { Metadata } from "next";

type OpenGraphType = 
  | "website" 
  | "article" 
  | "book" 
  | "profile" 
  | "music.song" 
  | "music.album" 
  | "music.playlist" 
  | "music.radio_station" 
  | "video.movie" 
  | "video.episode" 
  | "video.tv_show" 
  | "video.other";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: OpenGraphType;
}

export function generateMetadata({
  title = "Your Name | Personal Website",
  description = "Designer, developer, and creative technologist",
  image = "/og-image.jpg",
  url = "https://yourwebsite.com",
  type = "website",
}: MetadataProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Your Name",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@yourusername",
    },
  };
}
