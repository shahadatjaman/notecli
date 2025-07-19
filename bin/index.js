#!/usr/bin/env node
import { Command } from 'commander';
import { addNote, findNote, listNotes, todayNote, addIdea } from '../lib/noteManager.js';

const program = new Command();

/**
 * CLI program setup for 'notecli' - a Note Taking Command Line Interface tool.
 * Supports adding, finding, listing notes, showing today's notes, and adding ideas.
 */
program
  .name('notecli')
  .description('Note Taking CLI Tool')
  .version('1.0.0');

/**
 * 'add' command
 * Adds a new note with text provided as arguments.
 * Performs validation on input length and emptiness.
 */
program
  .command('add')
  .description('Add a new note')
  .arguments('<text...>')
  .action(text => {
    const content = text.join(' ').trim();

    if (typeof content !== 'string') {
      console.log('⚠️ Please provide the note content as a valid text string.');
      return;
    }

    if (!content) {
      console.log('❗ Note content cannot be empty.');
      return;
    }

    if (content.length === 1) {
      console.log('⚠️ Note is too short. Minimum 2 characters required.');
      return;
    }

    addNote(content);
  });

/**
 * 'find' command
 * Searches all notes for a given keyword and displays matches.
 */
program
  .command('find')
  .description('Find note by keyword')
  .argument('<keyword>', 'Keyword to search')
  .action(keyword => findNote(keyword));

/**
 * 'list' command
 * Lists all note files present.
 */
program
  .command('list')
  .description('List all notes')
  .action(listNotes);

/**
 * 'today' command
 * Displays all notes recorded for today.
 */
program
  .command('today')
  .description("Show today's notes")
  .action(todayNote);

/**
 * 'idea' command
 * Adds a new idea note with the provided text.
 */
program
  .command('idea')
  .description('Add an idea note')
  .argument('<idea>', 'Idea content')
  .action(idea => addIdea(idea));

program.parse(process.argv);
