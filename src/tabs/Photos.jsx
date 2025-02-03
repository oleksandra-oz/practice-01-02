import Text from '../components/Text/Text';
import Form from '../components/Form/Form.jsx';
import { useEffect, useState } from 'react';
import { getPhotos } from '../apiService/photos.js';
import Loader from '../components/Loader/Loader.jsx';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery.jsx';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async () => {
      setIsLoading(true);

      try {
        const { photos, total_results, per_page } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages(prev => [...prev, ...photos]); // this function set ACTUAL DATA for images
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [page, query]);

  const onHandleSubmit = value => {
    setQuery(value);
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {images.length > 0 && <PhotosGallery images={images} />}
      {isLoading && <Loader />}
      {error && (
        <Text textAlign="center">Ooops! Something went wrong... - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">We found nothing for your request</Text>
      )}
    </>
  );
};

export default Photos;
