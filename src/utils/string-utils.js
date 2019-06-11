export const fileNameReplacement = fileName => {
  const fileNameReplacements = [
    [/"/g, ""],
    [/'/g, ""],
    [/\//g, ""],
    [/\?/g, ""],
    [/:/g, ""],
    [/;/g, ""]
  ];
  fileNameReplacements.forEach(replacement => {
    fileName = fileName.replace(replacement[0], replacement[1]);
  });
  return fileName;
};

export const truncate = (text, max = 35, char = ".") =>
  text.length > max
    ? `${text.substring(0, max)} ${Array(3)
        .fill(char)
        .join("")}`
    : text;
