import { NavLink } from "react-router-dom";
import { FC, ReactNode } from "react";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";

interface INavListItemButtonProps extends ListItemButtonProps {
  to: string;
  replace?: boolean;
  children: ReactNode;
}

// TODO; fix keyboard focus
export const NavListItemButton: FC<INavListItemButtonProps> = ({
  to,
  replace,
  children,
  ...rest
}) => {
  return (
    <NavLink
      to={to}
      replace={replace}
      // style={({ isActive }) => ({
      style={{
        width: "100%",
        textDecoration: "unset",
        color: "unset",
      }}
    >
      {({ isActive }) => (
        <ListItemButton selected={isActive} {...rest}>
          {children}
        </ListItemButton>
      )}
    </NavLink>
  );
};
