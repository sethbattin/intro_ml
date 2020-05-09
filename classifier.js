const bayesDiscrete = (data, {classColumn, headingRow}) => {
  const attributeCounts = {};
  const classCounts = {};
  const probabilities = {};

  const instanceAttributes = (instance) => 
    instance.reduce((attributes, attribute, i) => 
      [...attributes, ...(i === classColumn ? [] : [`${headingRow[i]}:${attribute}`] )], [])


  const pExpression = (classification, instance) => {
    const attributes = instanceAttributes(instance);
    return `P(${classification}|[${attributes.join(', ')}]) = `;
  };

  const pClassGivenAttribute = (classification, attribute) => (
    probabilities[`${attribute}|${classification}`] * 
    probabilities[classification] / 
    probabilities[attribute]
  );

  const makeTable = (classification, instance) => {
    const attributes = instanceAttributes(instance)
    const table = attributes.reduce((acc, attribute, i) => ({
      ...acc, 
      [`P(${classification}|${attribute})`]: {
        [`P({attribute}|${classification})`]: probabilities[`${attribute}|${classification}`],
        [`P(${classification})`]: probabilities[classification],
        [`P({attribute})`]: probabilities[attribute],
        total: pClassGivenAttribute(classification, attribute),
      }
    }), {});
    const total = pClassGivenAll(classification, instance);
    return ({...table, [`P(${classification}|[...])`]: {total}});
  };
 
  // Count all classes and attributes
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

  // Total probabiltities
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

  const pClassGivenAll = (classification, instance) => {
    const attributes = instanceAttributes(instance);
    const probabilities = attributes.map(
      (attribute) => pClassGivenAttribute(classification, attribute));
    return probabilities.reduce((acc, p) => p * acc, 1);
  }

  return {
    debug: () => {
      data.forEach((instance, i) => {
        console.log(`Instance class: ${instance[classColumn]}`);
        Object.keys(classCounts).forEach((classification) => {
          console.log(pExpression(classification, instance));
          console.table(makeTable(classification, instance));
        });
      });
    },
    data,
    classCounts,
    attributeCounts,
    probabilities,
    instanceAttributes,
    classify: (instance, {debug} = {}) => {
      let max = 0;
      let maxClass;
      Object.keys(classCounts).forEach((classification) => {
        const probability = instanceAttributes(instance)
          .map(a => pClassGivenAttribute(classification, a))
          .reduce((acc, p) => p * acc, 1);
        if (probability > max) {
          max = probability;
          maxClass = classification;
        }
        if (debug) {
          console.log(pExpression(classification, instance));
          console.table(makeTable(classification, instance));
        }
      });
      return maxClass;
    }
  };

};

module.exports = {
  bayesDiscrete
};
