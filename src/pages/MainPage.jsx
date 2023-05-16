import { TrackList } from '../components/TrackList';

export function MainPage() {
  const data = [
    {
      name: 'I AM',
      artist: 'IVE',
      image: 'https://i.scdn.co/image/ab67616d0000b27325ef3cec1eceefd4db2f91c8',
    },
    {
      name: 'UNFORGIVEN',
      artist: 'LE SSERAFIM',
      image: 'https://i.scdn.co/image/ab67616d0000b273d71fd77b89d08bc1bda219c7',
    },
    {
      name: 'Kitsch',
      artist: 'IVE',
      image: 'https://i.scdn.co/image/ab67616d0000b273204170c6b0db3a42030c5f75',
    },
    {
      name: 'Spicy',
      artist: 'aespa',
      image: 'https://i.scdn.co/image/ab67616d0000b27304878afb19613a94d37b29ce',
    },
    {
      name: 'Ditto',
      artist: 'NewJeans',
      image: 'https://i.scdn.co/image/ab67616d0000b273edf5b257be1d6593e81bb45f',
    },
  ];

  return (
    <div>
      <TrackList data={data} />
    </div>
  );
}
