interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-gray-50">
    <span className="text-2xl font-black text-gray-800">{value}</span>
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-center">
      {label}
    </span>
  </div>
);