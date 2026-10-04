'use client';
import AnimatedShape, { type AnimatedShapeProps } from './AnimatedShape';
export default function Rosette(props: Omit<AnimatedShapeProps, 'kind'>) {
  return <AnimatedShape {...props} kind="rosette" />;
}
