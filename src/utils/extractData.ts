function extractData(data: any) {
  if (!data) {
    return null;
  }

  if (Array.isArray(data) && Array.isArray(data[1])) {
    const [, orderBook] = data;

    return orderBook;
  } else {
    return null;
  }
}

export default extractData;
