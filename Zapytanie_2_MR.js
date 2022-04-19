const mapFunction = function () {
  for (i = 0; i < this.credit.length; i++) {
    const key = this.credit[i].currency;
    const value = parseFloat(this.credit[i].balance);
    emit(key, value);
  }
};

const reducerFunction = function (key, values) {
  let currSum = 0;
  for (i = 0; i < values.length; i++) {
    currSum += values[i];
  }
  return currSum;
};

db.people.mapReduce(mapFunction, reducerFunction, { out: "wyniki_MR2" });

printjson(db.wyniki_MR2.find({}).toArray());
