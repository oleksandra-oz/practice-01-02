import { Grid } from 'react-loader-spinner';
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';

const PhotosGallery = ({ images }) => {
  return (
    <Grid>
      {images.map(({ id, alt, src, avg_color }) => (
        <PhotosGalleryItem key={id} alt={alt} src={src} avg_color={avg_color} />
      ))}
    </Grid>
  );
};
export default PhotosGallery;
