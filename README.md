# Dynamic routing
An attempt to create dynamic routing for an api that uses express and electrolyte.  
## Dependencies

- [express.js](http://expressjs.com/)
- [electrolyte](https://www.npmjs.com/package/electrolyte) v.0.3.0
- [body-parser](https://www.npmjs.com/package/body-parser)

## Usage
Inside your main file.js 
```
const express 	= require('express');
 
 exports = module.exports = (routing, auth) => {
 	let app = express(),
        PORT = process.env.PORT || 3000;
		
	new routing.JsonRouting(app, auth, false).start();
	
	...
 }
 
exports['@singleton'] = true;
exports['@async] = false;
exports['@require'] = ['lib_folder/jsonRouting', 'lib/authorization'];
```

### Work in Progress...
