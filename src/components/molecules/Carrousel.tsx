import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper';
import clsx from 'clsx';
import { A11y } from 'swiper';
import 'swiper/css/bundle';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type CarrouselProps = {
  images: {
    url: string;
    alt: string;
  }[];
  className?: string;
  slideClassName?: string;
  swiperOptions: SwiperOptions;
};

const Carrousel: React.FC<CarrouselProps> = ({
  images,
  className = '',
  slideClassName = '',
  swiperOptions,
}) => {
  const moduleConfig = {
    Pagination: {
      clickable: true,
      bulletActiveClass: 'sw-bullet--active',
      bulletClass: 'sw-bullet',
    },
    Navigation: {
      nextEl: '.sw-nav-btn-next',
      prevEl: '.sw-nav-btn-prev',
    },
  };

  return (
    <Swiper
      {...swiperOptions}
      modules={[...(swiperOptions?.modules ?? []), A11y]}
      {...(swiperOptions?.modules
        ?.map((mdl) => mdl.name)
        ?.includes('Pagination') && {
        pagination: moduleConfig.Pagination,
      })}
      {...(swiperOptions?.modules
        ?.map((mdl) => mdl.name)
        ?.includes('Navigation') && {
        navigation: moduleConfig.Navigation,
      })}
      className={clsx('relative', className)}
      spaceBetween={50}
      slidesPerView={1}
      a11y={{ enabled: true }}
    >
      {swiperOptions?.modules?.map((mdl) =>
        mdl.name == 'Navigation' ? (
          <>
            <button className='sw-nav-btn-next absolute top-[40%] right-3 z-10 flex items-center justify-center rounded-full bg-tan-400 p-3 transition-none disabled:bg-tan-400/70'>
              <ChevronRightIcon className='h-5 w-5 text-white' />
            </button>
            <button className='sw-nav-btn-prev absolute top-[40%] left-3 z-10 flex items-center justify-center rounded-full bg-tan-400 p-3 transition-none disabled:bg-tan-400/70'>
              <ChevronLeftIcon className='h-5 w-5 text-white' />
            </button>
          </>
        ) : null
      )}
      {images.map(({ url, alt }) => (
        <SwiperSlide key={alt}>
          <div className={clsx('relative h-52 w-full', slideClassName)}>
            <Image className='object-cover' src={url} alt={alt} fill />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carrousel;
