#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { addNote, findNote, listNotes, todayNote, addIdea } from '../lib/noteManager.js';

const program = new Command();

program
  .name('notecli')
  .description('Note Taking CLI Tool')
  .version('1.0.0');

program
  .command('add')
  .description('Add a new note')
  .argument('<text>', 'Note content')
  .action((text) => addNote(text));

program
  .command('find')
  .description('Find note by keyword')
  .argument('<keyword>', 'Keyword to search')
  .action((keyword) => findNote(keyword));

program
  .command('list')
  .description('List all notes')
  .action(listNotes);

program
  .command('today')
  .description('Show today\'s notes')
  .action(todayNote);

program
  .command('idea')
  .description('Add an idea note')
  .argument('<idea>', 'Idea content')
  .action((idea) => addIdea(idea));

program.parse();
