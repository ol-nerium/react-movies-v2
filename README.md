modern-normalize is just a CSS file — it doesn’t come with TypeScript types. To
make TypeScript understand imports like import 'modern-normalize';, you can add
a module declaration manually.

Create a declarations.d.ts (or global.d.ts) file in your project root (or inside
src/):

// declarations.d.ts declare module 'modern-normalize';

Then ensure it’s included in your tsconfig.json (tsconfig.app.json here):

{ "include": ["src", "declarations.d.ts"] }
