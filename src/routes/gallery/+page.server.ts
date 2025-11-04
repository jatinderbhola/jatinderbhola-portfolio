import { readdir } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const staticPath = join(process.cwd(), 'portfolio-images');

    try {
        const files = await readdir(staticPath);

        // Filter for image files
        const imageFiles = files.filter((file) =>
            /\.(jpg|jpeg|png|JPG|JPEG|PNG|webp|WEBP)$/i.test(file)
        );

        // Create gallery items from the images
        const galleryItems = imageFiles.map((file, index) => {
            const baseName = file.replace(/\.[^/.]+$/, ''); // Remove extension
            const formattedTitle = baseName
                .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
                .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

            return {
                id: `image-${index + 1}`,
                type: 'image' as const,
                src: `/portfolio-images/${file}`,
                thumbnail: `/portfolio-images/${file}`,
                title: formattedTitle,
                description: '',
                category: getCategoryFromFilename(baseName)
            };
        });

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

