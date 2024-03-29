Introduction
============
Check out [this blog post](https://gregleeds.com/building-a-static-documentation-site-with-metalsmith/) for more details.

Setup Requirements
==================
Everything should install with `npm install` and then `npm run bower`
to download assets.

Also, if you want to use AWS S3 deployment, go and update `/config/aws.json` 
with your account information.


Usage
=====

To build the static site:

`npm run build`

The output will be in `/build`

To do work editing the markdown files:

`npm run www`

Then go to <http://localhost:3000>.  The site will live reload as up updates to markdown files are saved.
If you make changes to any of the other parts of the build pipeline, you will have to restart
the web server to test.

Editing Docs
============
All of the documentation is stored in the directory `/src/markdown` in Markdown files that support
GitHub Markdown syntax.

Images can also be added by adding them to `/src/assets/media`.

Build Pipeline
==============
The docs make use of [Metalsmith](http://www.metalsmith.io/), a plugin based static site generator.
The core Metalsmith configuration and plugin configuration can be found in `/scripts/metalsmith.js`, 
and `build.js` and `www.js` contain extra configurations for the development server
and production generation configurations linked to the NPM run commands in `/package.json`.

Production Deployment
=====================
The contents of the `/build` directory will be copied to 
an AWS S3 bucket by running `npm run deploy`.

Known Issues
============
After saving a change to a markdown file while using `npm run www`, the 
link for the update page in the TOC get's duplicated on the update page,
and every subsequent entry creates another entry. It has something to 
do with this issue: 
https://github.com/segmentio/metalsmith-collections/issues/27
 
