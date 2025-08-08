import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { id: 1, name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png' },
  { id: 2, name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png' },
  { id: 3, name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg' },
  { id: 4, name: 'Amazon', logo: 'https://static.vecteezy.com/system/resources/previews/019/766/240/non_2x/amazon-logo-amazon-icon-transparent-free-png.png' },
  { id: 5, name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' },
  { id: 6, name: 'Meta', logo: 'https://www.citypng.com/public/uploads/preview/download-hd-meta-facebook-logo-png-701751694777067hqqwm3dorh.png' },
];

const BrandCarousel = () => {
  // Create a seamless loop by duplicating the brands array
  const duplicatedBrands = [...brands, ...brands, ...brands];
  
  return (
    <div className="relative overflow-hidden py-6 bg-background/50 border-y border-border/50">
      <div className="flex items-center h-20">
        <div className="relative w-full h-full overflow-hidden">
          <motion.div 
            className="flex items-center absolute whitespace-nowrap"
            animate={{
              x: ['0%', `-${(100 / 3) * 2}%`], // Adjust the distance to match the duplicated items
            }}
            transition={{
              duration: 15, // Adjust duration for the new loop
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div key={`${brand.id}-${index}`} className="flex-shrink-0 flex items-center justify-center h-16 w-32 px-4">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 mx-6"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
