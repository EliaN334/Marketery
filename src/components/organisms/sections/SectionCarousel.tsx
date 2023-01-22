import { Carousel } from '@/components/molecules';
import { Header, Input } from '@/components/atoms';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SectionCarousel: React.FC = () => {
  return (
    <section className='relative space-y-16'>
      <div className=''>
        <Header heading='h1' label='LOW PRICES EVERY DAY' />
        <p className='w-1/2 text-gray-500'>
          Aenean laoreet tortor et felis finibus, eget pulvinar neque
          pellentesque. Sed augue urna, varius eu est quis, aliquam ultrices
          nisi.
        </p>
        <Input
          className='mt-7 w-3/6'
          label='Search products'
          icon={MagnifyingGlassIcon}
        />
      </div>
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
