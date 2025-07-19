import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';
import { formatDistanceToNow, isToday, format } from 'date-fns';

const NOTES_DIR = path.join(process.cwd(), '.notecli');

/**
 * Get the filename for today's note file based on current date.
 * @returns {string} Full path to today's markdown note file (e.g., '.notecli/2025-07-19.md').
 */
function getTodayFileName() {
  const date = new Date().toISOString().split('T')[0];
  return path.join(NOTES_DIR, `${date}.md`);
}

/**
 * Ensures that the notes directory exists, creates it if it does not.
 * @returns {Promise<void>}
 */
async function ensureDir() {
  await fs.ensureDir(NOTES_DIR);
}

/**
 * Adds a timestamped note to today's note file.
 * @param {string} text - The note text to add.
 * @returns {Promise<void>}
 */
export async function addNote(text) {
  await ensureDir();
  const file = getTodayFileName();
  const timestamp = new Date().toLocaleTimeString();
  await fs.appendFile(file, `- ${timestamp}: ${text}\n`);
}

/**
 * Finds notes containing a keyword across all note files, highlights the keyword, and prints sorted results.
 * @param {string} keyword - The search keyword to find in notes.
 * @returns {Promise<void>}
 */
export async function findNote(keyword) {
  await ensureDir();
  const files = await fs.readdir(NOTES_DIR);
  const matches = [];

  for (const file of files) {
    const content = await fs.readFile(path.join(NOTES_DIR, file), 'utf8');
    const lines = content.split('\n');
    const datePart = path.basename(file, '.md'); // e.g., '2025-07-19'
    const [year, month, day] = datePart.split('-');

    for (const line of lines) {
      if (line.toLowerCase().includes(keyword.toLowerCase())) {
        const regex = /^-\s+(\d{1,2}:\d{2}:\d{2}\s[AP]M):\s+(.*)$/;
        const match = line.match(regex);

        if (match) {
          const [, time, text] = match;
          const [timePart, modifier] = time.split(' ');
          const [h, m, s] = timePart.split(':').map(Number);

          const baseDate = new Date(year, parseInt(month) - 1, day);
          baseDate.setHours(
            modifier === 'PM' && h !== 12 ? h + 12 : modifier === 'AM' && h === 12 ? 0 : h,
            m,
            s
          );

          // Highlight matched keyword using background color
          const keywordRegex = new RegExp(`(${keyword})`, 'gi');
          const highlightedText = text.replace(keywordRegex, chalk.bgYellow.black('$1'));

          matches.push({ date: baseDate, text: highlightedText });
        }
      }
    }
  }

  if (matches.length === 0) {
    console.log(chalk.red('❌ No matching note found.'));
    return;
  }

  // Sort matches by date ascending
  matches.sort((a, b) => a.date - b.date);

  // Print sorted matches with friendly date/time format
  for (const match of matches) {
    let displayTime = '';

    if (isToday(match.date)) {
      displayTime = formatDistanceToNow(match.date, { addSuffix: true });
    } else {
      displayTime = format(match.date, 'MMMM d, yyyy, h:mm a');
    }

    console.log(`${chalk.cyan(displayTime)} - ${chalk.white(match.text)}`);
  }
}

/**
 * Lists all note files in the notes directory.
 * @returns {Promise<void>}
 */
export async function listNotes() {
  await ensureDir();
  const files = await fs.readdir(NOTES_DIR);
  if (files.length === 0) {
    console.log(chalk.yellow('No notes found.'));
    return;
  }
  files.forEach(file => console.log('📁', chalk.cyan(file)));
}

/**
 * Displays all notes from today's note file with timestamps in friendly format.
 * @returns {Promise<void>}
 */
export async function todayNote() {
  await ensureDir();
  const file = getTodayFileName();

  if (!(await fs.pathExists(file))) {
    console.log(chalk.yellow('No notes for today.'));
    return;
  }

  const content = await fs.readFile(file, 'utf8');
  const lines = content.split('\n').filter(Boolean);

  const notes = [];

  for (const line of lines) {
    const regex = /^-\s+(\d{1,2}:\d{2}:\d{2}\s[AP]M):\s+(.*)$/;
    const match = line.match(regex);

    if (match) {
      const [, time, text] = match;
      const [timePart, modifier] = time.split(' ');
      const [h, m, s] = timePart.split(':').map(Number);

      const now = new Date();
      const noteDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        modifier === 'PM' && h !== 12 ? h + 12 : modifier === 'AM' && h === 12 ? 0 : h,
        m,
        s
      );

      notes.push({ date: noteDate, text });
    }
  }

  // Sort notes by date ascending
  notes.sort((a, b) => a.date - b.date);

  console.log(chalk.green(`Notes for today:`));

  // Print sorted notes with friendly time
  for (const note of notes) {
    let displayTime = '';

    if (isToday(note.date)) {
      displayTime = formatDistanceToNow(note.date, { addSuffix: true });
    } else {
      displayTime = format(note.date, 'MMMM d, yyyy, h:mm a');
    }

    console.log(`${chalk.cyan(displayTime)} - ${chalk.white(note.text)}`);
  }
}

/**
 * Adds an idea with timestamp to a dedicated 'ideas.md' file.
 * @param {string} idea - The idea text to save.
 * @returns {Promise<void>}
 */
export async function addIdea(idea) {
  await ensureDir();
  const file = path.join(NOTES_DIR, `ideas.md`);
  const timestamp = new Date().toISOString();
  await fs.appendFile(file, `- [${timestamp}] ${idea}\n`);
  console.log(chalk.green('💡 Idea saved!'));
}
