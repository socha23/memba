const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

require("jest-enzyme/lib/index");

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    testURL: 'http://localhost'
});


const moment = require.requireActual('moment-timezone');
  jest.doMock('moment', () => {
    moment.tz.setDefault('UTC');
    return moment;
  });
