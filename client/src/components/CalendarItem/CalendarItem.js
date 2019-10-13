import React from 'react';
import './CalendarItem.scss'

const CalendarItem = ({ day, date, handleClick, active }) => {

    const handleDayNames = () => {
        const convertDayNames = day.slice(0, 3); 
        return <span className="calendar__item-text">{convertDayNames}</span>
    }
    
	return (
        <button type="button" className='calendar__item' onClick={handleClick(day)}>
            <span className="calendar__item-text">{date}</span>
            {handleDayNames()}
        </button>
	);
}

export default CalendarItem;
