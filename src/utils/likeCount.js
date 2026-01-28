function likeCount(isLiked, favoritesCount) {
  if (!isLiked) {
    return { isLiked: true, favoritesCount: favoritesCount + 1 };
  } else {
    return { isLiked: false, favoritesCount: favoritesCount - 1 };
  }
}

export default likeCount;
