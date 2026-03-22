import { useState, useRef, useCallback, useEffect } from "react";

interface ArcSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const LABELS = [
  "Distant",
  "Slightly aware",
  "Slightly aware",
  "Faint but present",
  "Faint but present",
  "Present",
  "Present",
  "Strongly present",
  "Strongly present",
  "Deeply present",
];

const ArcSlider = ({ value, onChange, min = 1, max = 10 }: ArcSliderProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState(false);

  const width = 300;
  const height = 170;
  const cx = width / 2;
  const cy = height - 10;
  const radius = 130;
  const startAngle = Math.PI * 0.85;
  const endAngle = Math.PI * 0.15;

  const valueToAngle = (v: number) => {
    const t = (v - min) / (max - min);
    return startAngle - t * (startAngle - endAngle);
  };

  const angleToValue = (angle: number) => {
    const t = (startAngle - angle) / (startAngle - endAngle);
    return Math.round(Math.min(max, Math.max(min, min + t * (max - min))));
  };

  const pointOnArc = (angle: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy - radius * Math.sin(angle),
  });

  const describeArc = (fromAngle: number, toAngle: number) => {
    const start = pointOnArc(fromAngle);
    const end = pointOnArc(toAngle);
    const sweep = fromAngle > toAngle ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 ${sweep} ${end.x} ${end.y}`;
  };

  const getAngleFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current) return valueToAngle(value);
      const rect = svgRef.current.getBoundingClientRect();
      const svgX = ((clientX - rect.left) / rect.width) * width;
      const svgY = ((clientY - rect.top) / rect.height) * height;
      const dx = svgX - cx;
      const dy = cy - svgY;
      let angle = Math.atan2(dy, dx);
      if (angle < 0) angle += Math.PI * 2;
      angle = Math.max(endAngle, Math.min(startAngle, angle));
      return angle;
    },
    [value]
  );

  const handleInteraction = useCallback(
    (clientX: number, clientY: number) => {
      const angle = getAngleFromEvent(clientX, clientY);
      onChange(angleToValue(angle));
    },
    [getAngleFromEvent, onChange]
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const point = "touches" in e ? e.touches[0] : e;
      handleInteraction(point.clientX, point.clientY);
    };

    const onEnd = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [dragging, handleInteraction]);

  const currentAngle = valueToAngle(value);
  const thumb = pointOnArc(currentAngle);
  const labelIndex = Math.min(LABELS.length - 1, Math.max(0, value - 1));
  const currentLabel = LABELS[labelIndex];

  const filledPath = describeArc(startAngle, currentAngle);
  const trackPath = describeArc(startAngle, endAngle);

  const leftEnd = pointOnArc(startAngle);
  const rightEnd = pointOnArc(endAngle);

  return (
    <div className="flex flex-col items-center select-none">
      {/* Live label */}
      <p className="text-primary font-semibold text-lg mb-1 min-h-[28px] transition-all duration-200">
        {currentLabel}
      </p>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[300px] cursor-pointer"
        onMouseDown={(e) => {
          setDragging(true);
          handleInteraction(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          setDragging(true);
          const t = e.touches[0];
          handleInteraction(t.clientX, t.clientY);
        }}
      >
        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke="hsl(189 40% 25%)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Filled arc */}
        <path
          d={filledPath}
          fill="none"
          stroke="hsl(74 100% 56%)"
          strokeWidth="6"
          strokeLinecap="round"
          className="transition-[d] duration-75"
        />

        {/* Thumb */}
        <circle
          cx={thumb.x}
          cy={thumb.y}
          r={dragging ? 14 : 12}
          fill="hsl(74 100% 56%)"
          stroke="hsl(189 70% 15%)"
          strokeWidth="3"
          className="transition-[r] duration-150"
          style={{ filter: "drop-shadow(0 2px 6px rgba(198, 255, 46, 0.3))" }}
        />
        <circle
          cx={thumb.x}
          cy={thumb.y}
          r={4}
          fill="hsl(189 70% 15%)"
        />

        {/* End labels */}
        <text
          x={leftEnd.x - 4}
          y={leftEnd.y + 20}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
        >
          Distant
        </text>
        <text
          x={rightEnd.x + 4}
          y={rightEnd.y + 20}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
        >
          Deeply present
        </text>
      </svg>
    </div>
  );
};

export default ArcSlider;
