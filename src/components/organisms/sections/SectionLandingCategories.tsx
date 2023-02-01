import { Header } from '@/components/atoms';
import { CubesLanding } from '@/components/atoms/Figures';
import { CardCategory } from '@/components/molecules';
import { uniqueId } from '@/utils/unique-id';
import { useTranslation } from 'next-i18next';

const SectionLandingCategories: React.FC = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'headers.header-two.home',
  });
  return (
    <section className='relative'>
      <Header
        heading='h2'
        label={t('get-all-you-allways-wanted.label') as string}
        highLightedWord={t('get-all-you-allways-wanted.word') as string}
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
      <CubesLanding className='absolute -right-20 -bottom-96 -z-10 h-auto w-fit' />
    </section>
  );
};

export default SectionLandingCategories;
