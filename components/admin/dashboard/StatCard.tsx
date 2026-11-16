interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }) {
  return (
    <>
      <div
        className="px-5 py-5   rounded-lg flex flex-col items-center  text-center bg-gradient-to-b
from-[#081028]
via-[#0F172A]
to-[#172554] text-white "
      >
        {icon}
        <h1 className="text-[20px] mt-3">{title}</h1>
        <h3 className="text-2xl mt-3">{value}</h3>
      </div>
    </>
  );
}

export default StatCard;
