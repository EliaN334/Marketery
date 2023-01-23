import { Header } from '@/components/atoms';
import Image from 'next/image';

const path = '/images/placeholder-image.png';

const SectionLandingGallery: React.FC = () => {
  return (
    <section className='flex flex-col items-center'>
      <Header heading='h2' label='WE HAVE FOR ALL' highLightedWord='CHOICES' />
      <div className='mt-20 grid w-full grid-cols-2 gap-7'>
        <div className='flex flex-col gap-7'>
          <div className='relative h-96'>
            <Image src={path} alt='' fill className='object-cover' />
          </div>
          <div className='relative h-52'>
            <Image src={path} alt='' fill className='object-cover' />
          </div>
        </div>

        <div className='relative -top-24 flex flex-col gap-7'>
          <div className='flex items-end gap-7'>
            <div className='relative h-40 flex-1'>
              <Image src={path} alt='' fill className='object-cover' />
            </div>
            <div className='relative h-52 flex-1'>
              <Image src={path} alt='' fill className='object-cover' />
            </div>
          </div>

          <div className='relative h-40 w-full'>
            <Image src={path} alt='' fill className='object-cover' />
          </div>

          <div className='flex gap-7'>
            <div className='relative h-80 flex-1'>
              <Image src={path} alt='' fill className='object-cover' />
            </div>
            <div className='relative h-96 flex-1'>
              <Image src={path} alt='' fill className='object-cover' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLandingGallery;
