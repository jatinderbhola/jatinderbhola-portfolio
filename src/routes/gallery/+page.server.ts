import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';

const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;

async function collectImagePaths(dir: string, base = ''): Promise<{ relativePath: string; fullPath: string }[]> {
    const entries = await readdir(dir, { withFileTypes: true });
    const result: { relativePath: string; fullPath: string }[] = [];
    for (const e of entries) {
        const rel = base ? `${base}/${e.name}` : e.name;
        const full = join(dir, e.name);
        if (e.isDirectory()) {
            const sub = await collectImagePaths(full, rel);
            result.push(...sub);
        } else if (IMAGE_EXT.test(e.name)) {
            result.push({ relativePath: rel, fullPath: full });
        }
    }
    return result;
}

export const load: PageServerLoad = async () => {
    const projectRoot = process.cwd();
    const staticPath = join(projectRoot, 'static', 'portfolio-images');

    try {
        const imagePaths = await collectImagePaths(staticPath);

        const itemsWithDate = await Promise.all(
            imagePaths.map(async ({ relativePath, fullPath }) => {
                const baseName = relativePath.replace(/\.[^/.]+$/, '').split('/').pop() ?? '';
                const formattedTitle = baseName
                    .replace(/[-_]/g, ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase());
                let date = new Date(0);
                try {
                    const st = await stat(fullPath);
                    date = st.mtime;
                } catch {
                    // use epoch if stat fails
                }
                return {
                    relativePath,
                    title: formattedTitle,
                    category: getCategoryFromFilename(baseName),
                    date: date.toISOString()
                };
            })
        );

        // Sort by date descending (newest first)
        itemsWithDate.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const galleryItems = itemsWithDate.map((item, index) => ({
            id: `image-${index + 1}`,
            type: 'image' as const,
            src: `/portfolio-images/${item.relativePath}`,
            thumbnail: `/portfolio-images/${item.relativePath}`,
            title: item.title,
            description: '',
            category: item.category,
            date: item.date
        }));

        return {
            galleryItems
        };
    } catch (error) {
        console.error('Error loading gallery images:', error);
        return {
            galleryItems: []
        };
    }
};

function getCategoryFromFilename(filename: string): string {
    const lowerFilename = filename.toLowerCase();

    if (lowerFilename.includes('panelist')) {
        return 'Panel Discussions';
    }
    if (lowerFilename.includes('hackathon') || lowerFilename.includes('winner')) {
        return 'Achievements';
    }
    if (lowerFilename.includes('speaker')) {
        return 'Speaker Sessions';
    }
    if (lowerFilename.includes('project') || lowerFilename.includes('portfolio')) {
        return 'Projects';
    }

    return 'Gallery';
}

