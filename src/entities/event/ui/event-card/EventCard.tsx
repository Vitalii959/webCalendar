import "./eventCard.css";
type Props = {
  title: string;
  time: string;
  top: number;
  height: number;
  onEventClick: () => void;
};

export const EventCard = ({title, time, top, height, onEventClick}: Props) => {
  return (
    <div
      className='eventCard'
      style={{top: `${top}px`, height: `${height}px`}}
      onClick={onEventClick}
    >
      <p className='text-xl text-left ml-1'>{title}</p>
      <p className='text-xs text-left ml-1 pb-1'>{time}</p>
    </div>
  );
};
