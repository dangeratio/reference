var sources = [
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Curse%20of%20Strahd%20Bestiary.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Hoard%20of%20the%20Dragon%20Queen%20Bestiary.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Monster%20Manual%20Bestiary.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Out%20of%20the%20Abyss.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Phandelver%20Bestiary.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Player%20Bestiary.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Princes%20of%20the%20Apocalypse%20Bestiary.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Storm%20King's%20Thunder.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Tales%20From%20the%20Yawining%20Portal%20Bestiary.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/The%20Rise%20of%20Tiamat%20Bestiary.xml",
	"https://github.com/ceryliae/DnDAppFiles/raw/master/Bestiary/Volo's%20Bestiary.xml",
];

var github_filter = [];
github_filter[0] = ["blob","raw"];
github_filter[1] = ["raw/",""];
github_filter[2] = ["github.com","cdn.rawgit.com"];

function process_sources() {
	for (var i=0; i<sources.length; i++) {
		for (var z=0; z<github_filter.length; z++) {
			sources[i] = sources[i].replace(github_filter[z][0],github_filter[z][1]);
		}
	}
}
