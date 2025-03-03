import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Clg = ({ clg }) => {
    const { setdark, dark, user } = useContext(AuthContext);
    const {
        _id: id, name, images, admission_process, events, research_works, sports
    } = clg;

    return (
        <div className={`p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Image Section */}
            <div className="relative w-full md:w-1/2">
                <img src={images[0]} alt={name} className="w-full h-64 object-cover rounded-xl" />
                <img src={images[1]} alt={name} className="absolute bottom-4 left-4 w-20 h-20 object-cover rounded-lg border-2 border-white shadow-md" />
            </div>
            
            {/* Text Section */}
            <div className="w-full md:w-1/2 p-6 space-y-4">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p><strong>Admission:</strong> {admission_process.requirements.join(', ')}</p>
                <p><strong>Events:</strong> {events.academic[0]}, {events.cultural[0]}, {events.technical[0]}</p>
                <p><strong>Research:</strong> {research_works[0]?.title}</p>
                <p><strong>Sports:</strong> {sports.facilities.join(', ')}</p>
                <a href={admission_process.application_link} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">Apply Now</a>
            </div>
        </div>
    );
};

export default Clg;
