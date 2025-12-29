import React from 'react';
import type { Facility } from '../types';

export const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => {
  return (
      <div className="bg-white rounded-[2.5rem] flex shadow-sm border border-gray-100 mb-6 w-full hover:shadow-md transition-shadow overflow-hidden h-44">

        {/* 1. BLOC IMAGE : On force la largeur à 160px (w-40) et on empêche tout mouvement */}
        <div className="w-400 min-w-[160px] max-w-[160px] h-full bg-gray-200">
          <img
              src={facility.image}
              alt={facility.name}
              className="w-full h-full object-cover"
          />
        </div>

        {/* 2. BLOC INFOS : On utilise min-w-0 pour permettre au texte de se réduire sans pousser l'image */}
        <div className="flex-1 flex flex-col justify-between p-5 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0">
              <h3 className="font-black text-xl text-gray-900 leading-tight truncate">
                {facility.name}
              </h3>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                {facility.sport}
              </p>
              <p className="text-gray-400 text-sm mt-2 font-medium truncate">
                📍 {facility.address}
              </p>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="text-yellow-500 font-black flex items-center justify-end gap-1">
                <span>★</span><span>{facility.rating}</span>
              </div>
              <div className="font-black text-gray-900 text-lg mt-1">
                {facility.pricePerHour} PLN/h
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-gray-900 text-white py-3 rounded-2xl font-black text-sm hover:bg-black transition">
              Book Now
            </button>
            <button className="px-6 py-3 border-2 border-gray-100 rounded-2xl font-black text-sm text-gray-500 hover:bg-gray-50 transition">
              Details
            </button>
          </div>
        </div>
      </div>
  );
};