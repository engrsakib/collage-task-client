import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const images = [
  { src: '/sakib.png', name: 'Md. Nazmus Sakib', university: 'Dhaka International University', year: '2027' },
  { src: 'https://img.freepik.com/free-photo/serious-indian-graduate-graduation-robe-with-crossed-arms-looking-forward_496169-1338.jpg', name: 'Jane Smith', university: 'ABC University', year: '2023' },
  { src: 'https://img.freepik.com/free-photo/graduation-concept-with-portrait-happy-man_23-2148201907.jpg', name: 'Alice Brown', university: 'LMN University', year: '2022' },
  { src: 'https://img.freepik.com/free-photo/expressive-man-is-posing-studio_176474-59620.jpg', name: 'Bob Johnson', university: 'PQR University', year: '2025' },
  { src: 'https://img.freepik.com/free-photo/happy-graduate-student-gown-standing-white-background_114579-49794.jpg?t=st=1740948654~exp=1740952254~hmac=13d19379a280e5b39fe33b258862aafcc87ae92cdfbbe1626e2f8bb6321ec3bd&w=1060', name: 'John Doe', university: 'XYZ University', year: '2024' },
  { src: 'https://img.freepik.com/free-photo/young-man-choosing-destination-school-globe-graduate-uniform-looking-focused_176474-57773.jpg?t=st=1740948619~exp=1740952219~hmac=0fdc181e18f8a915d835c938adc385550d926c00b012c2fe6c350c061185dfed&w=1060', name: 'Robart Browon', university: 'EFG University', year: '2026' },
  { src: 'https://img.freepik.com/free-photo/laughing-woman-showing-graduate-certificate_23-2147745754.jpg?t=st=1740948788~exp=1740952388~hmac=f5e5e546982f9b6e598a04e3b5d65402a8d0a240a83ee9ee58ccd93935324162&w=1060', name: 'makron runy', university: 'EFG University', year: '2026' },
  { src: 'https://img.freepik.com/free-photo/beautiful-female-student-gown-holding-diploma_114579-49439.jpg?t=st=1740948833~exp=1740952433~hmac=1aaad3e312e658f1bd15b9c8494772f566c42b8b72827545e6baa24e0c87ff4b&w=1060', name: 'sushmita dee', university: 'EFG University', year: '2026' },
];

const CollageGallery = () => {
  const { dark } = useContext(AuthContext);

  return (
    <div className={`w-full p-4 `}>
        <h1 className="text-3xl font-bold text-center mb-6">Graduates</h1>
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
