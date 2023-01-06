import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: {
    el?: React.FC<{ className?: string }>;
    /**
     * @defaultValue `right`
     */
    direcction?: 'left' | 'right';
    clickable?: boolean;
    action?: () => void;
    /**
     * When `el` component is clicked will toggle to `changeTo` component
     */
    changeTo?: React.FC<{ className?: string }>;
  };
  error?: string;
};

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function RefInput({ label, icon, className = '', error, ...props }, ref) {
    const [toggleIcon, setToggleIcon] = useState(true);
    const iconContainerClasses = 'flex items-center justify-center';
    const iconElementClasses = 'h-5 w-5 text-gray-500';
    const styledIcon = icon?.el ? (
      icon?.clickable ? (
        <button
          onClick={
            icon?.changeTo
              ? () => {
                  setToggleIcon((prev) => !prev);
                  icon?.action && icon.action();
                }
              : icon?.action
              ? () => icon.action?.()
              : undefined
          }
          type='button'
          className={clsx(
            iconContainerClasses,
            'mx-2 h-8 w-8 rounded-full transition-colors hover:bg-gray-200/70'
          )}
        >
          {icon?.changeTo ? (
            toggleIcon ? (
              <icon.el className={iconElementClasses} />
            ) : (
              <icon.changeTo className={iconElementClasses} />
            )
          ) : (
            <icon.el className={iconElementClasses} />
          )}
        </button>
      ) : (
        <div className={clsx(iconContainerClasses, ' h-10 w-10')}>
          <icon.el
            className={clsx(iconElementClasses, 'pointer-events-none')}
          />
        </div>
      )
    ) : null;
    return (
      <>
        <div
          className={clsx(
            'relative inline-flex items-center rounded bg-gray-50 ring-1 transition-[box-shadow] duration-300 ease-out focus-within:ring-2 ',
            error
              ? 'ring-red-400 focus-within:ring-red-500 [&:hover:not(:focus-within)]:ring-red-500'
              : 'ring-gray-200 focus-within:ring-tan-400 [&:hover:not(:focus-within)]:ring-gray-300'
          )}
        >
          {icon?.el && icon?.direcction == 'left' && styledIcon}
          <div className='flex flex-col'>
            <input
              {...props}
              ref={ref}
              id={label.toLowerCase()}
              className={clsx(
                className,
                icon?.el && icon?.direcction == 'right' ? 'pl-3' : 'pr-3',
                !icon?.el && 'px-3',
                'peer h-10 bg-transparent text-gray-700 outline-none placeholder:text-transparent'
              )}
              placeholder={label}
            />
            <label
              className={clsx(
                'pointer-events-none absolute -top-2 left-3 bg-white px-3 text-xs text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:px-0 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:left-3 peer-focus:px-3 peer-focus:text-xs',
                icon?.direcction == 'left' && 'peer-placeholder-shown:left-10'
              )}
              htmlFor={label.toLowerCase()}
            >
              {label}
            </label>
          </div>
          {icon?.el && icon?.direcction == 'right' && styledIcon}
        </div>
        {error && <div className='text-sm text-red-500'>{error}</div>}
      </>
    );
  }
);

Input.defaultProps = {
  icon: {
    direcction: 'right',
    clickable: false,
  },
};

export default Input;
