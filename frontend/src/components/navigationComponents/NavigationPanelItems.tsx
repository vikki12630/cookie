import { FC } from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  children: React.ReactNode;
}

interface PanelItemsProps {
  text: string;
  link: string;
  active: boolean;
  onClick: () => void;
}

export const Navigation: FC<NavigationProps> = ({ children }) => {
  return <ul className="flex flex-col gap-3">{children}</ul>;
};

export const PanelItems: FC<PanelItemsProps> = ({
  text,
  link,
  onClick,
  active,
}) => {
  return (
    <li
      onClick={onClick}
      className={`${
        active ? "bg-slate-400" : "bg-slate-950"
      } text-2xl font-serif px-8 py-1 rounded-md`}
    >
      {link.length === 0 ? <div className="cursor-pointer">{text}</div> : <Link to={`${link}`}>{text}</Link>}
    </li>
  );
};
