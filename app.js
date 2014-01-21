'use strict';

var cluster = require('cluster'),
    os = require('os'),
    cpuCount = os.cpus().length;

cluster.setupMaster({
    exec: './app/src/worker.js'
});

//Запускаем процессы по количеству ядер процессора
for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
}

cluster.on('exit', function () {
    cluster.fork();
});
