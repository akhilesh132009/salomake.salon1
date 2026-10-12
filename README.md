# Salomake Unisex Salon & Academy website

A responsive, luxury-themed salon website built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — page structure and content
- `style.css` — responsive styling, theme and animations
- `script.js` — navigation, service filters, booking enquiry, WhatsApp and gallery lightbox
- `assets/` — place your own salon photos here (optional)

## Run on Linux
1. Extract `salomake-website.zip`.
2. Open the `salomake-website` folder in VS Code.
3. Open `index.html` in a browser, or install the **Live Server** extension in VS Code.
4. Right-click `index.html` → **Open with Live Server**.

You can also open a terminal inside the folder and run:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Before publishing
1. Verify the phone number, WhatsApp number, full address and opening hours with the salon.
2. In `script.js`, update `WHATSAPP_NUMBER` to the verified international number (digits only, e.g. `91` + 10-digit mobile number).
3. Replace the illustrative stock photos with the salon's real photos. Current photos load from Unsplash and require internet access.
4. Verify the map pin and connect real social media / Google review links if available.
5. The form sends an enquiry to WhatsApp; it does **not** store data in a database or automatically confirm appointments.
6. Add a proper privacy policy and terms before collecting customer information in production.

## Publish free
You can publish the folder using GitHub Pages or Netlify. Upload the project files, set the site root to the folder containing `index.html`, and deploy.
