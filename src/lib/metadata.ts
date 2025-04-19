import { Metadata } from 'next';

type OpenGraphType =
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other';

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: OpenGraphType;
}

export function generateMetadata({
  title = 'Connor Easton | Personal Website',
  description = 'Developer, Teacher, Pilot',
  image = '/og-image.jpg',
  url = 'https://eastonco.net',
  type = 'website',
}: MetadataProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Connor Easton',
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
  };
}
