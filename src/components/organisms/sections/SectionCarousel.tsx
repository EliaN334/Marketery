import { Carousel } from '@/components/molecules';

const SectionCarousel: React.FC = () => {
  return (
    <section className='relative space-y-16'>
      <Carousel
        wrapAround
        autoplay
        slideClassName='h-80'
        images={new Array(5).fill('').map(() => ({
          alt: '',
          url: '/images/placeholder-image.png',
        }))}
        navigation
        pagination
      />
    </section>
  );
};

export default SectionCarousel;
