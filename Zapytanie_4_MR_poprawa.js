const mapFunction = function () {
  const key = this.nationality;

  const weight = parseFloat(this.weight);
  const height = parseFloat(this.height) / 100;
  const BMI = weight / (height ^ 2);

  const value = {
    avgBMI: BMI,
    minBMI: BMI,
    maxBMI: BMI,
    count: 1,
  };

  emit(key, value);
};

const reduceFunction = function (key, values) {
  let sum = 0;
  let min = values[0].minBMI;
  let max = values[0].maxBMI;
  let counter = 0;

  values.forEach((e) => {
    if (e.minBMI < min) {
      min = e.minBMI;
    }
    if (e.maxBMI > max) {
      max = e.maxBMI;
    }
    sum+=e.avgBMI;
    counter += e.count;
  });

  return {
    avgBMI: sum,
    minBMI: min,
    maxBMI: max,
    count: counter,
  };
};

const finalFunction = function (key, redVal) {
  return {
    avgBMI: redVal.avgBMI/redVal.count,
    minBMI: redVal.minBMI,
    maxBMI: redVal.maxBMI,
    count: redVal.count,
  };
};

db.people.mapReduce(mapFunction, reduceFunction, {
  out: "wyniki_MR4",
  finalize: finalFunction,
});

printjson(db.wyniki_MR4.find({}).toArray());
