import React, { ReactNode } from 'react';
import "./Header.css";

interface Props {
  menuItems: MenuItem[];
}

class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const menus: MenuItem[] = props.menuItems || [];
    
    this.menuElements = menus.map((v, i) => {
      if (typeof v.href == "string") return (
        <a href={v.href} key={i}>
          <div>
            {v.text}
          </div>
        </a>
      );
      else if (typeof v.href == "function") return (
        <a href="javascript:void(0)" onClick={v.href} key={i}>
          <div>
            {v.text}
          </div>
        </a>
      );
    });
  }

  menuElements: JSX.Element[];

  render() {
    return (
      <header>
        {this.menuElements}
      </header>
    );
  }
}

export interface MenuItem {
  /**
   * Text or React node to display.
   */
  text: ReactNode;
  /**
   * URL to link to.
   */
  href: string | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void);
}


export default Header;