export function TrackInfo({ track }) {
  return (
    <>
      <img className="w-[150px] h-[150px]" src={track.image} alt={track.name} />
      <div className="justify-center items-center flex flex-col w-[150px] h-[150px]">
        <button className="text-[14px]">{track.artist}</button>
        <button className="text-[18px]">{track.name}</button>
      </div>
    </>
  );
}
