const mapFunction = function () {
  const key = this.nationality;

  const weight = parseFloat(this.weight);
  const height = parseFloat(this.height) / 100;
  const value = weight / (height ^ 2);

  emit(key, value);
};

const reduceFunction = function (key, values) {
  return values;
};

const finalFunction = function (key, redVal) {
  let sumBmi = 0;
  let counter = 0;
  let minBmi = redVal[0];
  let maxBmi = redVal[0];

  for (i = 0; i < redVal.length; i++) {
    if (redVal[i] < minBmi) minBmi = redVal[i];

    if (redVal[i] > maxBmi) maxBmi = redVal[i];

    sumBmi += redVal[i];
    counter++;
  }

  return {
    avgBMI: sumBmi / counter,
    minBMI: minBmi,
    maxBMI: maxBmi,
    count: counter,
  };
};

db.people.mapReduce(mapFunction, reduceFunction, {
  out: "wyniki_MR4",
  finalize: finalFunction,
});

printjson(db.wyniki_MR4.find({}).toArray());
