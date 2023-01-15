import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';
import { Listbox } from '@headlessui/react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InputListbox & {
    label: string;
    icon?: React.FC<{ className?: string }>;
    /**
     * @defaultValue `right`
     */
    direcction?: 'left' | 'right';
    clickable?: boolean;
    action?: () => void;
    /**
     * When `icon` component is clicked will toggle to `changeTo` component
     */
    changeTo?: React.FC<{ className?: string }>;
    error?: string;
  };

type InputListbox =
  | {
      listBox?: false;
    }
  | {
      listBox?: true;
      options: {
        name: string;
        value: object | string | number;
      }[];
      // placeholder: string;
    };

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function RefInput(
    {
      label,
      icon: Icon,
      className = '',
      direcction = 'right',
      clickable = false,
      action,
      changeTo: ChangeTo,
      error,
      listBox = false,
      ...props
    },
    ref
  ) {
    const [toggleIcon, setToggleIcon] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);

    const inputElementStyle =
      'peer h-10 bg-transparent inline-block text-gray-700 outline-none placeholder:text-transparent'.trim();
    const inputLabelStyle =
      'pointer-events-none absolute -top-2 left-3 bg-white px-3 text-xs text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:px-0 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:left-3 peer-focus:px-3 peer-focus:text-xs'.trim();
    const inputClasses = clsx(
      'input',
      error ? 'input--has-error' : 'input--default'
    );

    const iconContainerClasses = 'flex items-center justify-center'.trim();
    const iconElementClasses = 'h-5 w-5 text-gray-500'.trim();
    const styledIcon = Icon ? (
      clickable ? (
        <button
          onClick={
            ChangeTo
              ? () => {
                  setToggleIcon((prev) => !prev);
                  action && action();
                }
              : action
              ? () => action?.()
              : undefined
          }
          type='button'
          className={clsx(
            iconContainerClasses,
            'mx-2 h-8 w-8 rounded-full transition-colors hover:bg-gray-200/70'
          )}
        >
          {ChangeTo ? (
            toggleIcon ? (
              <Icon className={iconElementClasses} />
            ) : (
              <ChangeTo className={iconElementClasses} />
            )
          ) : (
            <Icon className={iconElementClasses} />
          )}
        </button>
      ) : (
        <div className={clsx(iconContainerClasses, ' h-10 w-10')}>
          <Icon className={clsx(iconElementClasses, 'pointer-events-none')} />
        </div>
      )
    ) : null;

    return listBox && 'options' in props ? (
      <Listbox
        // {...(props as unknown as typeof Listbox)}
        as='div'
        className={clsx(inputClasses, 'relative inline-block')}
        value={selected}
        onChange={setSelected}
      >
        <div className='flex cursor-pointer items-center'>
          {Icon && direcction == 'left' && styledIcon}
          <Listbox.Button
            as='input'
            readOnly
            {...(!Icon && { 'data-no-icon': 'true' })}
            {...(direcction && { 'data-icon-dir': direcction })}
            className={inputElementStyle}
            value={selected ? selected : undefined}
            ref={ref}
            placeholder={label}
          />
          <Listbox.Label
            className={clsx(
              inputLabelStyle,
              direcction == 'left' && 'peer-placeholder-shown:left-10'
            )}
            placeholder={label}
          >
            {label}
          </Listbox.Label>
          {Icon && direcction == 'right' && styledIcon}
        </div>
        <Listbox.Options className='absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 overflow-auto rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {props.options.map(({ name, value }) => (
            <Listbox.Option
              className={({ active, selected }) =>
                clsx(
                  'cursor-pointer px-4 py-2',
                  active
                    ? 'bg-tan-400 text-white'
                    : selected
                    ? 'bg-gray-100 text-gray-700'
                    : 'text-gray-700'
                )
              }
              key={name}
              value={value}
            >
              {name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    ) : (
      <>
        <div className={inputClasses}>
          {Icon && direcction == 'left' && styledIcon}
          <div className='flex flex-col'>
            <input
              {...props}
              {...(!Icon && { 'data-no-icon': 'true' })}
              {...(direcction && { 'data-icon-dir': direcction })}
              ref={ref}
              id={label.toLowerCase()}
              className={clsx(
                className,
                // Icon && direcction == 'right' ? 'pl-3' : 'pr-3',
                // !Icon && 'px-3',
                inputElementStyle
              )}
              placeholder={label}
            />
            <label
              className={clsx(
                inputLabelStyle,
                direcction == 'left' && 'peer-placeholder-shown:left-10'
              )}
              htmlFor={label.toLowerCase()}
            >
              {label}
            </label>
          </div>
          {Icon && direcction == 'right' && styledIcon}
        </div>
        {error && <div className='input__error'>{error}</div>}
      </>
    );
  }
);

export default Input;
