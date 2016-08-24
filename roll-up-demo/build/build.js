var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var npm = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
rollup.rollup({
    entry: 'src/main.js',
    plugins: [
        npm({ jsnext: true, main: true }),
        commonjs(),
        babel()
    ]
}).then(function(bundle) {
    bundle.write({
        format: 'cjs',
        dest: 'dist/test.js'
    });
    rollup.rollup({
        entry: 'src/main.js',
        plugins: [
            npm({ jsnext: true, main: true }),
            uglify(),   // 加入压缩代码
            commonjs(),
            babel()
        ]
    }).then(function(bundle) {
        bundle.write({
            format: 'umd',
            moduleName: 'siLog',
            sourceMap: true,
            dest: 'test.js'
        });
    })
}).catch(function(err){
    console.log(err);
});