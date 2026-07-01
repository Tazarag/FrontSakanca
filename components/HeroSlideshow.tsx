'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const slides = [
  { src: '/bg1.JPG', alt: 'Background 1', zoomType: 'in' },
  { src: '/bg2.JPG', alt: 'Background 2', zoomType: 'out' },
  { src: '/bg3.JPG', alt: 'Background 3', zoomType: 'in' },
];

const SLIDE_DURATION = 2000;       // ms per slide display (2 seconds)
const TRANSITION_DURATION = 600;   // ms for crossfade (0.6 seconds)

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent((prevCurrent) => (prevCurrent + 1) % slides.length);

      setTimeout(() => {
        setPrev(null);
      }, TRANSITION_DURATION);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">

      {/* Outgoing slide — continues its own zoom direction while fading out */}
      {prev !== null && (
        <div
          key={`slide-container-${prev}`}
          className="absolute inset-0 z-0"
          style={{
            animation: `fadeOut ${TRANSITION_DURATION}ms ease-in-out forwards`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              animation: `${
                slides[prev].zoomType === 'in' ? 'kenBurns' : 'kenBurnsOut'
              } 5000ms linear forwards`,
            }}
          >
            <Image
              src={slides[prev].src}
              alt={slides[prev].alt}
              fill
              priority
              className="object-cover object-center brightness-50"
            />
          </div>
        </div>
      )}

      {/* Incoming / Active slide — starts zoom from 0% while fading in */}
      <div
        key={`slide-container-${current}`}
        className="absolute inset-0 z-10"
        style={{
          animation: `fadeIn ${TRANSITION_DURATION}ms ease-in-out forwards`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            animation: `${
              slides[current].zoomType === 'in' ? 'kenBurns' : 'kenBurnsOut'
              } 5000ms linear forwards`,
          }}
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            priority
            className="object-cover object-center brightness-50"
          />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/85 z-10" />

      {/* Ambient glow spots */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px] animate-pulse-slow z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[130px] animate-pulse-slow animation-delay-500 z-10" />

      {/* Slide indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === current) return;
              setPrev(current);
              setCurrent(i);
              setTimeout(() => {
                setPrev(null);
              }, TRANSITION_DURATION);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? 'w-8 bg-white'
                : 'w-1.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
