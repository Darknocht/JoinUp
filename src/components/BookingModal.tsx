import React, { useState } from 'react';
import { X, MapPin, Star, DollarSign, Calendar, Clock } from "lucide-react";
import { getTheme, useDarkMode } from "../usefullFunctions.ts";
import {SuccessPage} from "../pages/SuccessPage.tsx";

export const BookingModal: React.FC<any> = ({ selectedFacility, theme, onClose, onTabChange }: any) => {
    const isDarkMode = useDarkMode();
    const [step, setStep] = useState<'selection' | 'payment'>('selection');
    const [bookingData, setBookingData] = useState({
        date: '',
        hour: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const [isPaid, setIsPaid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBookingData(prev => ({ ...prev, [name]: value }));
    };

    if (isPaid) {
        return (
            <div className="fixed inset-0 z-[20000] bg-white dark:bg-[#1E1E1E]">
                <SuccessPage
                    bookingData={bookingData}
                    facility={selectedFacility}
                    onTabChange={() => {
                        onTabChange('Sessions');
                        onClose(); // Ferme la modal
                    }}
                />
            </div>
        );
    }

    return (
        <div
            className="fixed w-full inset-0 z-[10000] flex items-center justify-center bg-black/45 backdrop-blur-md p-4"
            style={{ marginTop: '2.5em', backgroundColor: 'rgba(0,0,0,.5)' }}
            onClick={onClose}
        >
            <div
                className={`${getTheme(isDarkMode).bg} w-full max-w-[850px] rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-12 items-center`}
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
                <button
                    onClick={onClose}
                    className={`${getTheme(isDarkMode).input} absolute top-6 right-8 flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors z-10`}
                    style={{ marginLeft: '40em' }}
                >
                    <X size={20} /> <span className="text-sm font-bold">Close</span>
                </button>

                {/* RIGHT SECTION*/}
                <div className="w-full md:w-auto flex flex-col items-center shrink-0">
                    <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-[24px] overflow-hidden shadow-xl">
                        <img
                            src={selectedFacility.image}
                            alt={selectedFacility.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {step === 'payment' && (
                        <div className="w-full mt-6 space-y-3 px-2">
                            <div className="flex justify-between items-center">
                                <span className={`text-xs font-bold ${theme.text} flex items-center gap-2`}><Calendar size={14} /> {bookingData.date || "Not set"}</span>
                                <span className={`text-xs font-bold ${theme.text} flex items-center gap-2`}><Clock size={14} /> {bookingData.hour || "Not set"}</span>
                            </div>
                            <div className={`flex justify-between items-center p-3 rounded-xl ${getTheme(isDarkMode).input}`}>
                                <span className="text-xs text-gray-400 font-bold">Total to pay:</span>
                                <span className={`font-black ${theme.text}`}>{selectedFacility.pricePerHour} PLN</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT SECTION */}
                <div className="w-full flex flex-col no-scrollbar">
                    <h3 className={`text-lg font-bold ${theme.text}`} style={{ marginBottom: '0em' }}>
                        {selectedFacility.name}
                        <span className="border rounded-[24px] bg-gray-100 dark:bg-white/5 text-[10px] px-2 py-0.5 rounded font-bold text-gray-500" style={{ paddingLeft: '5px', paddingRight: '5px', marginLeft: '8px' }}>
                            {selectedFacility.sport}
                        </span>
                    </h3>

                    <p className={`${theme.subText} text-sm flex items-center gap-1.5 mb-4`} style={{ marginTop: '0.5em' }}>
                        <MapPin size={18} /> {selectedFacility.address}
                    </p>

                    {step === 'selection' ? (
                        <>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-yellow-400 text-xs"><Star size={20} fill="#FDC700" color="#FDC700" /> <span className={theme.text}>{selectedFacility.rating}</span></span>
                                <span className={`text-xs font-bold ${theme.text}`}><DollarSign size={18} style={{ marginLeft: '10px' }} />{selectedFacility.pricePerHour} PLN <span className="text-gray-400 font-normal">/hour</span></span>
                            </div>

                            <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '2em' }}>
                                <input
                                    type="date"
                                    name="date"
                                    value={bookingData.date}
                                    onChange={handleChange}
                                    className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                                />
                                <input
                                    type="time"
                                    name="hour"
                                    value={bookingData.hour}
                                    onChange={handleChange}
                                    className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px'}}
                                />
                            </div>

                            <button
                                className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform active:scale-95"
                                onClick={() => setStep('payment')}
                                style={{ marginBottom: '2em' }}
                            >
                                Go to Payment
                            </button>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-sm font-bold ${theme.text}`}>Payment Details</span>
                            </div>

                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                value={bookingData.cardNumber}
                                onChange={handleChange}
                                className={`w-9/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px', marginTop: '1em', marginBottom: '1em'}}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={bookingData.expiry}
                                    onChange={handleChange}
                                    className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px', marginBottom: '1em'}}
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={bookingData.cvv}
                                    onChange={handleChange}
                                    className={`w-8/10 py-3 pl-12 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-none ${theme.input}`} style={{borderRadius: '8px', padding: '8px 16px', marginLeft: '10px', marginBottom: '1em'}}
                                />
                            </div>

                            <button
                                className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform active:scale-95 mt-4"
                                onClick={() => setIsPaid(true)} // Changez le console.log par ceci
                                style={{ marginBottom: '1em' }}
                            >
                                Pay
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};