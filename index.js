const http = require('http');
const fs = require('fs');
const path = require('path')

const server = http.createServer((req, res) => {
	//destructure request object
	const { method } = req;

	if( method === 'POST'){
		let buffer = ''
		req.on('data', chunk => {
			buffer += chunk.toString('utf8')
		}).on('end', () => {
			const { text } = JSON.parse(buffer);
			fs.appendFile(path.join(__dirname, 'result.txt'), text, (err) => {
				if (err) throw err;
				console.log('appended');
				res.writeHead(200, {'content-type' : 'application/json'})
				res.write(JSON.stringify({result : 'Document updated'}));
				res.end();
			})
		})
	} else {
		fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
			if (err){
				res.writeHead(500);
				res.end(`Server error`);
			}else {
				res.writeHead(200, {'content-type' : 'text/html'})
				res.end(data);
			}
		})
	}
	
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log('running');
})