#!/usr/bin/env node

/**
 * Generate Prompt Index - Stella Prompt Hub
 * 
 * This script automatically generates a JSON index of all markdown files
 * in the prompts directory. This provides a fallback mechanism when
 * GitHub API is not accessible.
 */

const fs = require('fs');
const path = require('path');

const PROMPTS_DIR = path.join(__dirname, '..', 'prompts');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'prompt-index.json');

function generatePromptIndex() {
    try {
        // Ensure output directory exists
        const outputDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Check if prompts directory exists
        if (!fs.existsSync(PROMPTS_DIR)) {
            console.warn(`⚠️  Prompts directory not found: ${PROMPTS_DIR}`);
            console.log('Creating empty index...');
            
            const emptyIndex = {
                generated: new Date().toISOString(),
                version: '1.0.0',
                prompts: [],
                count: 0
            };
            
            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(emptyIndex, null, 2));
            return;
        }

        // Read all files in prompts directory
        const files = fs.readdirSync(PROMPTS_DIR);
        const markdownFiles = files
            .filter(file => file.endsWith('.md'))
            .sort();

        // Generate enhanced metadata for each file
        const promptsWithMetadata = markdownFiles.map(filename => {
            const filePath = path.join(PROMPTS_DIR, filename);
            const stats = fs.statSync(filePath);
            const content = fs.readFileSync(filePath, 'utf8');
            
            return {
                filename,
                size: stats.size,
                modified: stats.mtime.toISOString(),
                title: extractTitle(content),
                description: extractDescription(content),
                category: extractCategory(content),
                tags: extractTags(content),
                difficulty: extractDifficulty(content),
                wordCount: content.split(/\s+/).length,
                readingTime: Math.ceil(content.split(/\s+/).length / 200) // 200 words per minute
            };
        });

        // Create index object
        const index = {
            generated: new Date().toISOString(),
            version: '1.0.0',
            repository: 'Hyoni1129/Stella-Prompt-Hub',
            prompts: promptsWithMetadata,
            count: promptsWithMetadata.length,
            categories: [...new Set(promptsWithMetadata.map(p => p.category))].sort(),
            totalWordCount: promptsWithMetadata.reduce((sum, p) => sum + p.wordCount, 0)
        };

        // Write index file
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
        
        console.log(`✅ Generated prompt index with ${index.count} prompts`);
        console.log(`📁 Output: ${OUTPUT_FILE}`);
        console.log(`📊 Categories: ${index.categories.join(', ')}`);
        console.log(`📝 Total words: ${index.totalWordCount.toLocaleString()}`);

    } catch (error) {
        console.error('❌ Error generating prompt index:', error);
        process.exit(1);
    }
}

// Helper functions to extract metadata from markdown content
function extractTitle(content) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : 'Untitled Prompt';
}

function extractDescription(content) {
    // Look for description in frontmatter or first paragraph
    const frontmatterMatch = content.match(/^---[\s\S]*?description:\s*([^\n]+)/m);
    if (frontmatterMatch) return frontmatterMatch[1].trim();
    
    // Extract first paragraph after title
    const lines = content.split('\n');
    let titleFound = false;
    
    for (const line of lines) {
        if (line.startsWith('#') && !titleFound) {
            titleFound = true;
            continue;
        }
        
        if (titleFound && line.trim() && !line.startsWith('#')) {
            return line.trim().substring(0, 150) + (line.length > 150 ? '...' : '');
        }
    }
    
    return 'No description available';
}

function extractCategory(content) {
    // Look for category in frontmatter
    const frontmatterMatch = content.match(/^---[\s\S]*?category:\s*([^\n]+)/m);
    if (frontmatterMatch) return frontmatterMatch[1].trim();
    
    // Extract from filename or content
    const filename = arguments[1] || '';
    if (filename.includes('technical') || content.includes('## Technical')) return 'development';
    if (filename.includes('creative') || content.includes('## Creative')) return 'creative';
    if (filename.includes('analysis') || content.includes('## Analysis')) return 'analysis';
    if (filename.includes('writing') || content.includes('## Writing')) return 'writing';
    
    return 'other';
}

function extractTags(content) {
    const frontmatterMatch = content.match(/^---[\s\S]*?tags:\s*\[([^\]]+)\]/m);
    if (frontmatterMatch) {
        return frontmatterMatch[1].split(',').map(tag => tag.trim().replace(/['"]/g, ''));
    }
    return [];
}

function extractDifficulty(content) {
    const frontmatterMatch = content.match(/^---[\s\S]*?difficulty:\s*([^\n]+)/m);
    if (frontmatterMatch) return frontmatterMatch[1].trim();
    
    // Simple heuristic based on content length and complexity
    const wordCount = content.split(/\s+/).length;
    const hasAdvancedTerms = /\b(advanced|complex|sophisticated|nuanced)\b/i.test(content);
    
    if (wordCount > 1000 || hasAdvancedTerms) return 'Advanced';
    if (wordCount > 500) return 'Intermediate';
    return 'Beginner';
}

// Run the script
if (require.main === module) {
    generatePromptIndex();
}

module.exports = { generatePromptIndex };
