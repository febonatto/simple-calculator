// React imports
import { ButtonHTMLAttributes } from 'react';

// Clsx import
import clsx from 'clsx';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasColSpan?: boolean;
  danger?: boolean;
  operator?: boolean;
  resolve?:boolean;
  buttonLabel: string;
}
export default function Button({
  hasColSpan, danger, operator, resolve, buttonLabel, ...props
}: IButtonProps) {
  const buttonClasses = clsx(
    (hasColSpan && 'col-start-1 col-end-3'),
    (danger && 'text-slate-200 bg-red-700'),
    (operator && 'text-lime-600'),
    ((!danger && !operator) && 'text-gray-900'),
    (resolve ? 'bg-lime-600' : 'bg-gray-700'),
    'font-semibold text-xl rounded-md opacity-80 hover:opacity-100'
  );

  return (
    <button
      {...props}
      className={buttonClasses}
    >
      {buttonLabel}
    </button>
  )
}
