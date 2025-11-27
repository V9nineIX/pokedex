import React from 'react';
import { TYPE_COLORS } from '@/constant';
import { X, Check } from 'lucide-react';

interface TypeFilterProps {
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  onClear: () => void;
  isOpen: boolean;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedTypes, onToggleType, onClear, isOpen }) => {
  const types = Object.keys(TYPE_COLORS);

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
    >
      <div className="w-full px-4 pb-6">
        <div className="flex items-start flex-col md:flex-row  justify-left md:justify-between mb-4 gap-2">
          <h3 className="text-sm md:text-lg font-bold text-gray-800 flex items-center gap-2">
            Filter by type
          </h3>
          {selectedTypes.length > 0 && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 text-sm font-medium text-pokedex-red hover:text-red-700 transition-colors"
            >
              <X size={16} />
              Clear all
            </button>
          )}
        </div>

        <div className="grid  grid-cols-1 lg:grid-cols-2  gap-4">
          {types.map((type) => {
            const isSelected = selectedTypes.includes(type);
            const colorClass = TYPE_COLORS[type];
            // We use the background color class but might need to manipulate it for unselected states
            // Using inline styles for dynamic colors or just CSS classes if available

            return (
              <button
                key={type}
                onClick={() => onToggleType(type)}
                className={`
                  relative flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-200
                  ${isSelected
                    ? `${colorClass} text-white shadow-md scale-105 ring-2 ring-offset-1 ring-gray-300`
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:scale-105'
                  }
                `}
              >
                {isSelected && <Check size={14} className="absolute left-2" />}
                <span className={isSelected ? 'pl-2' : ''}>{type}</span>
              </button>
            );
          })}
        </div>


      </div>
    </div>
  );
};

export default TypeFilter;