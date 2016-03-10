# ZUID Generator Utility

## Usage in node.js

1. Add to your project's package.json

```
{
  "dependencies": {
    "zuid": "git+ssh://git@github.com:zesty-io/zuid-js.git#master"
  }
}
```

2. Install

```
npm install
```

3. Add to your file

```javascript
const Zuid = require('zuid')

// Generate a ZUID
const newZuidForMediaItem = Zuid.generate(Zuid.prefix.MEDIA_FILE)
```

