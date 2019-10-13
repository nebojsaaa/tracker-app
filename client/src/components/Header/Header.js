import React from 'react';
import './Header.scss'

const Header = ({ title, subtitle, isActive, headerActiveClass, backBtn, handleIsActiveSingleDay }) => {

    const handleDateNames = () => {
        if (subtitle === 'Overview of your activity') {
            return <span className="header__subtitle">{subtitle}</span>
        } else {
            return <span className="header__subtitle">{`June ${subtitle}, 2019.`}</span>
        }
    }

	return (
		<div className={!isActive ? `header ${headerActiveClass}` : 'header header--inactive'}>
            <h1 className="header__title">{title}</h1>
            {handleDateNames()}
            {backBtn && <button type="button" className="header__btn icon-chevron-left" onClick={handleIsActiveSingleDay}></button>}
        </div>
	);
}

export default Header;
