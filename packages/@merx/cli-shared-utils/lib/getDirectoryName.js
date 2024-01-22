exports.getDirectoryName = function (_path) {
  let dir = '';

  if (_path) {
    const _pathArray = _path.split('/');

    dir = _pathArray[_pathArray.length - 2];
  }

  return dir;
};
