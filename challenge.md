# Code Challenge

Create a ReactJS (or Preact) web application with a main app component, and
components for rendering a "live" waveform, and another that starts / stops
the render loop.  The waveform rendering component should render the waveform
as an inline SVG graphic, using a <path> element to draw the waveform shape.

Use the included waveform generator utility to generate the points to render as
a waveform.  The render loop should update at 60 fps when running.

Use the included wireframe and style guide graphics as a reference when designing
your app.

Other Requirements:

- Web page itself must be HTML 5 and use the UTF-8 character set, and "en-US" as
its language.
- The JavaScript portion of the app may be bundled using Babel / Webpack, *or*,
you may include dependencies in a directory, and direclty import them as ES
modules.
- BONUS: Make the app component adaptive to adjust its layout based on screen
dimensions (see wireframe).
