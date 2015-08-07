# QA Report Generator

## Usage

Basic usage:
`qa-report`

Output markdown to file:

`qa-report -o <path to file>`

Choose a preset to run (this can be a path to a preset `.json` file):

`qa-report -p <preset name|path>`

This will output the markdown into a GitHub comment on the specified issue/PR ID:

`qa-report -i <GitHub issue ID>`


## Templates

The 'default' template is based on [https://github.com/clocklimited/wiki/blob/master/guides/QA-Template.md](https://github.com/clocklimited/wiki/blob/master/guides/QA-Template.md).

You can create custom templates based on the default located at [`src/presets/default.json`](https://github.com/clocklimited/qa-report/blob/master/src/presets/default.json).

Additional more permanent templates can be added into `src/presets/` to be referenced by their name, for example `qa-report -p frontend`. The file would be called `frontend.json`.

External preset templates can be used by using a path in `-p` parameter, for example; `qa-report -p ~/Desktop/preset.json`.

## Output

By default the output is piped out into the console for copying into GitHub.

An output file path can be specified using `-o`, for example; `qa-report -o ~/Desktop/qa.md`.
