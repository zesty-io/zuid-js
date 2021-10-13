# ZUID Generator Utility

Nano second precision acheived with [NodeJS `process.hrtime`](https://nodejs.org/api/process.html#process_process_hrtime_time).

## Usage in node.js

1. Install

  ```
  npm install --save zesty-io/zuid-js
  ```

2. Test

	```
	npm test
	```

3. Add to your file

  ```javascript
  const Zuid = require('zuid')

  // Generate a ZUID
  const newZuidForMediaItem = Zuid.generate(Zuid.prefix.MEDIA_FILE)
  ```

