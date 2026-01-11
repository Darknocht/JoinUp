import { MapPin, Star, DollarSign } from "lucide-react";
import {getTheme, useDarkMode} from "../usefullFunctions.ts";

export const FacilityCard = ({ facility, theme, highlightedId, onDetails, onBook, itemRef }: any) => {
  const isDarkMode = useDarkMode();
  return (
      <div
          key={facility.id}
          ref={itemRef}
          className={`${theme.card} border rounded-[24px] overflow-hidden flex h-48 transition-all duration-500 ${highlightedId === facility.id ? 'ring-2 ring-blue-500 scale-[1.02] shadow-xl' : 'shadow-sm hover:shadow-md'}`}
      >
        <div className="w-[280px] h-[280px] shrink-0 overflow-hidden shadow-lg" style={{marginRight: '1em'}}>
          <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className={`text-lg font-bold ${theme.text}`}>{facility.name} <span className="border rounded-[24px] bg-gray-100 dark:bg-white/5 text-[10px] px-2 py-0.5 rounded font-bold text-gray-500" style={{paddingLeft: '5px', paddingRight: '5px'}}>{facility.sport}</span></h3>
            </div>
            <p className={`${theme.subText} text-xs mt-1`}><MapPin size={18} style={{marginRight: '5px'}}/>{facility.address}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-yellow-400 text-xs"><Star size={20} fill="#FDC700" color="#FDC700" /> <span className={theme.text}>{facility.rating}</span></span>
              <span className={`text-xs font-bold ${theme.text}`}><DollarSign size={18} style={{marginLeft: '10px'}} />{facility.pricePerHour} PLN <span className="text-gray-400 font-normal">/hour</span></span>
            </div>
            <div className="flex gap-2 mt-3">
              {facility.tags.slice(0, 3).map((tag: any) => (
                  <span key={tag} className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 rounded-md text-gray-500 font-medium" style={{paddingLeft: '5px', paddingRight: '5px', marginTop: '10px', marginBottom: '10px', marginRight: '5px'}}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onBook(facility)} className={`flex-1 ${getTheme(isDarkMode).input} text-white text-xs font-bold py-2.5 rounded-xl transition-colors hover:bg-gray-800`}>Book Now</button>
            <button onClick={() => onDetails(facility)} className={`px-4 border ${getTheme(isDarkMode).input} text-white text-xs font-bold rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-white/5`}>Details</button>
          </div>
        </div>
      </div>
  );
};