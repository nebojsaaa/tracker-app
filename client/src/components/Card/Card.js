import React from 'react';
import './Card.scss'

const Card = ({ title, subtitle, totalWeekActivity, iconName, cardClass }) => {

    const numberWithCommas = (x) => {
        if (!x) return 1;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
	return (
		<div className={cardClass ? `card ${cardClass}` : `card`}>
            <span className={`card__icon ${iconName}`}></span>
            <div className="card__wrapper">
                <div className="card__title-wrap">
                    <h2 className="card__title">{title}</h2>
                    <span className="card__subtitle">{subtitle}</span>
                </div>
                <span className="card__number">{numberWithCommas(totalWeekActivity)}</span>
            </div>
        </div>
	);
}

export default Card;
