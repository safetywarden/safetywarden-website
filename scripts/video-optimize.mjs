import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const [, , command = 'help', ...args] = process.argv;

const defaults = {
  input: 'public/assets/videos/raw/field_execution_raw.mp4',
  hero: 'public/assets/videos/hero/field_execution_hero.mp4',
  demo: 'public/assets/videos/edited/field_execution_demo.mp4',
  compressed: 'public/assets/videos/edited/field_execution_compressed.mp4',
  trimmed: 'public/assets/videos/edited/field_execution_trimmed.mp4',
  speed: 'public/assets/videos/edited/field_execution_speed.mp4'
};

const options = parseArgs(args);

const recipes = {
  hero: {
    description: 'Create a muted 10-18 second homepage loop optimized for autoplay.',
    input: options.input || defaults.input,
    output: options.output || defaults.hero,
    ffmpeg: [
      '-y',
      '-ss', options.start || '00:00:02',
      '-t', options.duration || '00:00:16',
      '-i', options.input || defaults.input,
      '-an',
      '-vf', `setpts=${speedToSetpts(options.speed || '1.5')},scale=1080:-2,fps=30`,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', options.crf || '24',
      '-movflags', '+faststart',
      '-pix_fmt', 'yuv420p',
      '-profile:v', 'high',
      '-level', '4.1',
      options.output || defaults.hero
    ]
  },
  demo: {
    description: 'Create a 30-60 second product story demo with smooth SaaS pacing.',
    input: options.input || defaults.input,
    output: options.output || defaults.demo,
    ffmpeg: [
      '-y',
      '-ss', options.start || '00:00:00',
      '-t', options.duration || '00:00:50',
      '-i', options.input || defaults.input,
      '-an',
      '-vf', `setpts=${speedToSetpts(options.speed || '1.25')},scale=1920:-2,fps=30`,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', options.crf || '23',
      '-movflags', '+faststart',
      '-pix_fmt', 'yuv420p',
      options.output || defaults.demo
    ]
  },
  compress: {
    description: 'Compress an existing edited MP4 for web/Vercel delivery.',
    input: options.input || defaults.demo,
    output: options.output || defaults.compressed,
    ffmpeg: [
      '-y',
      '-i', options.input || defaults.demo,
      '-an',
      '-vf', `scale=${options.width || '1280'}:-2,fps=30`,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', options.crf || '25',
      '-maxrate', options.maxrate || '2200k',
      '-bufsize', options.bufsize || '4400k',
      '-movflags', '+faststart',
      '-pix_fmt', 'yuv420p',
      options.output || defaults.compressed
    ]
  },
  trim: {
    description: 'Trim intro/outro or isolate a clean clip without changing speed.',
    input: options.input || defaults.input,
    output: options.output || defaults.trimmed,
    ffmpeg: [
      '-y',
      '-ss', options.start || '00:00:02',
      '-t', options.duration || '00:00:20',
      '-i', options.input || defaults.input,
      '-an',
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', options.crf || '23',
      '-movflags', '+faststart',
      '-pix_fmt', 'yuv420p',
      options.output || defaults.trimmed
    ]
  },
  speed: {
    description: 'Speed up a clip. Use 1.25, 1.5, or 2 for common SaaS demo pacing.',
    input: options.input || defaults.input,
    output: options.output || defaults.speed,
    ffmpeg: [
      '-y',
      '-i', options.input || defaults.input,
      '-an',
      '-vf', `setpts=${speedToSetpts(options.speed || '1.5')},fps=30`,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', options.crf || '23',
      '-movflags', '+faststart',
      '-pix_fmt', 'yuv420p',
      options.output || defaults.speed
    ]
  }
};

if (command === 'help' || options.help === 'true' || !recipes[command]) {
  printHelp();
  process.exit(command === 'help' || options.help === 'true' ? 0 : 1);
}

const recipe = recipes[command];
ensureOutputDir(recipe.output);

if (!existsSync(resolve(recipe.input))) {
  console.error(`Input file not found: ${recipe.input}`);
  console.error('Place raw recordings in public/assets/videos/raw/ or pass --input path/to/file.mp4');
  process.exit(1);
}

console.log(`\n${recipe.description}`);
console.log(`Input:  ${recipe.input}`);
console.log(`Output: ${recipe.output}`);
console.log(`\nffmpeg ${recipe.ffmpeg.map(quoteArg).join(' ')}\n`);

const result = spawnSync('ffmpeg', recipe.ffmpeg, { stdio: 'inherit' });
if (result.error) {
  console.error('\nffmpeg was not found. Install ffmpeg, then run this command again.');
  console.error('Docs: https://ffmpeg.org/download.html');
  process.exit(1);
}
process.exit(result.status ?? 0);

function parseArgs(items) {
  const parsed = {};
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    if (!item.startsWith('--')) continue;
    const key = item.slice(2);
    const next = items[index + 1];
    parsed[key] = next && !next.startsWith('--') ? next : 'true';
    if (next && !next.startsWith('--')) index += 1;
  }
  return parsed;
}

function speedToSetpts(speed) {
  const value = Number(speed);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Invalid speed value: ${speed}`);
  }
  return `${(1 / value).toFixed(4)}*PTS`;
}

function ensureOutputDir(output) {
  mkdirSync(dirname(resolve(output)), { recursive: true });
}

function quoteArg(arg) {
  return /\s/.test(arg) ? `"${arg}"` : arg;
}

function printHelp() {
  console.log(`
SafetyWarden video optimization

Commands:
  npm run video:hero -- --input public/assets/videos/raw/field_execution_raw.mp4
  npm run video:demo -- --input public/assets/videos/raw/field_execution_raw.mp4
  npm run video:compress -- --input public/assets/videos/edited/field_execution_demo.mp4
  npm run video:trim -- --input raw.mp4 --start 00:00:03 --duration 00:00:18
  npm run video:speed -- --input raw.mp4 --speed 1.5

Useful flags:
  --input       Source MP4 path
  --output      Output MP4 path
  --start       Trim start timestamp, e.g. 00:00:02
  --duration    Clip length, e.g. 00:00:16
  --speed       1.25, 1.5, or 2
  --crf         Quality. Lower is larger/better. Hero: 24-28, demo: 22-24
  --width       Compression width, e.g. 1280
`);
}
