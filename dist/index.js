import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CountDown extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    }, _temp;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const date = this.getDateData(this.props.date);
      if (date) {
        this.setState(date);
      } else {
        this.stop();
        this.props.onEnd();
      }
    }, 1000);
  }
  componentWillMount() {
    const date = this.getDateData(this.props.date);
    if (date) {
      this.setState(date);
    }
  }
  componentWillUnmount() {
    this.stop();
  }
  getDateData(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    if (diff <= 0) {
      return false;
    }

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0
    };

    if (diff >= 365.25 * 86400) {
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;
    return timeLeft;
  }
  render() {
    const countDown = this.state;
    let days;
    if (countDown.days === 1) {
      days = this.props.days.singular;
    } else {
      days = this.props.days.plural;
    }
    return React.createElement(
      'div',
      { className: this.props.className },
      countDown.days > 0 && React.createElement(
        'div',
        { className: `${this.props.className}-col is-day` },
        React.createElement(
          'p',
          null,
          React.createElement(
            'strong',
            null,
            this.leadingZeros(countDown.days)
          ),
          React.createElement(
            'span',
            null,
            days
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${this.props.className}-col is-hour` },
        React.createElement(
          'p',
          null,
          React.createElement(
            'strong',
            null,
            this.leadingZeros(countDown.hours)
          ),
          React.createElement(
            'span',
            null,
            this.props.hours
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${this.props.className}-col is-min` },
        React.createElement(
          'p',
          null,
          React.createElement(
            'strong',
            null,
            this.leadingZeros(countDown.min)
          ),
          React.createElement(
            'span',
            null,
            this.props.mins
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${this.props.className}-col is-seg` },
        React.createElement(
          'p',
          null,
          React.createElement(
            'strong',
            null,
            this.leadingZeros(countDown.sec)
          ),
          React.createElement(
            'span',
            null,
            this.props.segs
          )
        )
      )
    );
  }
  stop() {
    clearInterval(this.interval);
  }
  leadingZeros(num, length = null) {

    let length_ = length;
    let num_ = num;
    if (length_ === null) {
      length_ = 2;
    }
    num_ = String(num_);
    while (num_.length < length_) {
      num_ = '0' + num_;
    }
    return num_;
  }
}CountDown.displayName = 'Simple countDown';
CountDown.propTypes = {
  date: PropTypes.string,
  className: PropTypes.string,
  days: PropTypes.objectOf(PropTypes.string),
  hours: PropTypes.string,
  mins: PropTypes.string,
  segs: PropTypes.string,
  onEnd: PropTypes.func
};
CountDown.defaultProps = {
  date: new Date(),
  className: 'CountDown',
  days: {
    plural: 'Days',
    singular: 'Day'
  },
  hours: 'Hours',
  mins: 'Min',
  segs: 'Seg',
  onEnd: () => {}

};
;

export default CountDown;
