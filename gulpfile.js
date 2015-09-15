'use strict';

const del = require('del');
const gulp = require('gulp');
const translationConcat = require('./tasks/translation-concat');

gulp.task('clean', () => {
  return del(['build']);
});

gulp.task('translations:concat', ['clean'], function() {
  return translationConcat('translations');
});

gulp.task('default', ['translations:concat'])
