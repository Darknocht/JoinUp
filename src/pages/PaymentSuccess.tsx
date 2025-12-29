export const PaymentSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-black text-gray-900 mb-4">Thank you for your payment [cite: 532]</h1>
      <p className="text-gray-500 max-w-sm mb-8 font-medium">
        You will receive an email confirming your booking. Your purchase has been registered in the 'Sessions' tab. [cite: 543, 544]
      </p>

      <div className="w-full max-w-sm bg-gray-50 rounded-3xl p-6 mb-8 text-left">
        <h4 className="font-black text-gray-900 mb-2">Wrocław Padel Club [cite: 533]</h4>
        <p className="text-sm text-gray-500 mb-4">ul. Sportowa 12, Wrocław [cite: 534]</p>
        <div className="flex justify-between font-bold border-t border-gray-200 pt-4">
          <span>Date: 30/11/2025 [cite: 538]</span>
          <span className="text-blue-600">160 PLN [cite: 542]</span>
        </div>
      </div>

      <button className="bg-black text-white px-12 py-4 rounded-2xl font-black shadow-xl hover:bg-gray-800 transition">
        Go to Sessions [cite: 545]
      </button>
    </div>
  );
};