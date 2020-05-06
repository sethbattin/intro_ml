const bayesDiscrete = (data, {classColumn, headingRow}) => {
  const attributeCounts = {};
  const classCounts = {};

  data.forEach(instance => {
    instance.forEach((col, i, row) => {
      if (i === classColumn) {
        classCounts[col] = 1 + (classCounts[col] || 0);
      } else {
        const classification = row[classColumn];
        const attribute = headingRow[i];
        attributeCounts[classification] = attributeCounts[classification] || {};
        attributeCounts[classification][attribute] = attributeCounts[classification][attribute] || {};
        attributeCounts[classification][attribute][col] = 1 + (attributeCounts[classification][attribute][col] || 0);
      }
    })
  });

  const probabilities = {};
  Object.entries(attributeCounts).forEach(([classification, attributes]) => {
    probabilities[classification] = classCounts[classification] / data.length;
    Object.entries(attributes).forEach(([attribute, variations]) => {
      Object.entries(variations).forEach(([variation, value]) => {
        const attributeVariation = `${attribute}:${variation}`;
        probabilities[`${attributeVariation}|${classification}`] = value / classCounts[classification];
        probabilities[attributeVariation] = value / data.length + (probabilities[attributeVariation] || 0);
      });
    });
  });

  const instancePis = {};
  data.forEach((instance, i) => {
    Object.keys(classCounts).forEach((classification) => {
      // bedtime pseudocode:
      // print the probability expression for the instance with its known class
      // print the individual attribute probabilities
      // print the net probability (big-PI product of all), expect > inverse
    })
  });
  

  

  console.log(attributeCounts, probabilities);

};

module.exports = {
  bayesDiscrete
};
