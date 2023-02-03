import { Input, Header } from '@/components/atoms';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';

const SectionHero = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'headers.header-one.home',
  });
  return (
    <section className='mt-20'>
      <Header heading='h1' label={t('low-prices-every-day')} />
      <p className='w-1/2 text-gray-500'>
        Aenean laoreet tortor et felis finibus, eget pulvinar neque
        pellentesque. Sed augue urna, varius eu est quis, aliquam ultrices nisi.
      </p>
      <Input
        className='mt-7 w-3/6'
        label='Search products'
        icon={MagnifyingGlassIcon}
      />
    </section>
  );
};

export default SectionHero;
