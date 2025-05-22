import { useParams } from 'react-router-dom';
import useDetailPresenter from '../presenters/DetailPresenter';
import DetailView from '../views/DetailView';

export default function DetailPage() {
  const { id } = useParams();
  const presenter = useDetailPresenter(id);
  return <DetailView presenter={presenter} />;
}
