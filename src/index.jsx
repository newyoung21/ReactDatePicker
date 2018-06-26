import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './style.mod.less';

const cx = classNames.bind(styles);

class ReactDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      currentYear: '',
      currentMonth: '',
      currentDate:  new Date(),
      pitchDate: '',
      days: '',
      renderArray: [],
      selectDate: '',
      isFocus: false
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps === prevState) {
      return null;
    }
    return {
      pitchDate: prevState.pitchDate || nextProps.value
    }
  }
  
  componentDidMount() {
    const self = this;
    document.addEventListener('click', function(e) {
      self.setState({
        showPicker: false
      })
    })
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.value) {
  //     this.setState({
  //       pitchDate: nextProps.value
  //     })
  //   }
  // }
  

  setPicker = (e) => {
    const nowDate = this.state.pitchDate ?  new Date(this.state.pitchDate) : new Date();
    const currentYear = this.state.currentYear || nowDate.getFullYear();
    const currentMonth = this.state.currentMonth || nowDate.getMonth();
    //const currentDate = this.state.currentDate || nowDate.getDate();
    const selectDate =  this.state.selectDate || nowDate.getDate();
    const firstDay = this.getFirstDay(currentYear, currentMonth);
    const days = this.getLastDate(currentYear, currentMonth);
    const lastDay = this.getLastDay(currentYear, currentMonth);
    const lastMonthDates = this.getLastMonthDates(currentYear, currentMonth);
    const beforeDays = firstDay === 0 ? 6 : firstDay-1;
    const afterDays = lastDay === 0 ? 0 : 7-lastDay;
    const renderArray = this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

    this.setState({
      days: days,
      renderArray: renderArray,
      lastMonthDates: lastMonthDates,
      beforeDays: beforeDays,
      currentMonth: currentMonth,
      currentYear: currentYear,
      selectDate: selectDate,
      isFocus: true
    })
  }

  // 获取本月份1号是星期几
  getFirstDay = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day;
  }

  // 获取本月最后一天是星期几
  getLastDay = (year, month) => {
    if (month === 11) {
      month = 0;
      year = year+1;
    } else {
      month = month + 1;
    }
    const day = new Date(year, month, 0).getDay();
    return day;
  }

  // 获取本月份最后一天是几号
  getLastDate = (year, month) => {
    if (month == 11) {
      month = 0;
      year = year+1;
    } else {
      month = month + 1;
    }
    const date = new Date(year, month, 0).getDate();
    return date;
  }

  // 获取上个月最后一天是几号
  getLastMonthDates = (year, month) => {
    if (month == 0) {
      year = year - 1;
    }
    const date = new Date(year, month, 0).getDate();
    return date;
  }
  // 生成要渲染的 当月日期数据
  getRenderArray = (days, beforeDays, afterDays, lastMonthDates) => {
    let renderArray = [];
    for (let d = 0; d < days; d++) {
      renderArray[d] = d+1;
    }
    for(let i = 0; i < beforeDays; i++) {
      renderArray.unshift(lastMonthDates-i);
    } 
    for (let k = 0; k < afterDays; k++) {
      renderArray.push(k+1);
    }
    return renderArray;
  }

  // 获取上个个年份
  setLastYear = (e) => {
    e.stopPropagation();  
    e.nativeEvent.stopImmediatePropagation();

    const currentYear = this.state.currentYear - 1;
    const currentMonth = this.state.currentMonth;
    const firstDay = this.getFirstDay(currentYear, currentMonth);
    const days = this.getLastDate(currentYear, currentMonth);
    const lastDay = this.getLastDay(currentYear, currentMonth);
    const lastMonthDates = this.getLastMonthDates(currentYear, currentMonth);
    const beforeDays = firstDay === 0 ? 6 : firstDay-1;
    const afterDays = lastDay === 0 ? 0 : 7-lastDay;
    const renderArray = this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

    this.setState({
      days: days,
      renderArray: renderArray,
      lastMonthDates: lastMonthDates,
      beforeDays: beforeDays,
      currentYear: currentYear,
    })
  }
  
  // 获取上个月份
  setLastMonth = (e) => {
    e.stopPropagation();  
    e.nativeEvent.stopImmediatePropagation();
    let currentYear;
    let currentMonth;
    if (this.state.currentMonth === 0) {
      currentYear = this.state.currentYear - 1;
      currentMonth = 11;
    } else {
      currentYear = this.state.currentYear;
      currentMonth = this.state.currentMonth - 1;
    }
    const firstDay = this.getFirstDay(currentYear, currentMonth);
    const days = this.getLastDate(currentYear, currentMonth);
    const lastDay = this.getLastDay(currentYear, currentMonth);
    const lastMonthDates = this.getLastMonthDates(currentYear, currentMonth);
    const beforeDays = firstDay === 0 ? 6 : firstDay-1;
    const afterDays = lastDay === 0 ? 0 : 7-lastDay;
    const renderArray = this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

    this.setState({
      days: days,
      renderArray: renderArray,
      lastMonthDates: lastMonthDates,
      beforeDays: beforeDays,
      currentYear: currentYear,
      currentMonth: currentMonth
    })
  }

  // 获取下个月份
  setNextMonth = (e) => {
    e.stopPropagation();  
    e.nativeEvent.stopImmediatePropagation();

    let currentYear;
    let currentMonth;
    if (this.state.currentMonth === 11) {
      currentYear = this.state.currentYear + 1;
      currentMonth = 0;
    } else {
      currentYear = this.state.currentYear;
      currentMonth = this.state.currentMonth + 1;
    }
    const firstDay = this.getFirstDay(currentYear, currentMonth);
    const days = this.getLastDate(currentYear, currentMonth);
    const lastDay = this.getLastDay(currentYear, currentMonth);
    const lastMonthDates = this.getLastMonthDates(currentYear, currentMonth);
    const beforeDays = firstDay === 0 ? 6 : firstDay-1;
    const afterDays = lastDay === 0 ? 0 : 7-lastDay;
    const renderArray = this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

    this.setState({
      days: days,
      renderArray: renderArray,
      lastMonthDates: lastMonthDates,
      beforeDays: beforeDays,
      currentYear: currentYear,
      currentMonth: currentMonth
    })
  }

  // 获取下个年份
  setNextYear = (e) => {
    e.stopPropagation();  
    e.nativeEvent.stopImmediatePropagation();

    const currentYear = this.state.currentYear + 1;
    const currentMonth = this.state.currentMonth;
    const firstDay = this.getFirstDay(currentYear, currentMonth);
    const days = this.getLastDate(currentYear, currentMonth);
    const lastDay = this.getLastDay(currentYear, currentMonth);
    const lastMonthDates = this.getLastMonthDates(currentYear, currentMonth);
    const beforeDays = firstDay === 0 ? 6 : firstDay-1;
    const afterDays = lastDay === 0 ? 0 : 7-lastDay;
    const renderArray = this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

    this.setState({
      days: days,
      renderArray: renderArray,
      lastMonthDates: lastMonthDates,
      beforeDays: beforeDays,
      currentYear: currentYear,
    })
  }

  // 选中日期
  pickDate = (e, date, month) => {
    e.stopPropagation();  
    e.nativeEvent.stopImmediatePropagation();

    let currentYear;
    let currentMonth;
    let strMonth;
    let strDate;
    if (month) {
      currentYear = this.state.currentYear;
      currentMonth = this.state.currentMonth;
      strMonth = `0${this.state.currentMonth + 1}`;
    } else if (date < 7) {
      if (this.state.currentMonth === 11) {
        currentYear = this.state.currentYear + 1;
        currentMonth = 0;
        strMonth = '01';
      } else {
        currentYear = this.state.currentYear;
        currentMonth = this.state.currentMonth + 1;
        strMonth = `0${this.state.currentMonth + 2}`;
      }
     
    } else {
      if (this.state.currentMonth === 0) {
        currentYear = this.state.currentYear - 1;
        currentMonth = 11;
        strMonth = '12';
      } else {
        currentYear = this.state.currentYear;
        currentMonth = this.state.currentMonth - 1;
        strMonth = `0${this.state.currentMonth}`;
      }
    }
    if (String(date).length > 1) {
      strDate = date;
    } else {
      strDate = `0${date}`;
    }
    this.setState({
      currentMonth: currentMonth,
      currentYear: currentYear,
      selectDate: date,
      pitchDate: `${currentYear}-${strMonth}-${strDate}`,
      showPicker: false
    })
    this.props.onChange(`${currentYear}-${strMonth}-${strDate}`);
  }

  // 整个组件阻止冒泡
  stopPropagation = (e) => {
    e.stopPropagation();  
    e.nativeEvent.stopImmediatePropagation();
  }

  handleBlur = () => {
    this.setState({
      isFocus: false,
      showPicker: true
    })
  }

  render() {
    const { pitchDate, showPicker, days,  beforeDays, renderArray, currentYear, currentMonth, currentDate, selectDate,  isFocus} = this.state;
    return(
      <div className={cx('date-picker')}>
        <input
          className={cx('date-input')}
          type="text" 
          placeholder="请选择时间"
          onFocus={this.setPicker}
          value={pitchDate}
          onBlur={this.handleBlur}
        />
        <div 
          className={cx('date-container')}
          style={{display: showPicker || isFocus ? 'block' : 'none'}}
          onClick={this.stopPropagation}
        >
          <div className={cx('date-header')}>
            <span
              onClick={this.setLastYear}
              className={cx('last-year')} >
            </span>
            <span
              onClick={this.setLastMonth}
              className={cx('last-month')}>
            </span>
            <span className={cx('header-content')}>{`${currentYear}年${currentMonth+1}月`}</span>
            <span
              onClick={this.setNextMonth}
              className={cx('next-month')} >
              </span>
            <span
              onClick={this.setNextYear}
              className={cx('next-year')} >
            </span>
          </div>
          <div className={cx('date-main')}>
            <div className={cx('week')}>
              <div>一</div>
              <div>二</div>
              <div>三</div>
              <div>四</div>
              <div>五</div>
              <div>六</div>
              <div>日</div>
            </div>
            <div className={cx('date-list')}>
              {
                renderArray.map((val, idx) => {
                  if (selectDate === idx - beforeDays + 1) {
                    return (
                      <div
                        className={cx('select-date')}
                        onClick={ (e) => this.pickDate(e, val, currentMonth)}
                        key={idx} >
                        {val}
                      </div>
                    )
                  } else if (currentDate.getDate() == idx - beforeDays + 1 && currentDate.getFullYear() == currentYear && currentDate.getMonth() == currentMonth) {
                    return (
                      <div
                        className={cx('current-date')}
                        onClick={ (e) => this.pickDate(e, val, currentMonth)}
                        key={idx} >
                        {val}
                      </div>
                    )
                  } else if ( idx >= beforeDays && idx < days + beforeDays) {
                    return (
                      <div
                        className={cx('date-active')}
                        onClick={(e) => this.pickDate(e, val, currentMonth)}
                        key={idx}>
                        {val}
                      </div>
                    )
                  } else {
                    return (
                      <div
                        onClick={(e) => this.pickDate(e, val)}
                        key={idx}>
                        {val}
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
          <div className={cx('date-footer')}>今天</div>
        </div>
      </div>
    )
  }
}
export default ReactDatePicker;
