import React, { forwardRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: {
    el: React.FC<{ className?: string }>;
    /** @default right */
    direcction?: 'left' | 'right';
  };
};

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function RefInput({ label, icon, className = '', ...props }, ref) {
    const styledIcon = icon?.el ? (
      <div className='flex w-10 items-center justify-center p-2'>
        <icon.el className='pointer-events-none h-5 w-5 text-gray-500' />
      </div>
    ) : null;
    return (
      <div className='inline-flex rounded bg-gray-50 ring-1 ring-gray-200 transition-[box-shadow] ease-out focus-within:ring-2 focus-within:ring-tan-400'>
        {icon?.el && icon?.direcction == 'left' && styledIcon}
        <div className='relative flex flex-col'>
          <input
            {...props}
            ref={ref}
            id={label.toLowerCase()}
            className={clsx(
              className,
              icon?.el ? 'pl-3' : 'px-3',
              'peer h-10 bg-transparent text-gray-700 outline-none'
            )}
            placeholder={label}
          />
          <label
            className='pointer-events-none absolute left-3 top-2 text-gray-500'
            htmlFor={label.toLowerCase()}
          >
            {label}
          </label>
        </div>
        {icon?.el && icon?.direcction == 'right' && styledIcon}
      </div>
    );
  }
);

Input.defaultProps = {
  icon: {
    el: MagnifyingGlassIcon,
    direcction: 'right',
  },
};

export default Input;
