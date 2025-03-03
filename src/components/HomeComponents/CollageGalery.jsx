import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const images = [
  { src: 'https://www.northsouth.edu/assets/images/PRO-Office/19conv-5-2.jpg', university: 'North South University', year: '2027' },
  { src: 'https://www.bracu.ac.bd/sites/default/files/news-image/2022/Gold%20medal.jpg', university: 'BRAC University', year: '2023' },
  { src: 'https://ecdn.dhakatribune.net/contents/cache/images/1200x630x1xxxxx1x694528/uploads/dten/2017/02/12545.jpg?watermark=media%2F2023%2F05%2F28%2F1280px-Dhaka_Tribune_Logo.svg-1-a9e61c86dded62d74300fef48fee558f.png', university: 'Independent University, Bangladesh', year: '2022' },
  { src: 'https://tds-images.thedailystar.net/sites/default/files/styles/big_202/public/images/2023/03/19/shakib_al_hasan.jpg', university: 'American International University-Bangladesh', year: '2025' },
  { src: 'https://api.diu.ac//images/diuac/convocation/1641723773_2EV0umhZCr.jpg', university: 'Dhaka International University', year: '2024' },
  { src: 'https://tds-images.thedailystar.net/sites/default/files/styles/very_big_201/public/images/2023/11/12/whatsapp_image_2023-11-12_at_12.50.36_pm.jpeg', university: 'University of Liberal Arts Bangladesh', year: '2026' },
  { src: 'https://cdn.daily-sun.com/public/news_images/2017/03/22/Daily-Sun-65-01-22-03-2017.jpg', university: 'Southeast University', year: '2026' },
  { src: 'https://fse.ewubd.edu/storage/app/uploads/public/65e/4c3/a05/65e4c3a0512b4401242518.jpeg', university: 'East West University', year: '2026' },
];

const CollageGallery = () => {
  const { dark } = useContext(AuthContext);

  return (
    <div className={`w-full p-4 `}>
        <h1 className="text-3xl font-bold text-center mb-6">Graduates Gelary</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden shadow-lg">
            <img src={img.src} alt={img.name} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 opacity-0 hover:opacity-100 transition-opacity p-4 text-center">
              <p className="text-lg text-white font-bold">{img.name}</p>
              <p className="text-sm text-gray-300">{img.university}</p>
              <p className="text-xs text-gray-400">Pass: {img.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollageGallery;
