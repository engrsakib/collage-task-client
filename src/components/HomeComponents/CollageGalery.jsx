import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import './CollageGallery.css'; // Custom CSS for hiding scrollbar

const images = [
  { src: '/sakib.png', name: 'Md. Nazmus Sakib', university: 'Dhaka International University', year: '2027' },
  { src: 'https://img.freepik.com/free-photo/serious-indian-graduate-graduation-robe-with-crossed-arms-looking-forward_496169-1338.jpg', name: 'Jane Smith', university: 'ABC University', year: '2023' },
  { src: 'https://img.freepik.com/free-photo/graduation-concept-with-portrait-happy-man_23-2148201907.jpg', name: 'Alice Brown', university: 'LMN University', year: '2022' },
  { src: 'https://img.freepik.com/free-photo/expressive-man-is-posing-studio_176474-59620.jpg', name: 'Bob Johnson', university: 'PQR University', year: '2025' }
];

const CollageGallery = () => {
  const { dark } = useContext(AuthContext);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    let scrollInterval;
    if (!isPaused) {
      scrollInterval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 2;
          if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
            scrollRef.current.scrollLeft = 0; // Loop back
          }
        }
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  return (
    <div className={`relative w-full overflow-hidden p-4 ${dark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto collage-scroll"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {images.map((img, index) => (
          <div key={index} className="relative w-52 h-52 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
            <img src={img.src} alt={img.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-lg font-bold text-white">{img.name}</p>
              <p className="text-sm text-gray-200">{img.university}</p>
              <p className="text-xs text-gray-300">Pass: {img.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollageGallery;