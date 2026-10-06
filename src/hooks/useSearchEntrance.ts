import { useLayoutEffect, useRef } from 'react';
import { useMotion } from './useMotion';

/** Move only the live search group; the scene's artwork and document layout stay fixed. */
export function useSearchEntrance() {
  const scene = useRef<HTMLDivElement>(null);
  const { reduced } = useMotion();
  useLayoutEffect(() => {
    const element = scene.current;
    const content = element?.querySelector<HTMLElement>('.search-scene__content');
    if (!element || !content) return;
    let disposed = false;
    let frame = 0;
    let lift = 0;
    let settle = 1;
    let current = 0;
    const render = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / settle));
      const eased = progress * progress * (3 - 2 * progress);
      current = -lift * (1 - eased);
      content.style.setProperty('--search-lift', `${current.toFixed(2)}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const measure = () => {
      const box = content.getBoundingClientRect();
      const sceneBox = element.getBoundingClientRect();
      const naturalTop = box.top + window.scrollY - current;
      const sceneTop = sceneBox.top + window.scrollY;
      const viewport = window.innerHeight;
      const toolbarBottoms = ['.search-chrome__filters', '.search-chrome__account'].map(
        (selector) =>
          (element.querySelector(selector)?.getBoundingClientRect().bottom ?? sceneBox.top) +
          window.scr¶»§q«^