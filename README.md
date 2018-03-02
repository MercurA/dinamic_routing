# Dynamic routing
An attempt to create dynamic routing for an api that uses express and electrolyte.  
## Dependencies

- [express.js](http://expressjs.com/)
- [electrolyte](https://www.npmjs.com/package/electrolyte) v.0.3.0
- [body-parser](https://www.npmjs.com/package/body-parser)

## Usage
Inside your main file.js 
```
const express 	= require('express'),
	routing		= require('./customlib/jsonLoader);
 
 exports = module.exports = () => {
 	let app = express(),
        PORT = process.env.PORT || 3000;
		
	new routing.JsonRouting(app,false).start();
	
	...
 }
```

### Work in Progress...
