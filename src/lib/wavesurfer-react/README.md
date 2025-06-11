# Feats

- on region click we highlight it and color it differently.
- region looping feature. when looping is enabled, when a region is being played and it reaches the end, we autoplay it. If disabled, we play the region once, and deselect after its being played.

- right now when it comes to the binding... there is a mix of a lot of approaches - too many actually! Some of the state is with useState, or slice or useSyncExternalStore... Also, using the useImperativeHandle in this way is really not necessary. Calling methods on the instance is done in different ways.. TODO: Need to consolidate all of that and make is simpler. and use react context for the instance and its state and methods.

# Bugs

- https://github.com/katspaugh/wavesurfer.js/issues/3631
- https://github.com/katspaugh/wavesurfer.js/discussions/3173

# Issues and approach to circumvent them

Issue is that "region-out" runs before waveform "click". This creates an issue when we have autoplay.. on region out we are supposed to autoplay the track... but when we click somewhere else on the waveform, that triggers the region out... So we need some way to run regionout cb after the other click callbacks.... and evaluate whether to run the callback or not.. we can do this with a settimeout.. That way our waveform click cb will run first and we can disable the timeout so the autoplay will not run.
Alternatively, maybe I can do a patch package to change the order of the callbacks in wavesurfer lib.. or make a new PR with a new region-out event that runs after click..

# Custom styling

- Wavesurfer js is a web component with an open shadow root.
- There are some styles you can pass via JS when you are iniitally creating the component and also some very limited styling opts later you can do - again via JS.
- Wavesurfer also exposes certain elemnts via the part API, so we can style them - it does give me what I need but, the issue is - I want to introduce some conditional styling.

https://wavesurfer.xyz/docs/#md:css-styling

https://wavesurfer.xyz/examples/?styling.js

So I see couple options:

- add custom part attributes based on conditions. This is then exposed outside of the shadow dom, so I can very easily target it.
- add css classes to the elemnts based on condition. Since open shadow root, we can add our custom css styles at the shadow root, but we cannot target it from outside.
- do my custom styling with just JS.

## Expose conditional state by adding custom part attributes

- we are doing this.
- Potential issue is that a future version of the library might just set the part attribute to somehting discarding my changes.

## Add our custom classes to shadow root

- On player mount, we can just add a style element to the shadow root, and the add classnames to the elements - regions.
- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM#applying_styles_inside_the_shadow_dom

- Potential issue is that a future version of the library might just set the classnames to somehting else discarding my changes.

# Testing

TODO - I really want to write some tests for that. But I have some setup work to do first.

refresh page
create 2 regions

first - regino
middle - no region, just the waveform
second - region

in play mode

- click frist region, then click second - they should select tjemselves and deslect on region out
- clifk first then middle - it should select first and then deselct
- clifk first, then allow to play through - it should deselct its color on region out

in loop mode

- clikc frst, then second. voth should loop and color on selection
- cloick frst, then middle it should disable selected and not loop anything
- selecd second regio and loop it.. then disable looping, then select middle and start playing, then select loooping while we still havent gone to hte region,

mixed

- in play mode, strat playing middle
- then enbale loop while we stil havent reached the region
- region should not loop as it is not selected

overlapped regions

- small region fully withing wider region, make sure hightlist and autolays work, with and without looping enabled

- ovelapped shifted - end of first region is within the second region. make sure play and autoplay works.
