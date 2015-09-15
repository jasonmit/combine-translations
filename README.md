# combine-translations

Given a list of YAML files, it concats them together by filename.

Example:

```
/about
 - en.yaml
 - fr.yaml
 - es.yaml
/settings
 - en.yaml
en.yaml
fr.yaml
es.yaml
```

Will returns 3 files: `en.json, fr.json, es.json`.  Each file will be a sum of its parts.
