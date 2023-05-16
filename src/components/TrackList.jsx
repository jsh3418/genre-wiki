export function TrackList({ data }) {
  return (
    <div className="mt-[10px] mx-auto relative flex justify-center items-center top-[40px]">
      <ul className="grid gap-[30px] mx-auto">
        {data.map((track, index) => (
          <li className="flex rounded-[8px] shadow-[0_4px_24px_rgba(48,62,75,.06)]" key={index}>
            <img className="w-[150px] h-[150px]" src={track.image} alt={track.name} />
            <div className="justify-center items-center flex flex-col w-[150px] h-[150px]">
              <div className="text-[14px]">{track.artist}</div>
              <div className="text-[18px]">{track.name}</div>
            </div>
            <div className="px-[20px] flex flex-col justify-evenly ">
              <div className="flex justify-center items-center gap-[15px]">
                <div className="flex font-[700] bg-[#FFFF64] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  pop
                </div>
                <div className="flex font-[700] bg-[#FFFF64] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  rock
                </div>
                <div className="flex font-[700] bg-[#FFFF64] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  hiphop
                </div>
                <div className="flex font-[700] bg-[#FFFF64] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  dance
                </div>
                <div className="flex font-[700] bg-[#FFFF64] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  house
                </div>
              </div>
              <div className="flex justify-center items-center gap-[15px]">
                <div className="flex font-[200] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  user
                </div>
                <div className="flex font-[200] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  user
                </div>
                <div className="flex font-[200] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  user
                </div>
                <div className="flex font-[200] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  user
                </div>
                <div className="flex font-[200] justify-center text-[15px]  w-[80px] border-[1px] rounded-[25px] border-[#243c5a]">
                  user
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
