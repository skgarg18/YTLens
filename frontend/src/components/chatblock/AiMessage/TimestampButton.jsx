
import {
  format_seconds_to_time as formatDuration
} from "../../../helpers/FormatDuration";

function TimestampButton({ time, displayTime, player }) {
  return (
    <button
      type="button"
      className="text-blue-500 dark:text-blue-300 hover:font-bold hover:underline cursor-pointer"
      onClick={() => player?.seekTo(time, true)}
    >
      {displayTime || formatDuration(time)}
    </button>
  );
}

export default TimestampButton;
