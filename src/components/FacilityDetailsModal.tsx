import { X, MapPin, Star, DollarSign } from "lucide-react";

export const FacilityDetailsModal = ({ selectedFacility, theme, onClose }: any) => {
    return (
        <div
            className="fixed w-full inset-0 z-[10000] flex items-center justify-center bg-black/45 backdrop-blur-md p-4"
            style={{marginTop: '2.5em', backgroundColor: 'rgba(0,0,0,.5)'}}
            onClick={onClose}
        >
            <div
                className={`${theme.card} w-full max-w-[850px] rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-12 items-center`}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-6 right-8 flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors z-10" style={{marginLeft: '40em'}}>
                    <X size={20} /> <span className="text-sm font-bold">Close</span>
                </button>

                <div className="w-full md:w-auto flex justify-center shrink-0">
                    <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-[24px] overflow-hidden shadow-xl">
                        <img
                            src={selectedFacility.image}
                            alt={selectedFacility.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col overflow-y-auto no-scrollbar">
                    <h3 className={`text-lg font-bold ${theme.text}`} style={{marginBottom: '0em'}}>{selectedFacility.name} <span className="border rounded-[24px] bg-gray-100 dark:bg-white/5 text-[10px] px-2 py-0.5 rounded font-bold text-gray-500" style={{paddingLeft: '5px', paddingRight: '5px'}}>{selectedFacility.sport}</span></h3>

                    <p className={`${theme.subText} text-sm flex items-center gap-1.5 mb-6`} style={{marginTop: '0em', marginBottom: '0em'}}>
                        <MapPin size={18} /> {selectedFacility.address}
                    </p>

                    <div className="flex items-center gap-6 mb-8">
                        <div className="flex items-center gap-4 mt-3">
                            <span className="text-yellow-400 text-xs"><Star size={20} fill="#FDC700" color="#FDC700" /> <span className={theme.text}>{selectedFacility.rating}</span></span>
                            <span className={`text-xs font-bold ${theme.text}`}><DollarSign size={18} style={{marginLeft: '10px'}} />{selectedFacility.pricePerHour} PLN <span className="text-gray-400 font-normal">/hour</span></span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {selectedFacility.tags.map((tag: string) => (
                            <span key={tag} className="border rounded-[24px] bg-gray-50 dark:bg-white/5 text-[10px] px-2 py-1 rounded-md text-gray-500 font-medium" style={{paddingLeft: '5px', paddingRight: '5px', marginTop: '10px', marginBottom: '10px', marginRight: '5px'}}>{tag}</span>
                        ))}
                    </div>

                    <p className="text-blue-500 text-sm font-medium mb-8 italic" style={{marginTop: '0em'}}>
                        Looking for one more player for a friendly doubles match!
                    </p>
                </div>
                <button className="w-full bg-[#050509] text-white font-bold py-4 rounded-2xl text-lg transition-transform active:scale-95 shadow-lg">
                    Book Now
                </button>
            </div>
        </div>
    );
};