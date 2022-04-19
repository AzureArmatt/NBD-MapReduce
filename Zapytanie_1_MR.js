const mapFunction = function () {
  const key = this.sex;
  const value = {
    count: 1,
    weight: parseFloat(this.weight),
    height: parseFloat(this.height),
  };
  emit(key, value);
};

const reduceFunction = function (key, values) {
  let counter = 0;
  let weightSum = 0;
  let heightSum = 0;

  for (i = 0; i < values.length; i++) {
    counter += values[i].count;
    weightSum += values[i].weight;
    heightSum += values[i].height;
  }

  return {
    count: counter,
    weight: weightSum,
    height: heightSum,
  };
};

const finalFunction = function (key, redVal) {
  return {
    count: redVal.count,
    avgWeight: redVal.weight / redVal.count,
    avgHeight: redVal.height / redVal.count,
  };
};

db.people.mapReduce(mapFunction, reduceFunction, {
  out: "wyniki_MR",
  finalize: finalFunction,
});

printjson(db.wyniki_MR.find({}).toArray());
