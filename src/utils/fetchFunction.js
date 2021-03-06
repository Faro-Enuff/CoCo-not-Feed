const fetchFunction = (url, setData, setIsPending) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch the data for that resource");
      }
      return res.json();
    })
    .then((data) => {
      if (data.results) {
        setData(data.results);
      } else {
        setData(data);
      }
      setIsPending(false);
    });
};

export default fetchFunction;
