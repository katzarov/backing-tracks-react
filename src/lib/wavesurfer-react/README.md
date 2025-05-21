# Feats

- on region click we highlight it and color it differently.
- region looping feature. when looping is enabled, when a region is being played and it reaches the end, we autoplay it. If disabled, we play the region once, and deselect after its being played.

# Bugs

- https://github.com/katspaugh/wavesurfer.js/issues/3631
- https://github.com/katspaugh/wavesurfer.js/discussions/3173

# Issues and approach to circumvent them

Issue is that "region-out" runs before waveform "click". This creates an issue when we have autoplay.. on region out we are supposed to autoplay the track... but when we click somewhere else on the waveform, that triggers the region out... So we need some way to run regionout cb after the other click callbacks.... and evaluate whether to run the callback or not.. we can do this with a settimeout.. That way our waveform click cb will run first and we can disable the timeout so the autoplay will not run.
Also, we cannot rely on the selectedRegion from the slice since we won't have the newest value of it while we are running our cbs, so we introduce a (outside of react) var to also hold the selected region id.

Right now we gonna do it with keeping an id... but will try cancelling the timer approach later.

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
