const readline = require('readline');
const classifier = require('./classifier');

const rl = readline.createInterface({input: process.stdin});

// should probably use a cli library here.  
const classColumn = parseInt(
  process.argv.includes('--classColumn') ?
    process.argv[process.argv.indexOf('--classColumn') + 1] :
    process.argv.reduce(
      (arg, v) => v.match('--classColumn=') ? v.split('=')[1] : arg,
      0
    ),
  10);

const data = [];
let headingRow = 
  process.argv.includes('--headingRow') ?
    process.argv[provess.argv.indexOf('--headingRow') + 1] :
    process.argv.reduce(
      (arg, v) => v.match('--headingRow=') ? v.split('=')[1].split(',') : arg,
      null
    )
;

rl.on('line', (line) => {
  data.push(line.split(','));
  if (!headingRow) {
    headingRow = data.pop();
  }
});
rl.on('close', () => {
  const trained = classifier.bayesDiscrete(data.slice(0, 8), {classColumn, headingRow});

  let testInstance = [...data.pop()]
  testInstance.splice(classColumn, 1);
  console.log(trained.debug());
  const classification = trained.classify(testInstance);

//  console.log(testInstance, classification,
//    headingRow
  //  trained.probabilities
//  );
});
