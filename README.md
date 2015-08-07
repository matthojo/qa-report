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
