#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');
const mdLinks = require('./index');


if (require.main === module) {
    program
        .version(pkg.version, '-v, --version')
        .description('Markdown links finder')
        .usage('<path-to-file> [options]')
        .option('--stats', 'Calcula los stats de de los links encontrados en el archivo')
        .option('--validate', 'Valida si los links existen o no')
        .parse(process.argv);


    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }

    let opts = {};

    if (program.args.length) {
        if (program.stats) {
            opts = { stats: true };
        }

        if (program.validate) {
            opts = { ...opts, validate: true };
        }

        mdLinks(program.args[0], Object.keys(opts).length ? opts : null);
    }
}