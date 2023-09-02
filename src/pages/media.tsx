import { MediaImage } from '@/types/media';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

type Props = {
  mediaImages: MediaImage[];
};

const fetchData = async (count: number) => {
  const apiKey = process.env.API_KEY || '';
  const serviceDomain = process.env.SERVICE_DOMAIN || '';
  const url = `https://${serviceDomain}.microcms-management.io/api/v1/media?limit=${count}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return [];
  }
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchData(20);

  return {
    props: {
      mediaImages: data.media,
    },
  };
};

const Media = ({ mediaImages }: Props) => {
  return (
    <div className='pageBasic'>
      <h1>メディアURL</h1>
      <table className='table01'>
        <tbody>
          <tr>
            <th>ファイル名</th>
            <th>ID</th>
            <th>URL</th>
          </tr>

          {mediaImages.map((image) => {
            const filename = image?.url?.match(/\/([^\/?#]+)[^\/]*$/)?.[1];

            return (
              <tr key={image.id}>
                <td>{filename}</td>
                <td>{image.id}</td>
                <td>{image.url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Media;
