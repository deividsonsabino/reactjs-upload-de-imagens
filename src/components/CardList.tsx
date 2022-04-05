import { Grid, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [currentImage, setCurrentImage] = useState('')


  function handleViewImage(url: string): void {
    onOpen();
    setCurrentImage(url)
  }

  return (
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap={'40px'}>
        {cards.map((card) => (

          <Card
            key={card.id}
            data={card}
            viewImage={() => handleViewImage(card.url)}
          />
        ))}
      </Grid>

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={currentImage}
      />
    </>
  );
}
