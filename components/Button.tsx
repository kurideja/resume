import { MouseEventHandler, PropsWithChildren } from 'react';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button(props: PropsWithChildren<Props>) {
  const { onClick, children } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm rounded-full bg-sky-500 hover:bg-sky-700 active:bg-sky-900 px-5 py-2 text-white"
    >
      {children}
    </button>
  );
}
