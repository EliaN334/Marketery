import Image from 'next/image';

type CardCategoryProps = {
  name: string;
  url: string;
};
const CardCategory: React.FC<CardCategoryProps> = ({ name, url }) => {
  return (
    <div className='inline-block rounded-md border border-gray-200 p-4'>
      <p className='mb-2 text-2xl text-gray-500'>{name}</p>
      <div className='relative h-52 w-52'>
        <Image
          src={url}
          fill
          className='object-cover'
          alt={`Search in categories for ${name}`}
        />
      </div>
    </div>
  );
};

export default CardCategory;
