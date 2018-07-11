import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './sideNav_items';

const SideNavigation = (props) => {
    return (
        <div>
            <SideNav
                showNav = {props.showNav}
                onShowNav={props.onOpenNav}
                onHideNav={props.onHideNav}
                navStyle={{
                    background: '#242424',
                    width: '220px'
                }}
            >
                <SideNavItems {...props}/>
            </SideNav>
        </div>
    )
};

export default SideNavigation