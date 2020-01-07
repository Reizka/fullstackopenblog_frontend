//using array.sort was baffling, so simple bubble sort will have to do instead
export const largeToSmallLikesSort = blogs => {
  let bs = [...blogs];
  let t = null;
  for (let j = 0; j <= bs.length; j++) {
    for (let i = 0; i <= bs.length - 2; i++) {
      if (bs[i].likes < bs[i + 1].likes) {
        t = bs[i + 1];
        bs[i + 1] = bs[i];
        bs[i] = t;
      }
    }
  }
  return bs;
};