#!/usr/bin/env node
'use strict';

const meow = require('meow');
const gitviz = require('./');
const Watcher = require('./lib/watcher.js');

const helpText = `
Usage
  $ gitviz [options] PATH

Options
  -w, --watch  watch the PATH for filechanges

Examples
  $ gitviz /path/to/git/project
`;

const cli = meow(helpText, {
  flags: {
    watch: {
      type: 'boolean',
      alias: 'w'
    }
  }
});

const path = cli.input[0] || process.cwd();

if (cli.flags.watch) {
  new Watcher(path).on('ping', () => {
    gitviz(path);
  });
}

gitviz(path);
