const mapFunction = function () {
  const key = this.job;
  const value = 1;
  emit(key, value);
};

const reduceFunction = function (key, values) {
  return Array.sum(values);
};

db.people.mapReduce(mapFunction, reduceFunction, {
  out: "wyniki_MR3",
});

printjson(db.wyniki_MR3.find({}).toArray());
