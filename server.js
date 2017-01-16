const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log file');
		}
	});
	next();
});

// app.use((req, res, next)=>{
// 		res.render('maintainance.hbs', {
// 		pageTitle: 'Maintainance under way. Please try again in couple of minutes',
// 		welcomeMessage: 'Maintanance page'
// 		//currentYear: new Date().getFullYear()
// 	});
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamtIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res)=>{
	//res.send('<h1>Hello Express</h1>');
	// res.send({
	// 	name: 'Hrvoje',
	// 	likes: [
	// 		'Biking',
	// 		'Cities'
	// 	]
	// });
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to the Weather site'
		//currentYear: new Date().getFullYear()
	});
});

app.get('/about', (req, res) => {
	//res.send('About Page');
	res.render('about.hbs', {
		pageTitle: 'About Page'
		//currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to fullfill this request'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});