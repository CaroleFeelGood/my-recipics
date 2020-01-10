let findOne = async (collectionName, criteria) => {
  return new Promise((res, rej) => {
    dbo.collection(collectionName).findOne(criteria, (err, result) => {
      if (err) {
        rej(err);
        return;
      }
      res(result);
    });
  });
};