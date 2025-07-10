/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Badge, Collapse } from "react-bootstrap";

interface SidebarNavListItemProps {
  className?: string;
  depth: number;
  href: string;
  icon: React.FC<any>;
  badge?: string;
  open?: boolean;
  title: string;
  active?: boolean;
  children?: React.ReactNode;
}

const SidebarNavListItem = (props: SidebarNavListItemProps) => {
  const {
    title,
    href,
    depth = 0,
    children,
    icon: Icon,
    badge,
    active,
    open: openProp = false,
  } = props;

  const [open, setOpen] = React.useState(openProp);

  useEffect(() => {
    setOpen(openProp);
  }, [openProp])

  const handleToggle = () => {
    setOpen((state) => !state);
  };

  if (children) {
    return (
      <li className={`sidebar-item ${(open || active) ? "active" : ""}`}>
        <a
          className={`sidebar-link ${open ? "" : "collapsed"}`}
          data-bs-toggle="collapse"
          aria-expanded={open ? "true" : "false"}
          data-depth={depth}
          onClick={handleToggle}
        >
          {Icon && <Icon className="feather align-middle" />}{" "}
          <span className="align-middle" data-depth={depth}>
            {title}
          </span>
          {badge && (
            <Badge className="badge-sidebar-primary" bg="">
              {badge}
            </Badge>
          )}
          {open ? <div /> : <div />}
        </a>
        <Collapse in={open}>
          <ul className="sidebar-dropdown list-unstyled">{children}</ul>
        </Collapse>
      </li>
    );
  }

  return (
    <li className={`sidebar-item ${active ? "active" : ""}`}>
      <NavLink data-depth={depth} to={href} className="sidebar-link"
        {...(props.depth == 1 ? {
          style: { padding: '0.55rem 1.5rem 0.55rem 2.7rem' }
        } : {})}
      >
        {Icon && <Icon className="feather align-middle" />}{" "}
        <span className="align-middle" data-depth={depth}>
          {title}
        </span>
        {badge && (
          <Badge className="badge-sidebar-primary" bg="">
            {badge}
          </Badge>
        )}
      </NavLink>
    </li>
  );
};

export default SidebarNavListItem;
