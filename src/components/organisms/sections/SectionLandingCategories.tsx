import { Header } from '@/components/atoms';
import { CubesLanding } from '@/components/atoms/Figures';
import { CardCategory } from '@/components/molecules';
import { uniqueId } from '@/utils/unique-id';

const SectionLandingCategories: React.FC = () => {
  return (
    <section className='relative'>
      <Header
        heading='h2'
        label='GET ALL YOU ALWAYS'
        highLightedWord='WANTED'
      />
      <div className='mt-5 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4'>
        {new Array(8).fill('').map(() => (
          <CardCategory
            href={`/categories/${uniqueId()}`}
            name='Accesories'
            url='/images/placeholder-image.png'
            key={uniqueId()}
          />
        ))}
      </div>
      <CubesLanding className='absolute -right-20 -bottom-96 -z-10' />
    </section>
  );
};

export default SectionLandingCategories;
