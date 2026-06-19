import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const OUT = 'e:/cctv/screenshots';
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'mobile',  width: 390,  height: 844 },
];

const sections = [
  { id: 'hero',         label: '01_hero' },
  { id: 'monitoring',   label: '02_monitoring' },
  { id: 'products',     label: '03_products' },
  { id: 'global',       label: '04_global' },
  { id: 'solutions',    label: '05_solutions' },
  { id: 'ai-security',  label: '06_ai_security' },
  { id: 'process',      label: '07_process' },
  { id: 'testimonials', label: '08_testimonials' },
  { id: 'contact',      label: '09_contact' },
];

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  console.log(`\n=== ${vp.name} (${vp.width}×${vp.height}) ===`);
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for preloader to finish (it fades out after ~3s)
  await page.waitForTimeout(4000);

  // Full page screenshot (top)
  const fullPath = join(OUT, `${vp.name}_00_fullpage.png`);
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log(`  ✓ Full page → ${fullPath}`);

  // Section-by-section
  for (const section of sections) {
    const el = page.locator(`#${section.id}`);
    const count = await el.count();
    if (count === 0) {
      console.log(`  ✗ #${section.id} NOT FOUND`);
      continue;
    }

    // Scroll into view
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800); // let animations settle

    const sPath = join(OUT, `${vp.name}_${section.label}.png`);
    await el.screenshot({ path: sPath });
    console.log(`  ✓ #${section.id} → ${sPath}`);
  }

  // Navbar screenshot (top of page)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const navPath = join(OUT, `${vp.name}_00_navbar.png`);
  const nav = page.locator('nav');
  await nav.screenshot({ path: navPath });
  console.log(`  ✓ nav → ${navPath}`);

  await page.close();
}

await browser.close();
console.log('\n✅ All screenshots saved to e:/cctv/screenshots/');
