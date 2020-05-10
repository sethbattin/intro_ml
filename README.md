# Intro to Machine Learning.

Exercises as part of _An Introduction to Machine Learning_, 2017 by Miroslav Kubat

https://link.springer.com/book/10.1007%2F978-3-319-63913-0

## Datasets
The books contains a stale link to UC Irvine's Machine Learning Repository.  The current link is https://archive.ics.uci.edu/ml/index.php

I will check in relevant descriptions of sets, but probably leave the data itself outside this repo.

### Processing options
--classColumn (default: 0) specifies which column of the data to treat that the classification
--headingRow (default: first line of data) specifies headings to use for columns in the data

pies example:
```bash
node csvReader.js < datasets/book-pies/pies.data --classColumn=5
```

mushrooms example:
```bash
node csvReader.js < datasets/agaricus-lepiota/agaricus-lepiota.data --headingRow="class,cap-shape,cap-surface,cap-color,bruises?,odor,gill-attachment,gill-spacing,gill-size,gill-color,stalk-shape,stalk-root,stalk-surface-above-ring,stalk-surface-below-ring,stalk-color-above-ring,stalk-color-below-ring,veil-type,veil-color,ring-number,ring-type,spore-print-color,population,habitat"
```

## TODO
Add m-expression
Mushrooms fails to classify due to some empty values.  Although I could make the math stop dividing by zero, it would be better to a reasonable m-express.
