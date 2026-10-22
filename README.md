# Portfolio

Personal portfolio of Vedha Vishal A. Plain HTML, CSS and JavaScript, no build step.

- `index.html`: the page
- `styles.css`: dark theme by default, light theme from the toggle
- `script.js`: theme toggle, mobile menu, active nav link, copy email
- `assets/`: photo, resume, Doora screenshot, certificate

Contact form: messages are sent through Web3Forms (free, 250 a month).
1. Go to https://web3forms.com, enter vedhavishalarulanand@gmail.com and click "Create Access Key".
2. Copy the key from the email they send you.
3. In `index.html`, replace `YOUR_ACCESS_KEY_HERE` with the key, then push.
Messages arrive in that inbox; hitting Reply answers the sender (their email is set as reply-to).

Run locally: open `index.html` in a browser.

Deploy: push to GitHub, then on vercel.com choose Add New → Project, import the repo,
set Framework Preset to "Other", and click Deploy. Every push to `main` redeploys.
