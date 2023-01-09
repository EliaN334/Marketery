import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

type CardProductProps = {
  id: string;
  name: string;
  image: string | StaticImageData;
  /** Short description about the product */
  description: string;
};

const CardProduct: React.FC<CardProductProps> = ({
  description,
  id,
  image,
  name,
}) => {
  return (
    <article className='rounded-md border border-gray-200 p-3 transition-shadow ease-out hover:shadow-xl'>
      <Link
        href={`/products/${id}`}
        className='relative block h-52 w-full overflow-hidden rounded'
      >
        <Image
          src={image}
          alt={name}
          fill
          className='transform object-cover transition-transform duration-300 ease-out hover:scale-105'
        />
      </Link>
      <h3 className='mt-3'>{name}</h3>
      <p className='text-sm text-gray-500'>{description}</p>
    </article>
  );
};

export default CardProduct;
