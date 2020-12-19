---
title: Beware of Colored Rectangles on LCDs
draft: true
---

When developing Legends.ai, we highly followed the advice of Tufte's [The Visual Display of Quantitative Information][visual-display] and optimized for data density. Our designs use stacked bar graphs whenever displaying relative and absolute magnitude, as opposed to more ubiquitous but much less dense pie charts.

After building our frontend, we noticed many things looked misaligned: squares looked like they had random margins, and the bars on our stacked bar charts simply didn't line up. We first thought this was a Chrome rendering error, but it turned out to be much worse: a fundamental problem in the way LCD's display pixels.

Below is a CSS rendition of the problem:

<style type="text/css">
  .buggybg {
    background-color: #000;
    padding: 5px;
    width: 110px;
  }
  .buggycss {
    position: relative;
    height: 5px;
    width: 100px;
    background-color: red;
  }
  .buggycss.large {
    height: 15px;
    width: 300px;
  }
  .buggycss .green {
    width: 50%;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: green;
  }
  .vbar {
    position: relative;
    width: 5px;
    height: 50px;
  }
  .bartop {
    background-color: red;
  }
  .barbottom {
    background-color: green;
  }
  .vbarbg {
    background-color: black;
    padding: 5px;
    width: 15px;
  }
  .vbar.large {
    width: 15px;
    height: 150px;
  }
</style>

<div class="buggycss"><span class="green"></span></div>

This happens due to the way pixels are implemented on a display.

![(from Wikipedia)][pixel]

If you don't see anything off, you are probably on a high DPI display. But for my large 1440p display and my friend's Retina Macbook, the problem is very clear.

Many effects occur when altering the shapes and colors. If you put a dark background behind the bar, the offset seems to invert.

<div class="buggybg"><div class="buggycss"><span class="green"></span></div></div>

Changing the size of the bar doesn't change the magnitude of the offset, since the problem is still only in one pixel.

<div class="buggycss large"><span class="green"></span></div>

Orienting the bar vertically seems to still have the same problem, but shifted in a different direction.

<div class="vbar bartop"></div><div class="vbar barbottom"></div>

With a black background, again the direction is inverted.

<div class="vbarbg"><div class="vbar bartop"></div><div class="vbar barbottom"></div></div>

The reason this happens is unclear to me. If a pixel consists of parallel strips of color channels, why would a 90 degree turn also have the same problem?

And again, the problem is no more apparent when the figure is enlarged.

<div class="vbar bartop large"></div><div class="vbar barbottom large"></div>

[visual-display]: http://amzn.to/2zI7a3l
[pixel]: https://upload.wikimedia.org/wikipedia/commons/d/de/Closeup_of_pixels.JPG
