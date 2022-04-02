import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {

  const fetchImages = async ({ pageParam = null }) => {
    const { data } = await api.get('/api/images', { params: { after: pageParam } })
    return data
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages, {
    getNextPageParam: lastpage => lastpage?.after || null
  });

  const formattedData = useMemo(() => {
    const formattedData = data?.pages.flatMap(images => {
      return images.data.flat()
    })

    return formattedData

  }, [data]);

  if (isLoading && !isError) {
    return <Loading />;
  }

  // // TODO RENDER ERROR SCREEN
  if (isError && !isLoading) {
    return <Error />;
  }


  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && formattedData.length > 0 &&
          <Button
            mt="10"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Carregando...'
              : 'Carregar mais'
            }
          </Button>
        }
      </Box>
    </>
  );
}
