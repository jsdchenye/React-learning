var start = null;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp -start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 200) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);