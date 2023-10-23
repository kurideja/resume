import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

type MakeRequiredProps<T> = {
  [K in keyof T]-?: T[K];
};

type RequiredControllerProps = 'control' | 'name' | 'control';

interface Props<T extends FieldValues>
  extends MakeRequiredProps<Pick<UseControllerProps<T>, RequiredControllerProps>> {
  label: string;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  handleInputChange: (name: Path<T>, value: number) => void;
}

export function RangeInput<T extends FieldValues>(props: Props<T>) {
  const { name, label, min, max, step, control, disabled, handleInputChange } = props;

  return (
    <div>
      <label className="block capitalize text-slate-900" htmlFor={name}>
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            {...field}
            className="block"
            onChange={(e) => {
              field.onChange(e);
              handleInputChange(name, Number(e.target.value));
            }}
          />
        )}
      />
    </div>
  );
}
