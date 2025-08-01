import sharp from 'sharp';
import toIco from 'to-ico';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only the most essential sizes that cover all use cases
const FAVICON_SIZES = [
    16,    // Classic favicon, browser tabs
    32,    // Classic favicon, browser tabs (retina)
    180,   // Apple Touch Icon
    192,   // Android Chrome
    512    // PWA splash screen and store listing
];

// ICO sizes - we'll include more resolutions in the ICO file
const ICO_SIZES = [16, 32, 48, 64];

const PUBLIC_DIR = path.join(__dirname, '../public');
const SOURCE_SVG = path.join(PUBLIC_DIR, 'favicon.svg');

async function generateFavicons() {
    try {
        // Ensure the source SVG exists
        await fs.access(SOURCE_SVG);
        
        // Create PNG favicons in different sizes with maximum compression
        for (const size of FAVICON_SIZES) {
            await sharp(SOURCE_SVG)
                .resize(size, size)
                .png({ 
                    compressionLevel: 9,
                    quality: 60,
                    palette: true // Use indexed colors for smaller files
                })
                .toFile(path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`));
            console.log(`✓ Generated ${size}x${size} PNG favicon`);
        }

        // Generate high-quality PNGs for ICO conversion
        const icoBuffers = await Promise.all(
            ICO_SIZES.map(size => 
                sharp(SOURCE_SVG)
                    .resize(size, size, {
                        fit: 'contain',
                        background: { r: 0, g: 0, b: 0, alpha: 0 }
                    })
                    .png({ 
                        compressionLevel: 9,
                        quality: 100, // Maximum quality for ICO
                        palette: false // Don't use indexed colors for better quality
                    })
                    .toBuffer()
            )
        );

        // Convert PNGs to multi-resolution ICO
        const icoBuffer = await toIco(icoBuffers);
        await fs.writeFile(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
        console.log(`✓ Generated ICO favicon with resolutions: ${ICO_SIZES.join(', ')}px`);

        // Generate apple-touch-icon (reuse the 180x180 we already generated)
        await fs.copyFile(
            path.join(PUBLIC_DIR, 'favicon-180x180.png'),
            path.join(PUBLIC_DIR, 'apple-touch-icon.png')
        );
        console.log('✓ Generated apple-touch-icon.png');

        console.log('\nAll favicons generated successfully! 🎉');
    } catch (error) {
        console.error('Error generating favicons:', error);
        process.exit(1);
    }
}

generateFavicons(); 