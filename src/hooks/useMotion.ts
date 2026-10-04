import { createContext, useContext } from 'react';
type MotionState = { paused: boolean; reduced: boolean; toggle: () => void };
export const MotionContext = createContext<MotionState>({
  paused: false,
  reduced: false,
  toggle: () => undefined,
});
export const useMotion = () => useContext(MotionContext);
