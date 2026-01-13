import React from 'react';
import { MapPin, Star, DollarSign} from "lucide-react";
import { getTheme, useDarkMode } from "../usefullFunctions.ts";
import type {SuccessPageProps} from "../types.ts";

export const SuccessPage: React.FC<SuccessPageProps> = ({ bookingData, facility, onTabChange }) => {
    const isDarkMode = useDarkMode();
    const theme = getTheme(isDarkMode);

    const totalAmount = facility.pricePerHour * 2;

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${theme.bg} w-full`}>
            <div className="max-w-2xl w-full">
                <h1 className={`text-2xl font-bold ${theme.text} mb-8`}>Thank you for your payment &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>

                <div className={`${theme.card} border rounded-[24px] overflow-hidden flex h-48 shadow-sm mb-10`}>
                    <div className="w-[280px] h-[280px] shrink-0 overflow-hidden shadow-lg" style={{marginRight: '1em'}}>
                        <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className={`text-lg font-bold ${theme.text}`}>
                                    {facility.name}
                                    <span className="border rounded-[24px] bg-gray-100 dark:bg-white/5 text-[10px] px-2 py-0.5 rounded font-bold text-gray-500" style={{paddingLeft: '5px', paddingRight: '5px', marginLeft: '8px'}}>
                        {facility.sport}
                    </span>
                                </h3>
                            </div>

                            <p className={`${theme.subText} text-xs mt-1 flex items-center`}>
                                <MapPin size={18} style={{marginRight: '5px'}}/>{facility.address}
                            </p>

                            <div className="flex items-center gap-4 mt-3">
                <span className="text-yellow-400 text-xs">
                    <Star size={20} fill="#FDC700" color="#FDC700" />
                    <span className={theme.text} style={{marginLeft: '4px'}}>{facility.rating}</span>
                </span>
                                <span className={`text-xs font-bold ${theme.text}`}>
                    <DollarSign size={18} style={{marginLeft: '10px'}} />{facility.pricePerHour} PLN <span className="text-gray-400 font-normal">/hour</span>
                </span>
                            </div>

                            <div className="flex gap-2 mt-3">
                                {facility.tags.slice(0, 3).map((tag: any) => (
                                    <span key={tag} className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 rounded-md text-gray-500 font-medium" style={{paddingLeft: '5px', paddingRight: '5px', marginRight: '5px'}}>
                        {tag}
                    </span>
                                ))}
                                <span className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 rounded-md text-gray-500 font-medium">+1 more</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-100 dark:border-white/5 pt-3">
              <span className={`text-sm font-bold ${theme.text} flex items-center gap-2`}>
                {bookingData.date}
              </span>
                            <span className={`text-sm font-bold ${theme.text} flex items-center gap-2`}>
                {bookingData.hour} - 4 PM
              </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-8">
                    <p className={`text-lg font-bold ${theme.text}`}>{totalAmount} PLN for 2 hours</p>
                    <p className="text-gray-500 text-sm">You will receive an email confirming your booking.</p>
                    <p className="text-gray-500 text-sm">Your purchase has been registered in the 'Sessions' tab.</p>
                </div>

                <button
                    onClick={onTabChange}
                    className="w-full bg-[#050509] text-white font-black py-4 rounded-2xl shadow-xl transition transform active:scale-95"
                >
                    Go to Sessions
                </button>
            </div>
        </div>
    );
};