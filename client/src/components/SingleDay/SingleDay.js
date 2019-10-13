import React from 'react';
import Header from '../Header/Header';
import './SingleDay.scss'

const SingleDay = ({ weekActivity, isActive, handleIsActiveSingleDay }) => {

    const numberWithCommas = (x) => {
        if (!x) return 1;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

	return (
		<div>
            <Header title={weekActivity.day} subtitle={weekActivity.date} headerActiveClass={isActive && `header--active`} backBtn={true} handleIsActiveSingleDay={handleIsActiveSingleDay} />
            <div className="single-post">
                <div className="single-post__top">
                    <span className="single-post__top-icon icon-run"></span>
                    <span className="single-post__top-title">Steps</span>
                    <span className="single-post__top-number">{numberWithCommas(weekActivity.totalSteps)}</span>
                </div>
                <span className="single-post__subtitle">Very good</span>
                <h3 className="single-post__title">Keep going!</h3>
                <div className="single-post__summary">
                    <div className="single-post__summary-block">
                        <span className="single-post__summary-title">km</span>
                        <span className="single-post__summary-number">{numberWithCommas(weekActivity.totalKM)}</span>
                    </div>
                    <div className="single-post__summary-block">
                        <span className="single-post__summary-title">cal</span>
                        <span className="single-post__summary-number">{numberWithCommas(weekActivity.totalCalories)}</span>
                    </div>
                    <div className="single-post__summary-block">
                        <span className="single-post__summary-title">hours</span>
                        <span className="single-post__summary-number">{weekActivity.totalHours}</span>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default SingleDay;
