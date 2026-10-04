// Mounts selected React Bits components (https://reactbits.dev, MIT + Commons Clause) into the vanilla-JS tracker.
import { createRoot } from 'react-dom/client';
import BlurText from './BlurText.jsx';
import CountUp from './CountUp.jsx';
import ShinyText from './ShinyText.jsx';

const COMPONENTS = { BlurText, CountUp, ShinyText };
const roots = new WeakMap();
const mq = matchMedia('(prefers-reduced-motion: reduce)');

window.RB = {
  mount(el, name, props) {
    if (!el || !COMPONENTS[name]) return false;
    if (mq.matches) {                       // reduced motion: static text, no animation loops
      this.unmount(el);
      el.textContent = name === 'CountUp' ? String(props.to) : props.text;
      return true;
    }
    let root = roots.get(el);
    if (!root) { root = createRoot(el); roots.set(el, root); }
    const C = COMPONENTS[name];
    root.render(<C {...props} />);
    return true;
  },
  unmount(el) { const r = roots.get(el); if (r) { r.unmount(); roots.delete(el); } }
};
window.dispatchEvent(new Event('rb-ready'));
