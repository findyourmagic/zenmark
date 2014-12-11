module.exports = function (message) {
    var os = require('os'),
    fs = require('fs'),
    ejs = require('ejs'),
    dir = process.cwd(),
    marked = require('marked'),
    path = require('path'),
    contentPath = path.join(dir, '/markdown'),
    templatePath = path.join(dir, '/template'),
    fileList = [],
    header = '',
    footer = '',
    navData = require(path.join(dir, '/navigater.json')),
    nav = '';

    var isMarkdown = function(file){
        return (path.extname(file) == '.md' || path.extname(file) == '.markdown');
    },
    getFiles = function(cb){
        fs.readdir(contentPath, function(err, list){
            if (err) {
                return console.log(err);
            }
            fileList = list.filter(isMarkdown);
            if (fileList.length) {
                fileList.forEach(function(item){
                    readFile(item);
                });
            }
        });
    },
    readFile = function(file){
        fs.readFile(path.join(contentPath, file), 'utf8', function(err, data){
            if (err) {
                return console.log(err);
            }
            saveFile(data, file);
        });
    },
    saveFile = function(data, file){
        var data = header + nav + marked(data) + footer;
        fs.writeFile(path.join(dir, file.replace(/.(?:md)|(?:markdown)$/,'.html')), data, function(err){
            if (err) {
                return console.log(err);
            }
        });
    },
    getHeader = function(){
        header = fs.readFileSync(path.join(templatePath,'/header.html'), 'utf8');
    },
    getFooter = function(){
        footer = fs.readFileSync(path.join(templatePath, '/footer.html'), 'utf8');
    },
    getNav = function(){
        nav = fs.readFileSync(path.join(templatePath, '/nav.html'), 'utf8');
        nav = ejs.render(nav, {items: navData});
    },
    init = function(){
        marked.setOptions({
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });
        getHeader();
        getNav();
        getFooter();
        getFiles();
        console.log('Success.');
    }
    init();
};