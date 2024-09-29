import React from 'react';
import backgroundImage from '../../../assets/breadcamp.png';
interface DashboardHeadingProps {
  title: string;
  highlightedText?: string;
 
 
}

const DashboardHeading: React.FC<DashboardHeadingProps> = ({
  title,
  highlightedText,
 // Provide a default background image
}) => {
  return (
    <div 
      className=" p-8 mb-10 rounded-lg shadow-md bg-cover bg-center bg-no-repeat bg-gray-900 min-h-[200px] flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage}) ` }}
    >
      <div className="bg-black bg-opacity-80 p-4 rounded">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          {title}{' '}
          {highlightedText && <span className="text-yellow-400">{highlightedText}</span>}
        </h2>
      </div>
    </div>
  );
};

export default DashboardHeading;
