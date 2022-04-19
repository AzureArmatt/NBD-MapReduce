const mapFunction = function () {
  let value = new Array();
  for (i = 0; i < this.credit.length; i++) {
    const key = this.credit[i].currency;
    const value = parseFloat(this.credit[i].balance);
    emit(key, value);
  }
};

const reducerFunction = function (key, values) {
  return values;
};

const finalFunction = function (key, redVal) {
  let currSum = 0;
  let counter = 0;
  for (i = 0; i < redVal.length; i++) {
    currSum += redVal[i];
    counter++;
  }

  return {
    avgBalance: currSum / counter,
    totalBalance: currSum,
    count: counter,
  };
};

db.people.mapReduce(mapFunction, reducerFunction, {
  out: "wyniki_MR5",
  query: { nationality: "Poland", sex: "Female" },
  finalize: finalFunction,
});

printjson(db.wyniki_MR5.find({}).toArray());
