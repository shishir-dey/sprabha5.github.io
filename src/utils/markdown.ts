// Minimal frontmatter parser for browser environments
// Handles basic YAML strings normally found in simple markdown implementations.
export function parseFrontmatter<T = Record<string, any>>(fileContent: string): { data: T; content: string } {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = fileContent.match(frontMatterRegex);

    if (!match) {
        return { data: {} as T, content: fileContent };
    }

    const frontMatterString = match[1];
    const content = match[2].trim();

    const data: Record<string, any> = {};

    const lines = frontMatterString.split('\n');
    let currentArray: string[] | null = null;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        // Check if it's an array item under a key
        if (trimmedLine.startsWith('- ') && currentArray) {
            currentArray.push(trimmedLine.substring(2).trim().replace(/^['"]|['"]$/g, ''));
            continue;
        }

        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.slice(0, colonIndex).trim();
            const valStr = line.slice(colonIndex + 1).trim();

            if (!valStr) {
                // Assume an array might follow
                currentArray = [];
                data[key] = currentArray;
            } else if (valStr.startsWith('[') && valStr.endsWith(']')) {
                // Inline array
                const items = valStr.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
                data[key] = items;
                currentArray = null;
            } else {
                // Primitive value
                let parsedVal: any = valStr.replace(/^['"]|['"]$/g, '');
                if (parsedVal === 'true') parsedVal = true;
                if (parsedVal === 'false') parsedVal = false;
                data[key] = parsedVal;
                currentArray = null;
            }
        }
    }

    return { data: data as T, content };
}

export interface MarkdownFile {
    slug: string;
    data: Record<string, any>;
    content: string;
}

// Helper to resolve all globbed Vite raw modules into MarkdownFile array
export function loadMarkdownFiles(modules: Record<string, string>): MarkdownFile[] {
    return Object.keys(modules).map(path => {
        // Extract filename without extension for slug
        const slugMatch = path.match(/\/([^/]+)\.md$/);
        const slug = slugMatch ? slugMatch[1] : path;

        const { data, content } = parseFrontmatter(modules[path]);

        return {
            slug,
            data,
            content,
        };
    });
}
