
import TimestampButton from "./TimestampButton";
import React from "react";

// Supports [[MM:SS]] and [[HH:MM:SS]]
const TIMESTAMP_REGEX = /\[\[(\d+:\d{2}(?::\d{2})?)\]\]/g;

function parseTimestamp(timestamp) {
  const parts = timestamp.split(":").map(Number);

  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }

  return null;
}

function formatTimeStamp_Button(text, player) {
  const parts = text.split(TIMESTAMP_REGEX);

  return parts.map((part, index) => {
    const isTimestamp = /^\d+:\d{2}(?::\d{2})?$/.test(part);

    if (isTimestamp) {
      return (
        <TimestampButton
          key={index}
          time={parseTimestamp(part)}
          displayTime={part}
          player={player}
        />
      );
    }

    return part;
  });
}

function processChildren(children, player) {
  return React.Children.map(children, (child) => {
    if (typeof child === "string") {
      return formatTimeStamp_Button(child, player);
    }

    if (React.isValidElement(child)) {
      return React.cloneElement(
        child,
        {},
        processChildren(child.props.children, player)
      );
    }

    return child;
  });
}

function TimeStampRenderer({ children, Tag, player }) {
  return (
    <Tag>
      {processChildren(children, player)}
    </Tag>
  );
}

export default TimeStampRenderer;
