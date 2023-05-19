import * as d3 from 'd3';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';

export function MyPage() {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('userId') ?? '';
    setUserId(id);
  }, []);

  useEffect(() => {
    if (userId) {
      const ref = doc(db, 'users', userId);
      (async () => {
        const querySnapshot = await getDoc(ref);
        const querySnapshotData = querySnapshot.data();

        setUserData(querySnapshotData);
      })();
    }
  }, [userId]);

  return <>{userData.votedGenre && <MyVote votedGenre={userData.votedGenre} />}</>;
}

function MyVote({ votedGenre }) {
  const userGenre = {};

  for (const [trackId, genres] of Object.entries(votedGenre)) {
    genres.forEach((genre) => (userGenre[genre] ? (userGenre[genre] += 1) : (userGenre[genre] = 1)));
  }

  const pieData = Object.entries(userGenre).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="animate-appear container flex mx-auto">
      <div className="flex mx-auto mt-[25px]">
        <div className="flex border-[2px] border-[#cecece] rounded-[6px] py-[25px] px-[20px] text-[15px] flex-col font-[300] gap-[25px] ">
          <button
            className="flex text-[10px] font-[200] rounded-[8px] h-[20px] items-center 
          justify-center border-[1px] border-[#3f3f3f] w-[85px]
          shadow-[0_4px_24px_rgba(48,62,75,.06)]"
          >
            MY GENRE
          </button>
          <button
            className="flex text-[10px] font-[200] rounded-[8px] h-[20px] items-center 
          justify-center border-[1px] border-[#3f3f3f] w-[85px]
          shadow-[0_4px_24px_rgba(48,62,75,.06)]"
          >
            MY TRACK
          </button>
        </div>
        <div
          className="border-[2px] border-[#cecece]
        w-[500px] rounded-[6px] py-[25px] px-[25px]  h-[310px] ml-[20px] "
        >
          <div className="flex flex-wrap p-[5px] justify-center content-evenly gap-x-12 gap-y-2 ">
            {Object.entries(userGenre)
              .sort((a, b) => b[1] - a[1])
              .map(([name, count], index) => (
                <MyGenres name={name} count={count} key={index} />
              ))}
          </div>
          <div>
            <PieChart genres={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MyGenres({ name, count }) {
  return (
    <div className="flex flex-col">
      <h1
        className="italic font-[300] flex justify-center text-[12px] w-[100px] h-[20px]
      transition duration-[300] font-[200] 
      border-[1px] rounded-[25px] border-[#243c5a] bg-[white]"
      >
        {name}
      </h1>
      <h2 className="mx-auto italic text-[8px] ">{count}</h2>
    </div>
  );
}

function PieChart({ genres }) {
  const ref = useRef();

  const [activePie, setActivePie] = useState(null);
  const [activePieCount, setActivePieCount] = useState(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const pie = d3.pie().value((d) => d.count);
    const dataReady = pie(genres);

    const color = d3
      .scaleOrdinal()
      .domain([0, d3.max(genres, (g) => g.count)])
      .range(d3.schemeSet1);

    const arc = d3.arc().innerRadius(50).outerRadius(75);
    const hoverArc = d3.arc().innerRadius(50).outerRadius(80);

    setTimeout(() => {
      // Add timeout
      const g = svg
        .attr('width', 300)
        .attr('height', 300)
        .selectAll('g')
        .data(dataReady)
        .join('g')
        .attr('transform', 'translate(150, 150)');

      g.append('path')
        .attr('d', arc)
        .attr('stroke', 'white')
        .style('stroke-width', '5px')
        .style('opacity', 0.3)
        .on('mouseenter', (d, genre) => {
          d3.select(d.currentTarget).transition().duration(200).attr('d', hoverArc).style('opacity', 1);
          setActivePie(genre.data.name);
          setActivePieCount(genre.data.count);
        })
        .on('mouseleave', (d) => {
          d3.select(d.currentTarget).transition().duration(200).attr('d', arc).style('opacity', 0.3);
          setActivePie(null);
          setActivePieCount(null);
        })
        .attr('fill', (d) => color(d.data.count))
        .transition()
        .duration(1000)
        .attrTween('d', function (d) {
          var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
          return function (t) {
            d.endAngle = i(t);
            return arc(d);
          };
        });

      return () => {
        g.selectAll().remove();
      };
    }, 1000); // 1 second delay
  }, []);

  return (
    <div className="flex justify-center items-center relative left-[0px] top-[-60px] ">
      <svg ref={ref} />
      <div className="absolute center z-100">
        {activePie && (
          <div>
            <div className="italic font-[300] text-[15px]">{activePie}</div>
          </div>
        )}
      </div>
    </div>
  );
}
