export const imageShow = (src, theme) => {
  return (
    <img
      src={`/public/images/${src}`}
      alt="images"
      className="img-thumbnail"
      style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
    />
  );
};

export const videoShow = (src, theme) => {
  return (
    <video
      controls
      src={`/public/images/${src}`}
      alt="images"
      className="img-thumbnail"
      style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
    />
  );
};
