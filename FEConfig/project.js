function getConfig(paths) {
	return {
		'source': {
			'styles':  paths.root + paths.asset_raw + paths.sass
		},
		'build': {
			'root':      paths.root + paths.build,
			'styles':    paths.root + paths.asset_built + paths.styles
		}
	};
}

module.exports.getConfig = getConfig;