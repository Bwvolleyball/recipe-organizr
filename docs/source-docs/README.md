# About this Folder

Sometimes it isn't feasible to fully craft all documents in GitHub Markdown.  Therefore, this folder is simply a collection
of Microsoft Word Documents that are used to auto generate some of the markdown documents in this repository via `pandoc`.

## Converting a Word Document to Markdown in One Move

### The Problem

A lot of important government documents are created and saved in Microsoft Word (*.docx).
But Microsoft Word is a proprietary format, and it's not really useful for presenting documents on the web.
So, I wanted to find a way to convert a .docx file into markdown.

### Installing Pandoc
On a mac you can use [homebrew](http://brew.sh/) by running the command `brew install pandoc`.

### The Solution

As it turns out, there are several open-source tools that allow for conversion between file types.
[Pandoc](http://pandoc.org/) is one of them, and it's powerful. 
In fact, pandoc's website says "If you need to convert files from one markup format into another,
pandoc is your swiss-army knife." Pandoc can convert from markdown into .docx,
and it also works in the other direction.

### Example

If you have a word document named `test.docx` that you wanted to convert to markdown (`test.md`), you could simply run
this command.

```bash
pandoc -f docx -t markdown -o test.md test.docx
```
This produces a beautiful markdown file with much of the intricate formatting preserved.
