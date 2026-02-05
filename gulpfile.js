/// <binding BeforeBuild='npm:run:build' />
var gulp = require("gulp");
var spawn = require("child_process").spawn;

function executeNpm(command, done) {
	var cmd = /^win/.test(process.platform) ? "npm.cmd" : "npm";
	var cmdW = spawn(cmd, command, { stdio: "inherit" });
	cmdW.on("close", function (code) {
		console.log(command + " exited with code " + code);
		done(code);
	});
}

gulp.task("npm:install", function (done) {
	return executeNpm(["install"], done);
});

gulp.task("npm:run:build", function (done) {
	return executeNpm(["run", "build"], done);
});

gulp.task("npm:start", function (done) {
	return executeNpm(["start"], done);
});
