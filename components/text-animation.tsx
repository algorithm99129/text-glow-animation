'use client';

import { useRef, useState } from 'react';
import { useScroll, useTransform, motion, easeInOut } from 'framer-motion';
import clsx from 'clsx';

export function TextAnimation() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [firstFontSize, setFirstFontSize] = useState<number>(20);
  const [secondFontSize, setSecondFontSize] = useState<number>(20);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  });

  const position = useTransform(
    scrollYProgress,
    [0, 0.99999, 1],
    ['fixed', 'fixed', 'relative']
  );
  const top = useTransform(scrollYProgress, (pos) => {
    return pos > 0.99999 ? `${pos * 100}%` : '0%';
  });

  const firstFontMotionValue = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [20, 32, 20, 20]
  );
  const secondFontMotionValue = useTransform(
    scrollYProgress,
    [0.3, 0.6, 0.9, 1],
    [20, 32, 20, 20]
  );

  const firstTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.5, 1, 0.5, 0.5]
  );
  const secondTextOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.6, 0.9, 1],
    [0.5, 1, 0.5, 0.5]
  );

  firstFontMotionValue.on('change', (value) => {
    setFirstFontSize(value);
  });
  secondFontMotionValue.on('change', (value) => {
    setSecondFontSize(value);
  });

  return (
    <motion.div ref={targetRef} className="h-[200vh] w-full">
      <motion.div
        style={{
          position,
          top
        }}
        className={clsx(
          'relative h-screen flex top-0 left-0 justify-center items-center w-full'
        )}
      >
        <div className="flex-1 text-center">
          <motion.p
            transition={{
              ease: 'easeInOut',
              duration: 0.7,
              delay: 0.3
            }}
            style={{
              fontSize: firstFontSize,
              fontFamily: 'Bauhaus 93',
              opacity: firstTextOpacity,
              textShadow: `0 0 ${firstFontSize === 20 ? 0 : firstFontSize}px #00f, 0 0 ${firstFontSize === 20 ? 0 : firstFontSize}px #00f, 0 0 ${firstFontSize === 20 ? 0 : firstFontSize}px #00ccff`
            }}
          >
            Believe you can and you are halfway there.
          </motion.p>
        </div>
        <div className="flex-1 text-center">
          <motion.p
            transition={{
              ease: 'easeInOut',
              duration: 0.7,
              delay: 0.3
            }}
            style={{
              fontSize: secondFontSize,
              opacity: secondTextOpacity,
              textShadow: `0 0 ${secondFontSize === 20 ? 0 : secondFontSize}px #00f, 0 0 ${secondFontSize === 20 ? 0 : secondFontSize}px #00f, 0 0 ${secondFontSize === 20 ? 0 : secondFontSize}px #00ccff`
            }}
          >
            Success is not final, failure is not fatal.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
