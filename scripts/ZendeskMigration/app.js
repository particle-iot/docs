
// Example usage:
// export ZENDESK_USER=user@particle.io
// export ZENDESK_API_TOKEN=xxxx
// node app.js support/general/pricing.md
// node app.js support/particle-devices-faq/finding-device-id.md

const path = require('path'); 
const fs = require('fs');

// https://www.npmjs.com/package/mime-types
var mime = require('mime-types');

// https://github.com/form-data/form-data#readme
var FormData = require('form-data');

// https://github.com/markdown-it/markdown-it#markdown-it
var md = require('markdown-it')({
	html: true,
	xhtmlOut: true
});

var defaultRenderLinkOpen = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
	return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
	// console.log('link_open called', tokens[idx]);
	
	var hrefIndex = tokens[idx].attrIndex('href');
	if (hrefIndex >= 0) {
		var href = tokens[idx].attrs[hrefIndex][1];
		
		if (href.startsWith('/')) {
			// Docs relative URL
			tokens[idx].attrs[hrefIndex][1] = 'https://docs.particle.io' + href;
		}
	}
	
	return defaultRenderLinkOpen(tokens, idx, options, env, self);
};

var defaultRenderImage = md.renderer.rules.image || function(tokens, idx, options, env, self) {
	return self.renderToken(tokens, idx, options);
};

md.renderer.rules.image = function (tokens, idx, options, env, self) {
	var token = tokens[idx],
	srcIndex = token.attrIndex('src');

	if (srcIndex >= 0) {
		const src = token.attrs[srcIndex][1];
		console.log('image: src=' + src);
		
		if (src.startsWith('/assets')) {
			// Docs image
			if (!config.pages[relativePath].attachments) {
				config.pages[relativePath].attachments = {};
			}
			if (!config.pages[relativePath].attachments[src]) {
				// We have not converted this attachment before
				config.pages[relativePath].attachments[src] = {};
				
				console.log('new attachment ' + src);
				attachmentsToConvert.push(src);
			}
			else {
				// Use existing URL
				token.attrs[srcIndex][1] = config.pages[relativePath].attachments[src].content_url;
				console.log(' updated to ' + config.pages[relativePath].attachments[src].content_url);
			}
		}
	}
	
	// pass token to default renderer.
	return defaultRenderImage(tokens, idx, options, env, self);
};

// https://handlebarsjs.com/
const Handlebars = require("handlebars");


// md-file should be the path relative to content, for example: support/general/pricing.md
const argv = require('yargs')
.usage('Usage: $0 [options] <md-files...>')
.argv;


const ZENDESK_URL = 'https://particle.zendesk.com';

const ZENDESK_API_TOKEN = process.env.ZENDESK_API_TOKEN;
if (!ZENDESK_API_TOKEN) {
	console.log('ZENDESK_API_TOKEN must be defined in the enviromnent to run this script');
	process.exit(1);
}

const ZENDESK_USER = process.env.ZENDESK_USER;
if (!ZENDESK_USER) {
	console.log('ZENDESK_USER must be the user email for the API token');
	process.exit(1);
}


const srcPath = path.resolve(__dirname, '../../src');
const assetsPath = path.join(srcPath, 'assets');
const contentPath = path.join(srcPath, 'content');

const configPath = path.join(__dirname, 'config.json');

let config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

let handlebarsEnv = {};

let articleId = 0;
let relativePath; // key to config.pages
let relativeDir; // key to config.sections
let attachmentsToConvert = [];
let template;
let html;

// Axios is used for making direct API calls instead of using node-zendesk 
const axios = require('axios').default; // https://github.com/axios/axios

let axiosConfig = {
	auth:{
		username:ZENDESK_USER + '/token',
		password:ZENDESK_API_TOKEN,
	}
};


var mdFiles = [];

for(var ii = 0; ii < argv._.length; ii++) {
	// processFile(argv._[ii]);
	
	// Argument can be one (or more) files or directories. For directories, all md files in the directory will be updated.
	// node app.js ../../src/content/support/general/pricing.md
	// node app.js ../../src/content/support/general
	
	const fileOrDir = path.join(__dirname, argv._[ii]);
	
	var stat = fs.statSync(fileOrDir);
	if (stat.isDirectory()) {
		var files = fs.readdirSync(fileOrDir);
		for(var ii = 0; ii < files.length; ii++) {
			if (files[ii].endsWith('.md')) {
				// console.log(files[ii]);
				mdFiles.push(path.join(fileOrDir, files[ii]));
			}
		}
	}
	else 
	if (stat.isFile()) {
		mdFiles.push(fileOrDir);		
	}
	else {
		console.log('file not found ' + mdFile);
		process.exit(1);
	}
}

if (mdFiles.length == 0) {
	console.log('no files specified');
	process.exit(1);	
}


// updateArticleURLs();
processFile();


// Normally not used, only used to backfill the html_url field
async function updateArticleURLs() {
	// GET /api/v2/help_center/{locale}/articles.json
	const url = ZENDESK_URL + '/api/v2/help_center/en-us/articles.json';
	
	try {
		const apiResult = await axios.get(url, axiosConfig);
	
		//console.log('api', apiResult);
		
		if (apiResult.status == 200) { // Created
			for(var ii = 0; ii < apiResult.data.articles.length; ii++) {
				const articleId = apiResult.data.articles[ii].id;
				for(const prop in config.pages) {
					if (config.pages[prop].articleId == articleId) {
						// console.log("articleId=" + articleId + " html_url=" + apiResult.data.articles[ii].html_url);
						config.pages[prop].html_url = apiResult.data.articles[ii].html_url;
					}
				}
			}
			saveConfig();				
		}	
		else {
			console.log('request failed ' + apiResult.status + ' ' + apiResult.statusText);
			process.exit(1);
		}
	}
	catch(e) {
		console.log('api request failed', e);
		process.exit(1);
	}
	
}


async function processFile() {
	if (mdFiles.length == 0) {
		// Done!
		console.log('completed!');
		process.exit(0);	
	}
	attachmentsToConvert = [];
	handlebarsEnv = {
			assets:"/assets"
	};
	
	
	const mdFilePath = mdFiles.shift();
	
	// Relative path should be the filename in src/content without the leading slash
	// Example: support/particle-devices-faq/wpa2-enterprise.md
	const relIndex = mdFilePath.indexOf('src/content/');
	if (relIndex < 0) {
		console.log('could not decode path ' + mdFilePath);
		process.exit(1);
	}
	relativePath = mdFilePath.substr(relIndex + 12);
	
	
	// Does not contain leading or trailing slash, matches key in sections in config
	relativeDir = path.dirname(relativePath);

	console.log('processing relativePath=' + relativePath);

	if (!config.sections[relativeDir]) {
		console.log('section not defined in config.json for ' + relativeDir);
		process.exit(1);	
	}

	// Has this page been processed?
	if (!config.pages[relativePath]) {
		console.log('new page ' + relativePath);
		config.pages[relativePath] = {};
		// saveConfig();
	}
	
	// Is this set to ignore?
	if (config.pages[relativePath]['ignorePage']) {
		console.log('ignoring page ' + relativePath);
		processFile();
		return;
	}
		

	const sectionId = config.sections[relativeDir].id;
	const authorId = config.sections[relativeDir].author;
	console.log('sectionId=' + sectionId + ' authorId=' + authorId);
	
	const mdFile = path.join(contentPath, relativePath);

	let mdContent = fs.readFileSync(mdFile, 'utf8')

	let desc = {};


	let offset1 = mdContent.indexOf('---');
	if (offset1 >= 0) {
		offset1 += 4;
		let offset2 = mdContent.indexOf('---', offset1);
		if (offset2 >= 0) {
			const descBlock = mdContent.substr(offset1, offset2 - offset1);
			
			descBlock.split(/\n/).forEach(function(line) {
				// console.log('desc line ' + line);
				const colonIndex = line.indexOf(':');
				if (colonIndex >= 1) {
					const key = line.substr(0, colonIndex).trim();
					const value = line.substr(colonIndex + 1).trim();
					desc[key] = value;
				}
			});
			mdContent = mdContent.substr(offset2 + 4); 
		}
	}
	console.log('title=' + desc['title']);
	handlebarsEnv.title = desc['title'];
	
	// Before parsing the 
	if (!config.pages[relativePath]['articleId']) {
		const url = ZENDESK_URL + '/api/v2/help_center/en-us/sections/' + sectionId + '/articles.json';
		
		try {
			// Create placeholder article
			let articleObj = {
					"article": {
						"translations": [
							{
								"locale": "en-us",
								"title": desc['title'],
								"body": "placeholder"
							}
						],
						"user_segment_id": config['user_segment_id'],
						"permission_group_id": config['permission_group_id'],
						"author_id": authorId,
						"draft":true // <- this does not seem to work
					},
					"notify_subscribers": false
			};

			const apiResult = await axios.post(url, articleObj, axiosConfig);
		
			//console.log('api', apiResult);
			
			if (apiResult.status == 201) { // Created
				articleId = apiResult.data.article.id;
				console.log('articleId=' + articleId);
				
				config.pages[relativePath]['articleId'] = articleId;
				config.pages[relativePath]['html_url'] = apiResult.data.article.html_url;
				saveConfig();				
			}	
			else {
				console.log('request failed ' + apiResult.status + ' ' + apiResult.statusText);
				process.exit(1);
			}
		}
		catch(e) {
			console.log('api request failed', e);
			process.exit(1);
		}
		
		// apiResult.status
		// apiResult.headers
		// apiResult.data
	}
	else {
		articleId = config.pages[relativePath]['articleId'];
		console.log('using already created articleId=' + articleId);
	}
	
	// Article has been created (either just now, or earlier)
	
	// Handle Handlebars/Mustache escapes
	template = Handlebars.compile(mdContent);
	
	// Render resulting Markdown into HTML
	html = md.render(template(handlebarsEnv));
	
	// console.log(html);
	
	uploadAttachments();
}

async function uploadAttachments() {
	if (attachmentsToConvert.length == 0) {
		finishFile();
		return;
	}
	
	const src = attachmentsToConvert.shift();
	
	const contentType = mime.lookup(src) || 'application/octet-stream';

	console.log('processing attachment ' + src + ' contentType=' + contentType);
	
	const imageFile = fs.readFileSync(path.join(srcPath, src));

	//const imageFileBase64 = imageFile.toString('base64');
	
	var form = new FormData();
	form.append('file', imageFile, {
		filename:path.basename(src),
		header:{
			'Content-Transfer-Encoding': 'binary', 
			'Content-Type':contentType,
			'Content-Length':imageFile.length
		}
	});


	// POST /api/v2/help_center/articles/{article_id}/attachments.json
	const url = ZENDESK_URL + '/api/v2/help_center/articles/' + articleId + '/attachments.json';

	var tempConfig = JSON.parse(JSON.stringify(axiosConfig));
	tempConfig.headers = { 'content-type': 'multipart/form-data; boundary="' + form.getBoundary() + '"' };

	//console.log('form', form.getBuffer().toString());


	try {
		const apiResult = await axios.post(url, form.getBuffer(), tempConfig)
		if (apiResult.status == 201) { // Created
			console.log("apiResult.data=", apiResult.data);
			
			const attachmentId = apiResult.data.article_attachment.id;
			const content_url = apiResult.data.article_attachment.content_url;
			console.log('attachmentId=' + attachmentId + ' content_url=' + content_url);

			config.pages[relativePath].attachments[src].attachmentId = attachmentId;
			config.pages[relativePath].attachments[src].content_url = content_url;

			saveConfig();		
			
			if (attachmentsToConvert.length == 0) {
				// Parse file again to re-generate attachment links
				html = md.render(template(handlebarsEnv));
			}
			
			uploadAttachments();
		}
		else {
			console.log('request failed ' + apiResult.status + ' ' + apiResult.statusText);
			process.exit(1);
		}
	}
	catch(e) {
		console.log('api request failed', e);
		process.exit(1);
	}

}

async function finishFile() {
	
	if (true) {
		// Update article text
		const articleId = config.pages[relativePath]['articleId'];
		
		// PUT /api/v2/help_center/articles/{article_id}/translations/{locale}.json
		const url = ZENDESK_URL + '/api/v2/help_center/articles/' + articleId + '/translations/en-us.json';
		try {

			const articleObj = {
				"translation":{
					"body":html
				}
			};
			
			const apiResult = await axios.put(url, articleObj, axiosConfig);
		
			//console.log('api', apiResult);
			
			if (apiResult.status == 200) { // 
				console.log("successfully updated");
				
				processFile();
			}	
			else {
				console.log('request failed ' + apiResult.status + ' ' + apiResult.statusText);
				process.exit(1);
			}
		}
		catch(e) {
			console.log('api request failed', e);
			process.exit(1);
		}

	}
	
}

function saveConfig() {
	
	const configText = JSON.stringify(config, null, 2);
	
	fs.writeFileSync(configPath, configText);
}
