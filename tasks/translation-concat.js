'use strict';

const path = require('path');
const gulp = require('gulp');
const yaml = require('gulp-yaml');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const walkSync = require('walk-sync');

function walkTranslations(inputNode) {
  let paths = walkSync(inputNode, ['**/*.yaml']);

	return paths.reduce((translations, translationPath) => {
		let code = path.basename(translationPath, '.yaml');

    if (!translations[code]) {
      translations[code] = [];
    }

    translations[code].push(path.join(inputNode, translationPath));
		return translations;
	}, {});
}


module.exports = function(inputNode) {
	let translations = walkTranslations(path.join(inputNode));

  let tasks = Object.keys(translations).map(code => {
    return gulp
      .src(translations[code])
      .pipe(concat(`${code}.yaml`))
      .pipe(yaml({
        space: 2,
        safe: true
      }))
      .pipe(gulp.dest('build'))
  });

  return merge.apply(this, tasks);
};
