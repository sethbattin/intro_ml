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

  console.log(attributeCounts, classCounts);

};

module.exports = {
  bayesDiscrete
};
