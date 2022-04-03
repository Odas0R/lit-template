const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const groupByArrOfTwo = (array, result) => {
  result = result || [];

  const [first, second] = array;

  if (first && second) {
    const html = [first, second].filter((f) => path.extname(f) === ".html")[0];
    const ts = [first, second].filter((f) => path.extname(f) === ".ts")[0];

    const tuple = [html, ts];

    result = groupByArrOfTwo(array.slice(2), [...result, tuple]);
  }

  return result;
};

const getAllFiles = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

const composeEntriesHtmlPlugin = () => {
  const pageFolderPath = `${__dirname}/src/pages`;

  let entries = {};
  let pages = [];

  const files = groupByArrOfTwo(getAllFiles(pageFolderPath));

  files.map((files) => {
    const [htmlFile, jsFile] = files;

    const pagePath = htmlFile.substring(0, htmlFile.lastIndexOf("/") + 1);

    const entry = path.basename(pagePath);
    const pageDir = pagePath.replace(`${__dirname}/src/pages/`, "");

    entries = {
      ...entries,
      [entry]: {
        import: jsFile,
        filename: "js/[contenthash].js",
        dependOn: "lit"
      },
    };

    pages = [
      ...pages,
      new HtmlWebpackPlugin({
        filename: path.join("pages", pageDir, path.basename(htmlFile)),
        template: htmlFile,
        hash: true,
        chunks: [entry, "lit"],
      }),
    ];
  });

  return [entries, pages];
};

module.exports = composeEntriesHtmlPlugin;
