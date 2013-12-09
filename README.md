# Demo

[View demo](http://artsy.github.io/artsy-iconfont/output/demo.html)

# Editing the icon font

## Preparing artwork

A template for a 32x32px grid can be found in the directory `templates`.

In Illustrator: turn on `View > Show Grid` and `View > Snap to Grid`. Guides are placed to form a 20x20px box at the center of the template. The majority of the icons sit within this box. Aim to have points terminate at complete pixel values whenever possible.

A script for exporting all open documents to SVGs is include in the root directory (`SVGs.jsx`).

## Managing the font

The font itself is currently managed through the service http://icomoon.io/ (The login can be found in KeePass). All interface icons should be added to the icon font 'artsy-iconfont'.

* Login to IcoMoon
  * The project is titled 'Artsy Iconfont'
* In the project icons are grouped into categories; currently 'Social', 'Interface', 'Logotype' and 'Logo'
  * Import your SVGs to the appropriate sets
* Click through to 'Font', edit any of the names and 'Download'
  * This will provide you with a `.zip` file containing the font files (`.eot`, `.svg`, `.ttf`, `.woff`) and CSS
    * Replace the contents of `/output` with the contents of the `.zip`

There is most definitely room for improvement in this workflow; suggestions welcome.
