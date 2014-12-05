# Zenmark.js


[![NPM version](https://badge.fury.io/js/zenmark.svg)](http://badge.fury.io/js/zenmark)

## navigater.json

Json for the list 

There are three arguments for the Object

__name: page name__

__file: markdown file name__

__link: link src__

Your can choose one from 'file' and 'link'

Example:

```javascript
[{
	"name":"Quick start", // page name 
	"file":"index.md" // file name
},
{
	"name":"Document",
	"file":"doc.md"
},
{
	"name":"Github",
	"link":"https://github.com/findyourmagic/zenmark" // link src
}]
```

## theme

There is just one theme util now

```dash
$ git clone -b gh-pages https://github.com/findyourmagic/zenmark.git
```

Images,css and javascripts in '/static'

Header and Footer in '/template'.Just htmls, change the title and other things as you wish

List 'nav.html' is a file of ejs,it is easy to understand

## Todo

Will add more theme soon