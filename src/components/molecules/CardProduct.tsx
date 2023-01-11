import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { Button } from '../atoms';

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
    <article className='overflow-hidden rounded-md border border-gray-200 transition-shadow ease-out hover:shadow-lg'>
      <Link
        href={`/products/${id}`}
        className='relative block h-52 w-full overflow-hidden'
      >
        <Image
          src={image}
          alt={name}
          fill
          className='transform object-cover transition-transform duration-300 ease-out hover:scale-105'
        />
      </Link>
      <div className='p-5'>
        <h3 className='truncate'>{name}</h3>
        <p className='text-sm text-gray-500'>{description}</p>
        <div className='mt-5 flex gap-2'>
          <Button
            isLink
            href={`/products/${id}`}
            label='View this product'
            className='flex-1'
          />
          <Button
            variant='secondary'
            icon={ShoppingCartIcon}
            label='Add to cart'
            onlyIcon
          />
        </div>
      </div>
    </article>
  );
};

export default CardProduct;
