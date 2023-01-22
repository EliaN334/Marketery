import Image from 'next/image';
import clsx from 'clsx';
import NukaCarousel from 'nuka-carousel';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { CarouselProps as NukaCarouselProps } from 'nuka-carousel';

type CarouselProps = NukaCarouselProps & {
  images: {
    url: string;
    alt: string;
  }[];
  className?: string;
  slideClassName?: string;
  navigation?: boolean;
  pagination?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  className = '',
  slideClassName = 'h-52',
  navigation = false,
  pagination = false,
  ...carouselOptions
}) => {
  return (
    <NukaCarousel
      {...carouselOptions}
      className={clsx('relative', className)}
      renderCenterRightControls={
        navigation
          ? ({ nextSlide, nextDisabled }) => {
              return (
                <button
                  type='button'
                  disabled={nextDisabled}
                  aria-disabled={nextDisabled}
                  aria-label='Next slide'
                  className='mr-3 rounded-full bg-tan-400 p-3 text-white transition-colors disabled:bg-opacity-75'
                  onClick={nextSlide}
                >
                  <ChevronRightIcon className='h-5 w-5' />
                </button>
              );
            }
          : () => null
      }
      renderCenterLeftControls={
        navigation
          ? ({ previousSlide, previousDisabled }) => {
              return (
                <button
                  type='button'
                  disabled={previousDisabled}
                  aria-disabled={previousDisabled}
                  aria-label='Previous slide'
                  className='ml-3 rounded-full bg-tan-400 p-3 text-white transition-colors disabled:bg-opacity-75'
                  onClick={previousSlide}
                >
                  <ChevronLeftIcon className='h-5 w-5' />
                </button>
              );
            }
          : () => null
      }
      renderBottomCenterControls={
        pagination
          ? ({ pagingDotsIndices, currentSlide, goToSlide }) => {
              return (
                <div className='mb-3 flex items-center gap-1.5'>
                  {pagingDotsIndices.map((idx) => {
                    const isActive = idx == currentSlide;
                    return (
                      <button
                        type='button'
                        onClick={() => goToSlide(idx)}
                        key={idx}
                        className={clsx(
                          'h-1.5 w-1.5 rounded-full ring-1 transition-colors',
                          isActive
                            ? 'bg-tan-400 ring-tan-400'
                            : 'bg-gray-300 ring-gray-400'
                        )}
                      />
                    );
                  })}
                </div>
              );
            }
          : () => null
      }
    >
      {images.map(({ url, alt }) => (
        <div key={alt} className={clsx('relative w-full', slideClassName)}>
          <Image className='object-cover' src={url} alt={alt} fill />
        </div>
      ))}
    </NukaCarousel>
  );
};

export default Carousel;
