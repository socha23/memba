const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

require("jest-enzyme/lib/index");

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    testURL: 'http://localhost'
});