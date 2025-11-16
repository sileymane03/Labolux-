const fs = require('fs')
const pages = ['', 'boutique', 'contact', 'a-propos', 'faq'] // ajoute dynamiquement tes pages
const baseUrl = 'https://labolux.vercel.app'
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `<url><loc>${baseUrl}/${p}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('\n')}
</urlset>`
fs.writeFileSync('public/sitemap.xml', sitemap)
console.log('Sitemap generated')
node scripts/generate-sitemap.js
