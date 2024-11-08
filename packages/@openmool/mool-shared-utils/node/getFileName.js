exports.getFileName = function (_path) {
  let filename = '';

  if (_path) {
    const _pathArray = _path.split('/');

    filename = _pathArray[_pathArray.length - 1];
  }

  return filename;
};
