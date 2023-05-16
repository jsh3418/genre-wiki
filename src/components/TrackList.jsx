export function TrackList({ data }) {
  return (
    <div>
      {data.map((track, index) => (
        <div key={index}>
          <div>{track.name}</div>
          <div>{track.artist}</div>
          <img src={track.image} alt={track.name} />
        </div>
      ))}
    </div>
  );
}
