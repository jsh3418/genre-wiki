import { useParams } from 'react-router-dom';
export function SearchPage() {
  const { id } = useParams();
  return (
    <div>
      나 검색페이지
      <div>{id}</div>
    </div>
  );
}
