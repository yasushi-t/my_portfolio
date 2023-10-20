import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Loading from '@/images/spin-gray.svg';

type ImageWithLoadingProps = {
  src: string;
  alt: string;
};

const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = document.createElement('img');
    image.src = src;

    image.onload = () => {
      setLoading(false);
    };
    image.onerror = () => {
      setLoading(false);
    };
  }, [src]);

  const imageStyle = {
    // opacity: loading ? 0 : 1,
    // transition: 'opacity 10s ease-in-out',
    display: loading ? 'none' : 'block',
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <Image src={Loading.src} width='50' height='50' alt='Loading' unoptimized />
        </div>
      )}
      <Image fill src={src} alt={alt} style={imageStyle} />
    </div>
  );
};

export default ImageWithLoading;
