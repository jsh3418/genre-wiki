const key = 'MmU1N2ZhMTg4OGRmNDc5YWEyY2RjMDJhNjYzM2MyZmI6ZThkYzk5ZWQ5ZTUzNGFlODg3ZDNlODgzODZjMTFlZDE=';

export async function getTrackData(artist_name, track_name) {
  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + key,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;
    const trackResponse = await fetch(
      `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(track_name)}%20artist:${encodeURIComponent(
        artist_name
      )}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const trackData = await trackResponse.json();

    if (!trackData.tracks.items[0]) {
      alert('API로 해당 artist와 track에 맞는 노래를 찾지 못했습니다.');
      throw new Error(`No track found for '${track_name}' by '${artist_name}'`);
    }

    const track_id = trackData.tracks.items[0].id;
    const image_url = trackData.tracks.items[0].album.images[0].url;

    return {
      artist: artist_name,
      genre: [
        {
          name: 'trot',
          count: 0,
        },
        {
          name: 'deep house',
          count: 0,
        },
        {
          name: 'pop',
          count: 0,
        },
        {
          name: 'house',
          count: 0,
        },
        {
          name: 'k-pop',
          count: 0,
        },
        {
          name: 'dance',
          count: 0,
        },
      ],
      id: track_id,
      image: image_url,
      name: track_name,
      totalCount: 0,
    };
  } catch (error) {
    console.error(error);
  }
}
