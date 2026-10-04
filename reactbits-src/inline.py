"""Re-inlines ../reactbits.js into ../index.html between the RB markers. Run after `npm run build`."""
import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
html = (root/'index.html').read_text()
js = (root/'reactbits.js').read_text().replace('</script', '<\\/script')
new = '<!--RB-START-->\n<script>\n' + js + '\n</script>\n<!--RB-END-->\n'
html, n = re.subn(r'<!--RB-START-->.*?<!--RB-END-->\n', lambda m: new, html, flags=re.S)
assert n == 1, 'markers not found'
(root/'index.html').write_text(html)
print('inlined', len(js), 'bytes')
