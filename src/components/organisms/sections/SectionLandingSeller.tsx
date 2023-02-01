import { Anchor, Header } from '@/components/atoms';
import {
  CubesDashboardMockup,
  DashboardMockup,
  DecoratorDots,
} from '@/components/atoms/Figures';
import { useTranslation } from 'next-i18next';

const SectionLandingSeller: React.FC = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'headers.header-two.home',
  });
  return (
    <section className='relative pb-32'>
      <Header
        heading='h2'
        variant='secondary'
        label={t('you-have-things-to-sell.0.label')}
        highLightedWord={t('you-have-things-to-sell.0.word') as string}
        lineTwo={{
          label: t('you-have-things-to-sell.1.label'),
          word: t('you-have-things-to-sell.1.word'),
        }}
      />
      <p className='mt-5 text-gray-500'>
        With our new dashboard you can easily share your <br /> products with a
        few clicks. <Anchor label='Learn more' variant='secondary' href='#' />
      </p>

      <div className='relative'>
        <DashboardMockup className='w-fit' />
        <DecoratorDots className='absolute left-0 bottom-10' />
      </div>
      <CubesDashboardMockup className='absolute -bottom-8 -z-10 h-auto w-fit' />
    </section>
  );
};

export default SectionLandingSeller;
