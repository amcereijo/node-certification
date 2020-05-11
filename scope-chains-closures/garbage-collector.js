/*

 Your Mission

In this challenge, you will be required to use Chrome DevTools for detecting
Garbage Collection events. Follow these steps to get a feel for what happens
when Chrome performs its Mark & Sweep algorithm:

1)  Fire up a new tab in Chrome
2)  Open the DevTools > Timeline tab
3)  Ensure the settings are like so: http://i.imgur.com/RMovIw4.png
  a) Frames View is unselected (allows seeing memory graphs)
  b) Flame Chart View is selected (allows seeing where execution time is spent)
  c) Only "Memory" is selected from the options
4)  Click the solid gray record button to begin capturing data
5)  Visit http://www.stackoverflow.com (or your favourite website)
6)  Click the now-red record button to stop capturing data
7)  You should now see something similar to: http://i.imgur.com/ZCNMrI1.png
8)  The part we're interested in is when memory suddenly drops:
    http://i.imgur.com/FyMyRVI.png
9)  Click this drop in memory to select it
10) Now look for the yellow event called "GC Event": http://i.imgur.com/3ieSxIZ.png
11) Clicking this event will reveal information about total memory garbage
    collected, and how long it took.

One particularly interesting thing of note here is the length of time Garbage
Collection can take: Often well beyond the 16ms maximum required to keep it
within a single frame (at 60fps). While garbage collection occurs, it blocks the
main thread, which means other Javascript cannot be executed until the event
completes. Be conscious of how janky your application may become due to
extensive Garbage Collection events!

Note: If you'd like to get that lovely [COMPLETED] label for this lesson,
Run @workshoppers/scope-chains-closures verify
*/
