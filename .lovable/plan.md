

## Plan: Replace header text with uploaded logo image

### What changes
1. **Copy the uploaded logo** (`Frame_2.png`) to `src/assets/formation-arc-logo.png`
2. **`src/pages/Index.tsx`** — Replace the `<span>The Formation Arc</span>` text in the header with an `<img>` tag importing the logo. Size it to match the previous text height (~26px font = roughly 32-36px image height).
3. **`src/pages/Auth.tsx`** — Replace the `<h1>The Formation Arc</h1>` heading with the same logo image, sized to match the `text-4xl` heading it replaces (~40-44px height), centered.

### Technical details
- Import the image via `import logo from "@/assets/formation-arc-logo.png"`
- Use `height` to constrain the image size, `width: auto` to preserve aspect ratio
- Index header: `<img src={logo} alt="The Formation Arc" className="h-8" />` (~32px)
- Auth page: `<img src={logo} alt="The Formation Arc" className="h-10 mx-auto" />` (~40px)

