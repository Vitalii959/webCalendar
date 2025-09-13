import "./select.css";

export type SelectPropsTypes = {
  options: {title: string; value: string}[];
  onSelect: (value: string) => void;
  title?: string;
  value?: string;
};

export function Select({
  options,
  onSelect,
  title,
  ...restProps
}: Omit<React.HTMLAttributes<HTMLSelectElement>, "onSelect"> &
  SelectPropsTypes) {
  return (
    <>
      {options && (
        <div className='select'>
          <div className='select__title'>{title}</div>

          <select
            className='select__container'
            {...restProps}
            onChange={(e) => {
              const value = e.target.value;
              onSelect(value);
            }}
          >
            {options.map((item, index) => (
              <option className='select__option' key={index} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
