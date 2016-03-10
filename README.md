# ZUID Generator Utility

## Usage in node.js

1. Install

  ```
  npm install --save zesty-io/zuid-js
  ```

2. Add to your file

  ```javascript
  const Zuid = require('zuid')
  
  // Generate a ZUID
  const newZuidForMediaItem = Zuid.generate(Zuid.prefix.MEDIA_FILE)
  ```

