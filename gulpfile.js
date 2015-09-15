'use strict';

const del = require('del');
const path = require('path');
const gulp = require('gulp');
const yaml = require('gulp-yaml');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const walkSync = require('walk-sync');

const paths = {
  translations: 'translations'
};

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

gulp.task('clean', () => {
  return del(['build']);
});

gulp.task('translations:concat', ['clean'], () => {
  let translations = walkTranslations(path.join(paths.translations));

  let tasks = Object.keys(translations).map(code => {
    return gulp
      .src(translations[code])
      .pipe(concat(`${key}.yaml`))
      .pipe(yaml({
        space: 2,
        safe: true
      }))
      .pipe(gulp.dest('build'))
  });

  return merge.apply(this, tasks);
});

gulp.task('default', ['translations:concat'])
