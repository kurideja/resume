import { RangeInput } from '@/components/images/RangeInput';
import { RGBA } from '@/types/colorManipulation';
import { ComponentProps } from 'react';
import { Path, useForm } from 'react-hook-form';

interface Props {
  disabled?: boolean;
  onChange: (color: keyof RGBA, value: number) => void;
  onReset: () => void;
}

export function RgbControls(props: Props) {
  const { disabled, onChange, onReset } = props;
  const {
    control,
    setValue,
    reset: resetForm,
  } = useForm<RGBA>({ defaultValues: { red: 127, green: 127, blue: 127, alpha: 255 } });

  const handleInputChange = (name: Path<RGBA>, value: number) => {
    onChange(name, value);
    setValue(name, value);
  };

  const reset = () => {
    resetForm();
    onReset();
  };

  const rangeInput = (color: Path<RGBA>): ComponentProps<typeof RangeInput<RGBA>> => {
    return {
      name: color,
      label: color,
      min: 0,
      max: 255,
      step: 1,
      control,
      handleInputChange,
    };
  };

  const rangeInputs = [
    rangeInput('red'),
    rangeInput('green'),
    rangeInput('blue'),
    rangeInput('alpha'),
  ];

  return (
    <form className="flex flex-col gap-2">
      {rangeInputs.map((props) => (
        <RangeInput key={props.name} {...props} disabled={disabled} />
      ))}

      <div>
        <button
          type="reset"
          onClick={reset}
          disabled={disabled}
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
