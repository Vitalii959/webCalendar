import "./eventCard.css";
type Props = {
  title: string;
  time: string;
  top: number;
  height: number;
  color: string | undefined;
  onEventClick: () => void;
};

export const EventCard = ({
  title,
  time,
  top,
  height,
  color,
  onEventClick
}: Props) => {
  return (
    <div
      className='eventCard'
      style={{
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: `${color}63`,
        borderLeft: `4px solid ${color}`
      }}
      onClick={onEventClick}
    >
      <p className='eventCard__title'>{title}</p>
      <p className='eventCard__time'>{time}</p>
    </div>
  );
};
