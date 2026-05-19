#!/usr/bin/env ts-node

/**
 * SEO Audit Script
 * Validates metadata, schema.org structured data, and SEO best practices
 *
 * Usage: npm run seo:audit
 */

import { glob } from 'glob';
import { readFileSync } from 'fs';
import { join } from 'path';

interface AuditIssue {
  severity: 'error' | 'warning' | 'info';
  file: string;
  message: string;
  line?: number;
}

const issues: AuditIssue[] = [];

function addIssue(issue: AuditIssue) {
  issues.push(issue);
}

// Check for metadata in page files
async function checkMetadata() {
  console.log('\n🔍 Checking metadata...');

  const pageFiles = await glob('src/app/**/page.tsx');

  for (const file of pageFiles) {
    const content = readFileSync(file, 'utf-8');

    // Check for generateMetadata function
    if (!content.includes('generateMetadata')) {
      addIssue({
        severity: 'error',
        file,
        message: 'Missing generateMetadata function',
      });
    }

    // Check for required metadata fields
    if (content.includes('generateMetadata')) {
      if (!content.includes('title:')) {
        addIssue({
          severity: 'error',
          file,
          message: 'Metadata missing title field',
        });
      }

      if (!content.includes('description:')) {
        addIssue({
          severity: 'error',
          file,
          message: 'Metadata missing description field',
        });
      }

      if (!content.includes('openGraph:')) {
        addIssue({
          severity: 'warning',
          file,
          message: 'Metadata missing openGraph field',
        });
      }
    }
  }
}

// Check for structured data (schema.org)
async function checkStructuredData() {
  console.log('\n🔍 Checking structured data...');

  const pageFiles = await glob('src/app/**/page.tsx');

  for (const file of pageFiles) {
    const content = readFileSync(file, 'utf-8');

    // Check for JSON-LD
    if (!content.includes('application/ld+json') && !content.includes('StructuredData')) {
      addIssue({
        severity: 'warning',
        file,
        message: 'No structured data found (schema.org)',
      });
    }

    // Check for required schema types
    if (file.includes('/page.tsx') && !file.includes('[locale]')) {
      if (!content.includes('@type')) {
        addIssue({
          severity: 'info',
          file,
          message: 'Consider adding schema.org type',
        });
      }
    }
  }
}

// Check for alt text on images
async function checkImages() {
  console.log('\n🔍 Checking image alt text...');

  const componentFiles = await glob('src/{app,components}/**/*.tsx');

  for (const file of componentFiles) {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Check for Image components without alt
      if (line.includes('<Image') && line.includes('src=')) {
        if (!line.includes('alt=') && !lines.slice(index, index + 3).join('').includes('alt=')) {
          addIssue({
            severity: 'error',
            file,
            line: index + 1,
            message: 'Image missing alt attribute',
          });
        }
      }

      // Check for img tags without alt
      if (line.includes('<img') && line.includes('src=')) {
        if (!line.includes('alt=')) {
          addIssue({
            severity: 'error',
            file,
            line: index + 1,
            message: 'img tag missing alt attribute',
          });
        }
      }
    });
  }
}

// Check for proper heading hierarchy
async function checkHeadings() {
  console.log('\n🔍 Checking heading hierarchy...');

  const pageFiles = await glob('src/app/**/page.tsx');

  for (const file of pageFiles) {
    const content = readFileSync(file, 'utf-8');

    // Check for h1
    if (!content.match(/<h1[^>]*>/) && !content.includes('className="text-')) {
      addIssue({
        severity: 'warning',
        file,
        message: 'Page may be missing h1 heading',
      });
    }
  }
}

// Check for canonical URLs
async function checkCanonical() {
  console.log('\n🔍 Checking canonical URLs...');

  const pageFiles = await glob('src/app/**/page.tsx');

  for (const file of pageFiles) {
    const content = readFileSync(file, 'utf-8');

    if (content.includes('generateMetadata')) {
      if (!content.includes('canonical:')) {
        addIssue({
          severity: 'warning',
          file,
          message: 'Metadata missing canonical URL',
        });
      }
    }
  }
}

// Main audit function
async function runAudit() {
  console.log('🚀 Starting SEO Audit...\n');
  console.log('═'.repeat(60));

  await checkMetadata();
  await checkStructuredData();
  await checkImages();
  await checkHeadings();
  await checkCanonical();

  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 Audit Results:\n');

  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  const infos = issues.filter(i => i.severity === 'info');

  console.log(`❌ Errors: ${errors.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);
  console.log(`ℹ️  Info: ${infos.length}`);

  if (issues.length === 0) {
    console.log('\n✅ No issues found! Your SEO looks great!\n');
    process.exit(0);
  }

  console.log('\n📋 Issues:\n');

  // Group by file
  const byFile: Record<string, AuditIssue[]> = {};
  issues.forEach(issue => {
    if (!byFile[issue.file]) byFile[issue.file] = [];
    byFile[issue.file].push(issue);
  });

  Object.entries(byFile).forEach(([file, fileIssues]) => {
    console.log(`\n📄 ${file}`);
    fileIssues.forEach(issue => {
      const icon = issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️';
      const location = issue.line ? `:${issue.line}` : '';
      console.log(`  ${icon} ${issue.message}${location}`);
    });
  });

  console.log('\n');

  if (errors.length > 0) {
    console.log('⚠️  Please fix errors before deploying.\n');
    process.exit(1);
  } else {
    console.log('✅ No critical errors found.\n');
    process.exit(0);
  }
}

// Run audit
runAudit().catch(error => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});
