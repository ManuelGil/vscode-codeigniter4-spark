import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import command from './commands/command';
import config from './commands/config';
import controller from './commands/controller';
import entity from './commands/entity';
import filter from './commands/filter';
import helper from './commands/helper';
import language from './commands/language';
import { migrate, migrateRefresh, migrateRollback } from './commands/migrate';
import migration from './commands/migration';
import model from './commands/model';
import resource from './commands/resource';
import seeder from './commands/seeder';
import validation from './commands/validation';

export function activate(context: vscode.ExtensionContext) {
  const sparkFileCommand = vscode.commands.registerCommand('spark.file.command', () => {
    command(vscode, fs, path);
  });
  const sparkFileConfig = vscode.commands.registerCommand('spark.file.config', () => {
    config(vscode, fs, path);
  });
  const sparkFileController = vscode.commands.registerCommand('spark.file.controller', () => {
    controller(vscode, fs, path);
  });
  const sparkFileEntity = vscode.commands.registerCommand('spark.file.entity', () => {
    entity(vscode, fs, path);
  });
  const sparkFileFilter = vscode.commands.registerCommand('spark.file.filter', () => {
    filter(vscode, fs, path);
  });
  const sparkFileHelper = vscode.commands.registerCommand('spark.file.helper', () => {
    helper(vscode, fs, path);
  });
  const sparkFileLanguage = vscode.commands.registerCommand('spark.file.language', () => {
    language(vscode, fs, path);
  });
  const sparkFileMigration = vscode.commands.registerCommand('spark.file.migration', () => {
    migration(vscode, fs, path);
  });
  const sparkFileModel = vscode.commands.registerCommand('spark.file.model', () => {
    model(vscode, fs, path);
  });
  const sparkFileResource = vscode.commands.registerCommand('spark.file.resource', () => {
    resource(vscode, fs, path);
  });
  const sparkFileSeeder = vscode.commands.registerCommand('spark.file.seeder', () => {
    seeder(vscode, fs, path);
  });
  const sparkFileValidation = vscode.commands.registerCommand('spark.file.validation', () => {
    validation(vscode, fs, path);
  });
  const sparkTerminalMigrate = vscode.commands.registerCommand('spark.terminal.migrate', () => {
    migrate(vscode);
  });
  const sparkTerminalMigrateRefresh = vscode.commands.registerCommand('spark.terminal.migrate.refresh', () => {
    migrateRefresh(vscode);
  });
  const sparkTerminalMigrateRollback = vscode.commands.registerCommand('spark.terminal.migrate.rollback', () => {
    migrateRollback(vscode);
  });

  context.subscriptions.push(sparkFileCommand);
  context.subscriptions.push(sparkFileConfig);
  context.subscriptions.push(sparkFileController);
  context.subscriptions.push(sparkFileEntity);
  context.subscriptions.push(sparkFileFilter);
  context.subscriptions.push(sparkFileHelper);
  context.subscriptions.push(sparkFileLanguage);
  context.subscriptions.push(sparkFileMigration);
  context.subscriptions.push(sparkFileModel);
  context.subscriptions.push(sparkFileResource);
  context.subscriptions.push(sparkFileSeeder);
  context.subscriptions.push(sparkFileValidation);
  context.subscriptions.push(sparkTerminalMigrate);
  context.subscriptions.push(sparkTerminalMigrateRefresh);
  context.subscriptions.push(sparkTerminalMigrateRollback);
}

export function deactivate() {}
