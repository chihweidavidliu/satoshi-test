import { MenuItemSVG } from "../../types/MenuItemSVG";

export const DollarIcon = ({ isSelected, ...props }: MenuItemSVG) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="dollar sign">
      <path
        id="icon/editor/attach_money_24px"
        d="M12.39 10.9C10.12 10.31 9.39003 9.7 9.39003 8.75C9.39003 7.66 10.4 6.9 12.09 6.9C13.87 6.9 14.53 7.75 14.59 9H16.8C16.73 7.28 15.68 5.7 13.59 5.19V3H10.59V5.16C8.65003 5.58 7.09003 6.84 7.09003 8.77C7.09003 11.08 9.00003 12.23 11.79 12.9C14.29 13.5 14.79 14.38 14.79 15.31C14.79 16 14.3 17.1 12.09 17.1C10.03 17.1 9.22003 16.18 9.11003 15H6.91003C7.03003 17.19 8.67003 18.42 10.59 18.83V21H13.59V18.85C15.54 18.48 17.09 17.35 17.09 15.3C17.09 12.46 14.66 11.49 12.39 10.9Z"
        fill={isSelected ? "#101A3F" : "black"}
        fillOpacity={isSelected ? "1" : "0.54"}
      />
    </g>
  </svg>
);
