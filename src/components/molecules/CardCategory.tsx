import Image from 'next/image';
import Link from 'next/link';

type CardCategoryProps = {
  name: string;
  /** Image url */
  url: string;
  href: string;
};
const CardCategory: React.FC<CardCategoryProps> = ({ name, url, href }) => {
  return (
    <Link
      href={href}
      className='inline-block rounded-md border border-gray-200 p-4 transition-[box-shadow] ease-out hover:shadow-xl'
    >
      <p className='mb-2 text-2xl text-gray-500'>{name}</p>
      <div className='relative h-52 w-52'>
        <Image
          src={url}
          fill
          className='object-cover'
          alt={`Search in categories for ${name}`}
        />
      </div>
    </Link>
  );
};

export default CardCategory;
