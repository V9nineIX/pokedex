'use client';
import React, { useState } from 'react';
import { Search, ArrowDownAZ } from 'lucide-react';
import TypeFilter from './typeFilter';

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortToggle?: () => void;

}

const Header: React.FC<HeaderProps> = ({ searchTerm = '', onSearchChange = () => { } }) => {

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
                  className="block w-full rounded-full border-none bg-transparent py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Search"
                  value={searchTerm}
                // onChange={onSearchChange}
                />
              </div>

              {/* <button
              onClick={onSortToggle}
              className="flex items-center justify-center rounded-full bg-white p-2 text-pokedex-red shadow-sm hover:bg-gray-100 transition-colors"
              title={isSortAsc ? "Sort Z-A" : "Sort A-Z"}
            >
              <span className="font-bold text-xs mr-1">{isSortAsc ? "A-Z" : "Z-A"}</span>
              <ArrowDownAZ size={20} className={isSortAsc ? "" : "transform rotate-180"} />
            </button> */}
            </div>
          </div>
        </div>
      </header>
      {/* <TypeFilter
        isOpen={true}
        selectedTypes={selectedTypes}
        onToggleType={handleTypeToggle}
        onClear={handleClearFilters}
      /> */}
    </>
  );
};

export default Header;
