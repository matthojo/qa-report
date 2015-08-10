# QA Report Generator

![](https://cloud.githubusercontent.com/assets/367517/9138162/0ba5f124-3d1a-11e5-9f52-377b9029ed8e.gif)

## Install

`npm install -g qa-report`

## Usage

Basic usage:
`qa-report`

Output markdown to file:

`qa-report -o <path to file>`

Choose a preset to run (this can be a path to a preset `.json` file):

`qa-report -p <preset name|path>`

Using these options together will output the markdown into a GitHub comment on the specified issue:

`qa-report -i <GitHub PR/Issue ID> -r <owner>/<repoName>`

You will need to have a config file at `~/.qa-report.json` for this to work, containing a GitHub Access Token
and the username to post for. It should look something like:

```json
{
  "token": "thisismytoken",
  "user": "benjaminparnell"
}
```

You can create a GitHub access token [here](https://github.com/settings/tokens).

## Templates

The 'default' template is based on [https://github.com/clocklimited/wiki/blob/master/guides/QA-Template.md](https://github.com/clocklimited/wiki/blob/master/guides/QA-Template.md).

You can create custom templates based on the default located at [`src/presets/default.json`](https://github.com/clocklimited/qa-report/blob/master/src/presets/default.json).

Additional more permanent templates can be added into `src/presets/` to be referenced by their name, for example `qa-report -p frontend`. The file would be called `frontend.json`.

External preset templates can be used by using a path in `-p` parameter, for example; `qa-report -p ~/Desktop/preset.json`.

## Output

By default the output is piped out into the console for manual copying into GitHub.

An output file path can be specified using `-o`, for example; `qa-report -o ~/Desktop/qa.md`.

Alternatively you can output directly to a GitHub comment with `-i` being the PR / issue number and `-r` for the repository. Example; `qa-report -i 1 -r clocklimited/qa-report`.
