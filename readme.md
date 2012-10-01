#ll.filtrera.js

    By: Lundgren+Lindqvist
    http://dev.lundgrenlindqvist.se

## Introduction

Sorts vast amount of content by a preset list of tags or the users' own search terms. The script finds all content within each item (such as tags, categories or other keywords). It even finds content that is not visible on the screen.

## Usage

By clicking the li's in an initial list called '.sort', or by using the input field The script will look for elements (set using the 'inner' parameter, default is 'tr') within an 'outer' element (default 'table').

While using the input field, the scripts will suggest matches within the '.suggest' list. When selected, these are then pushed to the '.sort' list instead.

If no matching elements are found the script will show the element specified as the 'none' parameter (default is '.none').

Please not that this version of the script can still require a bit of editing yourself. It is recommended to have some experience with jQuery.

## Demo

http://dev.lundgrenlindqvist.se/scripts/filtrera/

## Additional features

The demo uses Johann Burkard's Highlighting plugin. This is an optional feature, if you do not want it, simply do not include the plugin file.