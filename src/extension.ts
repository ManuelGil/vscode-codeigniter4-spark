import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { cacheClear, cacheInfo } from './commands/cache';
import command from './commands/command';
import config from './commands/config';
import controller from './commands/controller';
import { dbCreate, dbSeed, dbTable } from './commands/db';
import entity from './commands/entity';
import filter from './commands/filter';
import helper from './commands/helper';
import key from './commands/key';
import language from './commands/language';
import { migrate, migrateRefresh, migrateRollback, migrateStatus } from './commands/migrate';
import migration from './commands/migration';
import model from './commands/model';
import resource from './commands/resource';
import routes from './commands/routes';
import seeder from './commands/seeder';
import serve from './commands/serve';
import validation from './commands/validation';
import filterCheck from './commands/filter-check';

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
  const sparkTerminalMigrateStatus = vscode.commands.registerCommand('spark.terminal.migrate.status', () => {
    migrateStatus(vscode);
  });
  const sparkTerminalServe = vscode.commands.registerCommand('spark.terminal.serve', () => {
    serve(vscode);
  });
  const sparkTerminalKey = vscode.commands.registerCommand('spark.terminal.key', () => {
    key(vscode);
  });
  const sparkTerminalCacheClear = vscode.commands.registerCommand('spark.terminal.cache.clear', () => {
    cacheClear(vscode);
  });
  const sparkTerminalCacheInfo = vscode.commands.registerCommand('spark.terminal.cache.info', () => {
    cacheInfo(vscode);
  });
  const sparkTerminalRoutes = vscode.commands.registerCommand('spark.terminal.routes', () => {
    routes(vscode);
  });
  const sparkTerminalDbCreate = vscode.commands.registerCommand('spark.terminal.db.create', () => {
    dbCreate(vscode);
  });
  const sparkTerminalDbSeed = vscode.commands.registerCommand('spark.terminal.db.seed', () => {
    dbSeed(vscode);
  });
  const sparkTerminalDbTable = vscode.commands.registerCommand('spark.terminal.db.table', () => {
    dbTable(vscode);
  });
  const sparkTerminalFilterCheck = vscode.commands.registerCommand('spark.terminal.filter.check', () => {
    filterCheck(vscode);
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
  context.subscriptions.push(sparkTerminalMigrateStatus);
  context.subscriptions.push(sparkTerminalServe);
  context.subscriptions.push(sparkTerminalKey);
  context.subscriptions.push(sparkTerminalCacheClear);
  context.subscriptions.push(sparkTerminalCacheInfo);
  context.subscriptions.push(sparkTerminalRoutes);
  context.subscriptions.push(sparkTerminalDbCreate);
  context.subscriptions.push(sparkTerminalDbSeed);
  context.subscriptions.push(sparkTerminalDbTable);
  context.subscriptions.push(sparkTerminalFilterCheck);
}

export function deactivate() {}
