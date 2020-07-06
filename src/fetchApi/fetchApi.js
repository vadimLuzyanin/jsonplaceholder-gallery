const base = "https://jsonplaceholder.typicode.com";

export const fetchAuthorsList = async (setLoading, setAuthorsList) => {
  setLoading && setLoading(true);

  const res = await fetch(`${base}/users`);
  const authors = await res.json();

  setAuthorsList && setAuthorsList(authors);
  setLoading && setLoading(false);

  return authors;
};

export const fetchAlbum = async (albumId, setLoading, setAlbum) => {
  setLoading && setLoading(true);

  const resPictures = await fetch(`${base}/albums/${albumId}/photos`);
  const resPicturesArr = await resPictures.json();

  const resAlbum = await fetch(`${base}/albums/${albumId}`);
  const resAlbumObj = await resAlbum.json();

  const result = await { pictures: resPicturesArr, ...resAlbumObj };

  setAlbum && setAlbum(result);
  setLoading && setLoading(false);

  return result;
};

export const fetchAuthor = async (authorId, setLoading, setAuthor) => {
  setLoading && setLoading(true);

  const resAlbums = await fetch(`${base}/users/${authorId}/albums`);
  let albums = await resAlbums.json();

  const resAuthor = await fetch(`${base}/users/${authorId}`);
  const author = await resAuthor.json();

  albums = await Promise.all(
    albums.map(async (album) => await fetchAlbum(album.id))
  );

  const authorResult = { albums: albums, authorName: author.name };

  setAuthor && setAuthor(authorResult);
  setLoading && setLoading(false);

  return authorResult;
};