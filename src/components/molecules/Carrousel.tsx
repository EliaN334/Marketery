import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types/swiper-options';
import clsx from 'clsx';
import { A11y } from 'swiper';
import 'swiper/css/bundle';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type HeroCarrouselProps = {
  images: {
    url: string;
    alt: string;
  }[];
  className?: string;
  slideClassName?: string;
  swiperOptions: SwiperOptions;
};

const HeroCarrousel: React.FC<HeroCarrouselProps> = ({
  images,
  className = '',
  slideClassName = '',
  swiperOptions: { modules = [], ...swiperOptions },
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
      // {...swiperOptions}
      // modules={[A11y]}
      className={clsx(className, 'relative')}
      // {...modules.map((mdl) => {
      //   if (Object.keys(moduleConfig).includes(mdl.name)) {
      //     return {
      //       // eslint-disable-next-line
      //       // @ts-ignore
      //       [mdl.name.toLowerCase()]: moduleConfig[mdl.name],
      //     };
      //   }
      // })}
      spaceBetween={50}
      slidesPerView={1}
      // a11y={{ enabled: true }}
    >
      {/* {modules.map((mdl) =>
        mdl.name == 'Pagination' ? (
          <>
            <button className='sw-nav-btn-next absolute top-[40%] right-3 z-10 flex items-center justify-center rounded-full bg-tan-400 p-3 transition-none disabled:bg-tan-400/70'>
              <ChevronRightIcon className='h-5 w-5 text-white' />
            </button>
            <button className='sw-nav-btn-prev absolute top-[40%] left-3 z-10 flex items-center justify-center rounded-full bg-tan-400 p-3 transition-none disabled:bg-tan-400/70'>
              <ChevronLeftIcon className='h-5 w-5 text-white' />
            </button>
          </>
        ) : null
      )} */}
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

export default HeroCarrousel;
