import "./colorPicker.css";
import {Icons} from "@/shared/ui-kit/icons";

type colorPickerProps = {
  colorOptions: string[];
  colorPicked: string;
  setColorPicked: (color: string) => void;
};

export function ColorPicker({
  colorOptions,
  colorPicked,
  setColorPicked,
  ...restProps
}: colorPickerProps) {
  return (
    <div className='color-picker__wrapper'>
      <div className='color-picker__title'>Color</div>
      <div className='color-picker__container' {...restProps}>
        {colorOptions.map((color, index) => (
          <div
            key={index}
            className={`color-cell`}
            onClick={() => {
              setColorPicked(color);
            }}
          >
            <Icons
              name={colorPicked === color ? "color_selected" : "color"}
              color={color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
