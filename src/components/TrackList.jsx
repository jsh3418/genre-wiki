export function TrackList({ data }) {
  return (
    <div className="mt-[10px] relative flex justify-center items-center top-[40px]">
      <ul className="grid gap-[30px]">
        {data.map((track, index) => (
          <li className="flex rounded-[8px] shadow-[0_4px_24px_rgba(48,62,75,.06)]" key={index}>
            <img className="w-[150px] h-[150px]" src={track.image} alt={track.name} />
            <div className="justify-center items-center flex flex-col w-[150px] h-[150px]">
              <div className="text-[14px]">{track.artist}</div>
              <div className="text-[18px]">{track.name}</div>
            </div>
            <div className="w-[400px] flex justify-center items-center gap-[30px]">
              <div>genre</div>
              <div>genre</div>
              <div>genre</div>
              <div>genre</div>
              <div>genre</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
