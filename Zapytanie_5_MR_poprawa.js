const mapFunction = function () {
  //let value = new Array();
  for (i = 0; i < this.credit.length; i++) {
    const key = this.credit[i].currency;
    const value = {
      avgBalance: parseFloat(this.credit[i].balance),
      totalBalance: parseFloat(this.credit[i].balance),
      count: 1,
    };
    emit(key, value);
  }
};

const reducerFunction = function (key, values) {
  let currSum = 0;
  let counter = 0;
  values.forEach((e) => {
    currSum += e.avgBalance;
    counter += e.count;
  });
  // return values;
  return {
    avgBalance: currSum,
    totalBalance: currSum,
    count: counter,
  };
};

const finalFunction = function (key, redVal) {
  // let currSum = 0;
  // let counter = 0;
  // for (i = 0; i < redVal.length; i++) {
  //   currSum += redVal[i];
  //   counter++;
  // }

  let avgSum = redVal.avgBalance / redVal.count;

  return {
    avgBalance: avgSum,
    totalBalance: redVal.totalBalance,
    count: redVal.count,
  };
};

db.people.mapReduce(mapFunction, reducerFunction, {
  out: "wyniki_MR5",
  query: { nationality: "Poland", sex: "Female" },
  finalize: finalFunction,
});

printjson(db.wyniki_MR5.find({}).toArray());
