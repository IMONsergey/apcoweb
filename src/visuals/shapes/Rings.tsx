'use client';
import AnimatedShape, { type AnimatedShapeProps } from './AnimatedShape';
export default function Rings(props: Omit<AnimatedShapeProps, 'kind'>) {
  return <AnimatedShape {...props} kind="echo" />;
}
