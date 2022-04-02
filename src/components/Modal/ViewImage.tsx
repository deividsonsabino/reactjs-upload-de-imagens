import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent width="full" m="auto" h="auto">
        <ModalBody padding={0} w="full">
          <Image
            w="full"
            h="full"
            maxWidth="900px"
            maxHeight="600px"
            src={imgUrl}
          />
        </ModalBody>
        <ModalFooter bg="pGray.800" >
          <Link href={imgUrl}>
            Abrir Original
          </Link>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}
