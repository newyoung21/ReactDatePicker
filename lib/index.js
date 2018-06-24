'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _bind2.default.bind(_styleMod2.default);

var ReactDatePicker = function (_Component) {
  _inherits(ReactDatePicker, _Component);

  function ReactDatePicker(props) {
    _classCallCheck(this, ReactDatePicker);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.setPicker = function (e) {
      var nowDate = _this.state.pitchDate ? new Date(_this.state.pitchDate) : new Date();
      var currentYear = _this.state.currentYear || nowDate.getFullYear();
      var currentMonth = _this.state.currentMonth || nowDate.getMonth();
      //const currentDate = this.state.currentDate || nowDate.getDate();
      var selectDate = _this.state.selectDate || nowDate.getDate();
      var firstDay = _this.getFirstDay(currentYear, currentMonth);
      var days = _this.getLastDate(currentYear, currentMonth);
      var lastDay = _this.getLastDay(currentYear, currentMonth);
      var lastMonthDates = _this.getLastMonthDates(currentYear, currentMonth);
      var beforeDays = firstDay === 0 ? 6 : firstDay - 1;
      var afterDays = lastDay === 0 ? 0 : 7 - lastDay;
      var renderArray = _this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

      _this.setState({
        days: days,
        renderArray: renderArray,
        lastMonthDates: lastMonthDates,
        beforeDays: beforeDays,
        showPicker: true,
        currentMonth: currentMonth,
        currentYear: currentYear,
        selectDate: selectDate
      });
    };

    _this.getFirstDay = function (year, month) {
      var day = new Date(year, month, 1).getDay();
      return day;
    };

    _this.getLastDay = function (year, month) {
      if (month === 11) {
        month = 0;
        year = year + 1;
      } else {
        month = month + 1;
      }
      var day = new Date(year, month, 0).getDay();
      return day;
    };

    _this.getLastDate = function (year, month) {
      if (month == 11) {
        month = 0;
        year = year + 1;
      } else {
        month = month + 1;
      }
      var date = new Date(year, month, 0).getDate();
      return date;
    };

    _this.getLastMonthDates = function (year, month) {
      if (month == 0) {
        year = year - 1;
      }
      var date = new Date(year, month, 0).getDate();
      return date;
    };

    _this.getRenderArray = function (days, beforeDays, afterDays, lastMonthDates) {
      var renderArray = [];
      for (var d = 0; d < days; d++) {
        renderArray[d] = d + 1;
      }
      for (var i = 0; i < beforeDays; i++) {
        renderArray.unshift(lastMonthDates - i);
      }
      for (var k = 0; k < afterDays; k++) {
        renderArray.push(k + 1);
      }
      return renderArray;
    };

    _this.clickInput = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    };

    _this.setLastYear = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      var currentYear = _this.state.currentYear - 1;
      var currentMonth = _this.state.currentMonth;
      var firstDay = _this.getFirstDay(currentYear, currentMonth);
      var days = _this.getLastDate(currentYear, currentMonth);
      var lastDay = _this.getLastDay(currentYear, currentMonth);
      var lastMonthDates = _this.getLastMonthDates(currentYear, currentMonth);
      var beforeDays = firstDay === 0 ? 6 : firstDay - 1;
      var afterDays = lastDay === 0 ? 0 : 7 - lastDay;
      var renderArray = _this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

      _this.setState({
        days: days,
        renderArray: renderArray,
        lastMonthDates: lastMonthDates,
        beforeDays: beforeDays,
        currentYear: currentYear
      });
    };

    _this.setLastMonth = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      var currentYear = void 0;
      var currentMonth = void 0;
      if (_this.state.currentMonth === 0) {
        currentYear = _this.state.currentYear - 1;
        currentMonth = 11;
      } else {
        currentYear = _this.state.currentYear;
        currentMonth = _this.state.currentMonth - 1;
      }
      var firstDay = _this.getFirstDay(currentYear, currentMonth);
      var days = _this.getLastDate(currentYear, currentMonth);
      var lastDay = _this.getLastDay(currentYear, currentMonth);
      var lastMonthDates = _this.getLastMonthDates(currentYear, currentMonth);
      var beforeDays = firstDay === 0 ? 6 : firstDay - 1;
      var afterDays = lastDay === 0 ? 0 : 7 - lastDay;
      var renderArray = _this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

      _this.setState({
        days: days,
        renderArray: renderArray,
        lastMonthDates: lastMonthDates,
        beforeDays: beforeDays,
        currentYear: currentYear,
        currentMonth: currentMonth
      });
    };

    _this.setNextMonth = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      var currentYear = void 0;
      var currentMonth = void 0;
      if (_this.state.currentMonth === 11) {
        currentYear = _this.state.currentYear + 1;
        currentMonth = 0;
      } else {
        currentYear = _this.state.currentYear;
        currentMonth = _this.state.currentMonth + 1;
      }
      var firstDay = _this.getFirstDay(currentYear, currentMonth);
      var days = _this.getLastDate(currentYear, currentMonth);
      var lastDay = _this.getLastDay(currentYear, currentMonth);
      var lastMonthDates = _this.getLastMonthDates(currentYear, currentMonth);
      var beforeDays = firstDay === 0 ? 6 : firstDay - 1;
      var afterDays = lastDay === 0 ? 0 : 7 - lastDay;
      var renderArray = _this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

      _this.setState({
        days: days,
        renderArray: renderArray,
        lastMonthDates: lastMonthDates,
        beforeDays: beforeDays,
        currentYear: currentYear,
        currentMonth: currentMonth
      });
    };

    _this.setNextYear = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      var currentYear = _this.state.currentYear + 1;
      var currentMonth = _this.state.currentMonth;
      var firstDay = _this.getFirstDay(currentYear, currentMonth);
      var days = _this.getLastDate(currentYear, currentMonth);
      var lastDay = _this.getLastDay(currentYear, currentMonth);
      var lastMonthDates = _this.getLastMonthDates(currentYear, currentMonth);
      var beforeDays = firstDay === 0 ? 6 : firstDay - 1;
      var afterDays = lastDay === 0 ? 0 : 7 - lastDay;
      var renderArray = _this.getRenderArray(days, beforeDays, afterDays, lastMonthDates);

      _this.setState({
        days: days,
        renderArray: renderArray,
        lastMonthDates: lastMonthDates,
        beforeDays: beforeDays,
        currentYear: currentYear
      });
    };

    _this.pickDate = function (e, date, month) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      var currentYear = void 0;
      var currentMonth = void 0;
      var strMonth = void 0;
      var strDate = void 0;
      if (month) {
        currentYear = _this.state.currentYear;
        currentMonth = _this.state.currentMonth;
        strMonth = '0' + (_this.state.currentMonth + 1);
      } else if (date < 7) {
        if (_this.state.currentMonth === 11) {
          currentYear = _this.state.currentYear + 1;
          currentMonth = 0;
          strMonth = '01';
        } else {
          currentYear = _this.state.currentYear;
          currentMonth = _this.state.currentMonth + 1;
          strMonth = '0' + (_this.state.currentMonth + 2);
        }
      } else {
        if (_this.state.currentMonth === 0) {
          currentYear = _this.state.currentYear - 1;
          currentMonth = 11;
          strMonth = '12';
        } else {
          currentYear = _this.state.currentYear;
          currentMonth = _this.state.currentMonth - 1;
          strMonth = '0' + _this.state.currentMonth;
        }
      }
      if (String(date).length > 1) {
        strDate = date;
      } else {
        strDate = '0' + date;
      }
      _this.setState({
        currentMonth: currentMonth,
        currentYear: currentYear,
        selectDate: date,
        pitchDate: currentYear + '-' + strMonth + '-' + strDate,
        showPicker: false
      });
      _this.props.onChange(currentYear + '-' + strMonth + '-' + strDate);
    };

    _this.stopPropagation = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    };

    _this.state = {
      showPicker: false,
      currentYear: '',
      currentMonth: '',
      currentDate: new Date(),
      pitchDate: '',
      days: '',
      renderArray: [],
      selectDate: ''
    };
    return _this;
  }

  ReactDatePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps === prevState) {
      return null;
    }
    return {
      pitchDate: prevState.pitchDate || nextProps.value
    };
  };

  ReactDatePicker.prototype.componentDidMount = function componentDidMount() {
    var self = this;
    document.addEventListener('click', function (e) {
      self.setState({
        showPicker: false
      });
    });
  };
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.value) {
  //     this.setState({
  //       pitchDate: nextProps.value
  //     })
  //   }
  // }


  // 获取本月份1号是星期几


  // 获取本月最后一天是星期几


  // 获取本月份最后一天是几号


  // 获取上个月最后一天是几号

  // 生成要渲染的 当月日期数据


  // 获取上个个年份


  // 获取上个月份


  // 获取下个月份


  // 获取下个年份


  // 选中日期


  // 整个组件阻止冒泡


  ReactDatePicker.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state,
        pitchDate = _state.pitchDate,
        showPicker = _state.showPicker,
        days = _state.days,
        beforeDays = _state.beforeDays,
        renderArray = _state.renderArray,
        currentYear = _state.currentYear,
        currentMonth = _state.currentMonth,
        currentDate = _state.currentDate,
        selectDate = _state.selectDate;

    return _react2.default.createElement(
      'div',
      { className: cx('date-picker') },
      _react2.default.createElement('input', {
        className: cx('date-input'),
        type: 'text',
        placeholder: '\u8BF7\u9009\u62E9\u65F6\u95F4',
        onFocus: this.setPicker,
        value: pitchDate,
        onClick: this.clickInput
      }),
      _react2.default.createElement(
        'div',
        { className: cx('date-container'), style: { display: showPicker ? 'block' : 'none' }, onClick: this.stopPropagation },
        _react2.default.createElement(
          'div',
          { className: cx('date-header') },
          _react2.default.createElement('span', {
            onClick: this.setLastYear,
            className: cx('last-year') }),
          _react2.default.createElement('span', {
            onClick: this.setLastMonth,
            className: cx('last-month') }),
          _react2.default.createElement(
            'span',
            { className: cx('header-content') },
            currentYear + '\u5E74' + (currentMonth + 1) + '\u6708'
          ),
          _react2.default.createElement('span', {
            onClick: this.setNextMonth,
            className: cx('next-month') }),
          _react2.default.createElement('span', {
            onClick: this.setNextYear,
            className: cx('next-year') })
        ),
        _react2.default.createElement(
          'div',
          { className: cx('date-main') },
          _react2.default.createElement(
            'div',
            { className: cx('week') },
            _react2.default.createElement(
              'div',
              null,
              '\u4E00'
            ),
            _react2.default.createElement(
              'div',
              null,
              '\u4E8C'
            ),
            _react2.default.createElement(
              'div',
              null,
              '\u4E09'
            ),
            _react2.default.createElement(
              'div',
              null,
              '\u56DB'
            ),
            _react2.default.createElement(
              'div',
              null,
              '\u4E94'
            ),
            _react2.default.createElement(
              'div',
              null,
              '\u516D'
            ),
            _react2.default.createElement(
              'div',
              null,
              '\u65E5'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: cx('date-list') },
            renderArray.map(function (val, idx) {
              if (selectDate === idx - beforeDays + 1) {
                return _react2.default.createElement(
                  'div',
                  {
                    className: cx('select-date'),
                    onClick: function onClick(e) {
                      return _this2.pickDate(e, val, currentMonth);
                    },
                    key: idx },
                  val
                );
              } else if (currentDate.getDate() == idx - beforeDays + 1 && currentDate.getFullYear() == currentYear && currentDate.getMonth() == currentMonth) {
                return _react2.default.createElement(
                  'div',
                  {
                    className: cx('current-date'),
                    onClick: function onClick(e) {
                      return _this2.pickDate(e, val, currentMonth);
                    },
                    key: idx },
                  val
                );
              } else if (idx >= beforeDays && idx < days + beforeDays) {
                return _react2.default.createElement(
                  'div',
                  {
                    className: cx('date-active'),
                    onClick: function onClick(e) {
                      return _this2.pickDate(e, val, currentMonth);
                    },
                    key: idx },
                  val
                );
              } else {
                return _react2.default.createElement(
                  'div',
                  {
                    onClick: function onClick(e) {
                      return _this2.pickDate(e, val);
                    },
                    key: idx },
                  val
                );
              }
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: cx('date-footer') },
          '\u4ECA\u5929'
        )
      )
    );
  };

  return ReactDatePicker;
}(_react.Component);

exports.default = ReactDatePicker;
