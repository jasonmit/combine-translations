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
  let translations = {};

  paths.forEach((translationPath) => {
    let locale = path.basename(translationPath, '.yaml');

    if (!translations[locale]) {
      translations[locale] = [];
    }

    translations[locale].push(path.join(inputNode, translationPath));
  });

  return translations;
}

gulp.task('clean', () => {
  return del(['build']);
});

gulp.task('translations:concat', ['clean'], () => {
  let translations = walkTranslations(path.join(paths.translations));
  let tasks = [];

  Object.keys(translations).forEach(key => {
    let translation = translations[key];

    let task = gulp
      .src(translation)
      .pipe(concat(`${key}.yaml`, { newLine: '' }))
      .pipe(yaml({
        space: 2,
        safe: true
      }))
      .pipe(gulp.dest('build'))

    tasks.push(task);
  });

  return merge.apply(this, tasks);
});

gulp.task('default', ['translations:concat'])
