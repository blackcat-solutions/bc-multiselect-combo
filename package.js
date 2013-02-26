var miniExcludes = {
		"bc-multiselect-combo/CHANGES.md": 1,
		"bc-multiselect-combo/LICENSE": 1,
		"bc-multiselect-combo/README.md": 1,
		"bc-multiselect-combo/package": 1
	},
	isTestRe = /\/test\//;

var profile = {
	resourceTags: {
		test: function(filename, mid){
			return isTestRe.test(filename);
		},

		miniExclude: function(filename, mid){
			return /\/(?:test|demos)\//.test(filename) || mid in miniExcludes;
		},

		amd: function(filename, mid){
			return /\.js$/.test(filename);
		}
	}
};