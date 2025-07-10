import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';

const NOTES_DIR = path.join(process.cwd(), '.notecli');

function getTodayFileName() {
  const date = new Date().toISOString().split('T')[0];
  return path.join(NOTES_DIR, `${date}.md`);
}

async function ensureDir() {
  await fs.ensureDir(NOTES_DIR);
}

export async function addNote(text) {
  await ensureDir();
  const file = getTodayFileName();
  const timestamp = new Date().toLocaleTimeString();
  await fs.appendFile(file, `- ${timestamp}: ${text}\n`);
  console.log(chalk.green('✅ Note added!'));
}

export async function findNote(keyword) {
  await ensureDir();
  const files = await fs.readdir(NOTES_DIR);
  let found = false;
  for (const file of files) {
    const content = await fs.readFile(path.join(NOTES_DIR, file), 'utf8');
    if (content.includes(keyword)) {
      console.log(chalk.blue(`📄 ${file}`));
      console.log(chalk.white(content));
      found = true;
    }
  }
  if (!found) {
    console.log(chalk.red('❌ No matching note found.'));
  }
}

export async function listNotes() {
  await ensureDir();
  const files = await fs.readdir(NOTES_DIR);
  if (files.length === 0) return console.log(chalk.yellow('No notes found.'));
  files.forEach(file => console.log('📁', chalk.cyan(file)));
}

export async function todayNote() {
  await ensureDir();
  const file = getTodayFileName();
  if (!await fs.pathExists(file)) {
    return console.log(chalk.yellow('No notes for today.'));
  }
  const content = await fs.readFile(file, 'utf8');
  console.log(chalk.green(`📅 Notes for today:`));
  console.log(content);
}

export async function addIdea(idea) {
  await ensureDir();
  const file = path.join(NOTES_DIR, `ideas.md`);
  const timestamp = new Date().toISOString();
  await fs.appendFile(file, `- [${timestamp}] ${idea}\n`);
  console.log(chalk.green('💡 Idea saved!'));
}
