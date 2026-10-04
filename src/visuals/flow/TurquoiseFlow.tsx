'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { createTurquoiseFlow, type FlowController, type FlowOptions } from './turquoise-flow.js';
import './turquoise-flow.css';

export interface TurquoiseFlowProps extends FlowOptions {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** A normal container: it can be a card, section, hero, or absolute background. */
export function TurquoiseFlow({
  children,
  className = '',
  style,
  speed = 1,
  strength = 1,
  fps = 30,
  resolution = 192,
  paused = false,
  adaptive = true,
}: TurquoiseFlowProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<FlowController | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    controller.current = createTurquoiseFlow(canvas.current);
    return () => {
      controller.current?.destroy();
      controller.current = null;
    };
  }, []);

  useEffect(() => {
    controller.current?.update({ speed, strength, fps, resolution, paused, adaptive });
  }, [speed, strength, fps, resolution, paused, adaptive]);

  return (
    <div className={`turquoise-flow ${className}`.trim()} style={style}>
      <canvas ref={canvas} className="turquoise-flow__canvas" aria-hidden="true" />
      {children != null && <div className="turquoise-flow__content">{children}</div>}
    </div>
  );
}

export default TurquoiseFlow;
