const readline = require('readline');
const classifier = require('./classifier');

const rl = readline.createInterface({input: process.stdin});

const data = [];

rl.on('line', (line) => {
  data.push(line.split(','));
});
rl.on('close', () => {
  const headingRow = data.shift();
  const trained = classifier.bayesDiscrete(data, {classColumn: 5, headingRow});

  const testInstance = ['Square', 'Thick', 'Gray', 'Thin', 'White'];
  const classification = trained.classify(testInstance, {debug: true});

  console.log(testInstance, classification);
});
