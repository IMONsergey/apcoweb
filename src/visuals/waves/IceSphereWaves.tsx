'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { createIceWaves, type IceWavesController } from './ice-sphere-waves.js';
import './ice-sphere-waves.css';

export interface IceSphereWavesProps {
  /** 0–3; 1 preserves the approved slow motion. */
  speed?: number;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function IceSphereWaves({
  speed = 1,
  paused = false,
  className = '',
  style,
}: IceSphereWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<IceWavesController | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const controller = createIceWaves(canvasRef.current);
    controllerRef.current = controller;
    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, []);
  useEffect(() => {
    controllerRef.current?.update({ speed, paused });
  }, [speed, paused]);
  return (
    <div className={`ice-sphere-waves ${className}`.trim()} style={style} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default IceSphereWaves;
