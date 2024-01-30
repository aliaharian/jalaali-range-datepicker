import { ReactNode } from "react";
type Props = {
  icon: ReactNode;
  onClick?: () => void;
};
const ChangeMonthButton = ({ icon, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="!min-w-8 !max-w-8 !rounded-full !w-8 !h-8 text-secondary"
    >
      {icon}
    </button>
  );
};

export default ChangeMonthButton;
