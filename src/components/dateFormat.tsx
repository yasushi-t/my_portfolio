import { parseISO, format } from 'date-fns';
import ja from 'date-fns/locale/ja';

type Props = {
  dateString: string;
};

export const DateFormat = ({ dateString }: Props) => {
  return (
    <time dateTime={dateString}>
      {format(parseISO(dateString), 'yyyy.MM.dd（E）', { locale: ja })}
    </time>
  );
};
