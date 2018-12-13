'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var date = {
  hours: '',
  mintes: ''
};

var words = {
  sentenceParts: {
    it: document.getElementById('it'),
    is: document.getElementById('is'),
    am: document.getElementById('am'),
    pm: document.getElementById('pm')
  },
  minutes: {
    five: document.getElementById('five'),
    ten: document.getElementById('ten'),
    quarter: document.getElementById('quarter'),
    twenty: document.getElementById('twenty'),
    half: document.getElementById('half')
  },
  dividers: {
    to: document.getElementById('to'),
    past: document.getElementById('past'),
    equal: document.getElementById('oclock-h')
  },
  hours: [document.getElementById('one-h'), document.getElementById('two-h'), document.getElementById('three-h'), document.getElementById('four-h'), document.getElementById('five-h'), document.getElementById('six-h'), document.getElementById('seven-h'), document.getElementById('eight-h'), document.getElementById('nine-h'), document.getElementById('ten-h'), document.getElementById('eleven-h'), document.getElementById('twelve-h')]
};

var setMinutes = function setMinutes() {
  if (date.minutes <= 5) {
    // 05 past
    addActiveClass(words.minutes.five);
  } else if (date.minutes > 5 && date.minutes <= 10) {
    // 10 past
    addActiveClass(words.minutes.ten);
  } else if (date.minutes > 10 && date.minutes <= 15) {
    // 15 past
    addActiveClass(words.minutes.quarter);
  } else if (date.minutes > 15 && date.minutes <= 20) {
    // 20 past
    addActiveClass(words.minutes.twenty);
  } else if (date.minutes > 20 && date.minutes <= 25) {
    // 25 past
    addActiveClass(words.minutes.twenty);
    addActiveClass(words.minutes.five);
  } else if (date.minutes > 25 && date.minutes <= 30) {
    // 30 past
    addActiveClass(words.minutes.half);
  } else if (date.minutes > 30 && date.minutes <= 35) {
    // 25 to
    addActiveClass(words.minutes.twenty);
    addActiveClass(words.minutes.five);
  } else if (date.minutes > 35 && date.minutes <= 40) {
    // 20 to
    addActiveClass(words.minutes.twenty);
  } else if (date.minutes > 40 && date.minutes <= 45) {
    // 15 to
    addActiveClass(words.minutes.quarter);
  } else if (date.minutes > 45 && date.minutes <= 50) {
    // 10 to
    addActiveClass(words.minutes.ten);
  } else if (date.minutes > 50 && date.minutes <= 55) {
    // 5 to
    addActiveClass(words.minutes.five);
  }
};

var setHours = function setHours() {
  addActiveClass(words.hours[date.hours === 12 ? date.pastHalf ? 0 : 11 : date.pastHalf ? date.hours : date.hours - 1]);
  addActiveClass(date.minutes <= 55 ? date.pastHalf ? words.dividers.to : words.dividers.past : words.dividers.equal);
};

var setAm = function setAm() {
  date.am ? addActiveClass(words.sentenceParts.am) : addActiveClass(words.sentenceParts.pm);
};

var addActiveClass = function addActiveClass(elem) {
  elem.classList.add('active');
};

var activateDisplay = function activateDisplay() {
  setAm();
  setHours();
  setMinutes();
};

var removeActiveClass = function removeActiveClass() {
  var activated = Array.from(document.getElementsByClassName('active'));
  activated.forEach(function (elem) {
    return elem.classList.remove('active');
  });
};

var runClock = function runClock() {
  removeActiveClass();
  activateDisplay();
};

var setDate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var fetched, fetchedJson;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch('http://worldclockapi.com/api/json/cet/now');

          case 2:
            fetched = _context.sent;
            _context.next = 5;
            return fetched.json();

          case 5:
            fetchedJson = _context.sent;

            date = {
              hours: new Date().getHours() % 12 || 12,
              minutes: new Date().getMinutes() + 2,
              am: new Date().getHours() <= 12 ? true : false,
              pastHalf: new Date().getMinutes() > 30 ? true : false
            };
            runClock();

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function setDate() {
    return _ref.apply(this, arguments);
  };
}();

window.onload = setDate;
setInterval(setDate, 30000);
