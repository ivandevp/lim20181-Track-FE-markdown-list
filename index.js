const fs = require('fs');
const path = require('path');
const { promisify } = require('util');


const stat = promisify(fs.stat);

const isMarkdown = (file) => /^.*\.md$/.test(file);

const handleError = err =>
    console.log('\x1b[31m', 'An error has occured\n', err.message) ||
    process.exit(1);

const getFiles = directory => {
    console.log(directory);
};

const processFiles = (stats, pathname) => {
    if (stats.isDirectory()) {
        return getFiles(pathname);
    }

    if (stats.isFile()) {
        return pathname;
    }
}

const mdLinks = (pathname, options) =>
    stat(pathname)
        .then(stats => processFiles(stats, path.resolve(pathname)))
        .catch(handleError);
    // const absPath = path.resolve(pathname);
    // console.log(absPath);
    // console.log(isMarkdown(pathname));
    // console.log('Hola', absPath, options);

module.exports = mdLinks;

