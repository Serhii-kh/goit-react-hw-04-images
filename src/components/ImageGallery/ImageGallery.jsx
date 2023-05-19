import { useState, useEffect } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'Api/fetchImages';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

let page = 1;

export const ImageGallery = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  // const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [hitsSum, setHitsSum] = useState(0);
  // const [page, setPage] = useState(1)

  useEffect(() => {
    // setPage(1);
    page = 1;
    if (searchQuery === '') return;
    setLoading(true);
    setTotalHits(0);
    setHitsSum(0);

    try {
      fetchImages(searchQuery, page).then(({ hits, totalHits }) => {
        setImages(hits);
        setHitsSum(hitsSum => hitsSum + hits.length);
        setTotalHits(totalHits);
        // setPage(prevPage => prevPage + 1);
      });
      page += 1;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleLoadMoreBtnClick = () => {
    setLoading(true);

    try {
      fetchImages(searchQuery, page).then(({ hits }) => {
        setImages(images => [...images, ...hits]);
        setHitsSum(hitsSum => hitsSum + hits.length);
        // setPage(page => page + 1);
      });
      page += 1;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.listWrapper}>
      {loading && <Loader />}
      {images.length > 0 && (
        <>
          <ul className={css.ImageGallery}>
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ul>
          {hitsSum < totalHits && (
            <Button type="button" onClick={handleLoadMoreBtnClick}>
              Load more
            </Button>
          )}
        </>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  loading: PropTypes.bool,
  image: PropTypes.object,
  onClick: PropTypes.func,
  fetchImages: PropTypes.func,
};
