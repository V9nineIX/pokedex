'use client';
import React, { useState } from 'react';
import { Search, ArrowDownAZ, X } from 'lucide-react';
import TypeFilter from './typeFilter';

interface HeaderProps {
  searchTerm?: string;
  isSearchActive?: boolean;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  onClearSearch?: () => void;
  onSortToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm = '',
  isSearchActive = false,
  onSearchChange = () => { },
  onSearch = () => { },
  onClearSearch = () => { },
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-pokedex-red px-4 py-4 shadow-md h-[70px]">
        <div className="mx-auto">
          <div className="flex flex-row gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">Pokedex</h1>
            </div>

            <div className="flex flex-1 items-center gap-3 md:max-w-md">
              <div className="relative flex-1 rounded-full bg-white shadow-inner">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-pokedex-red" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-full border-none bg-transparent py-2 pl-10 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Search by name or ID"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                {searchTerm && (
                  <button
                    onClick={onClearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Clear search"
                  >
                    <X className="h-5 w-5 hover:cursor-pointe text-gray-600" />
                  </button>
                )}
              </div>

              <button
                onClick={onSearch}
                className="flex items-center justify-center rounded-full bg-white px-4 py-2 text-pokedex-red shadow-sm hover:bg-gray-100 transition-colors font-semibold text-sm hover:cursor-pointer"
                title="Search"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
