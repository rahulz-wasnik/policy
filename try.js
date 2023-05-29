const simpleGit = require('simple-git');
const git = simpleGit.default();

async function gitPrint() {
    try {
        const options = {
            '-n': 1
        };
        const log = await git.log(['-n', '1']);
        console.log(log.latest);
    } catch (error) {
        console.error('In error', error);
    }
}

gitPrint();
