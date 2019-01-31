import chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
let watcher = chokidar.watch('C:\\Users\\ranger\\Desktop\\C1\\blockchain\\c_server\\data\\converted\\', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
  //console.log(event, path);
});

watcher.on('change',(path,stats)=>{
	if (stats) console.log(`File ${path} changed size to ${stats.size}`);
});
