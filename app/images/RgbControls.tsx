import { RangeInput } from '@/components/images/RangeInput';
import { RGBA } from '@/types/colorManipulation';
import { ComponentProps, useEffect } from 'react';
import { Path, useForm } from 'react-hook-form';

interface Props {
  disabled?: boolean;
  onChange: (colors: RGBA) => void;
}

export function RgbControls(props: Props) {
  const { disabled, onChange } = props;
  const { control, setValue, watch, getValues, reset: resetForm } = useForm<RGBA>();

  const formValues = watch();

  useEffect(() => {
    onChange(getValues());
  }, [formValues, getValues, onChange]);

  const handleInputChange = (name: Path<RGBA>, value: number) => {
    setValue(name, value);
  };

  const colorInput = (color: Path<RGBA>): ComponentProps<typeof RangeInput<RGBA>> => {
    return {
      name: color,
      label: color,
      min: 0,
      max: 255,
      defaultValue: 127,
      step: 1,
      control,
      handleInputChange,
    };
  };

  const alphaInput = (): ComponentProps<typeof RangeInput<RGBA>> => {
    return {
      ...colorInput('alpha'),
      defaultValue: 255,
    };
  };

  const rangeInputs = [colorInput('red'), colorInput('green'), colorInput('blue'), alphaInput()];
  const reset = () => {
    resetForm();
  };

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
