import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import command from './commands/files/command';
import config from './commands/files/config';
import controller from './commands/files/controller';
import entity from './commands/files/entity';
import filter from './commands/files/filter';
import helper from './commands/files/helper';
import language from './commands/files/language';
import migration from './commands/files/migration';
import model from './commands/files/model';
import resource from './commands/files/resource';
import seeder from './commands/files/seeder';
import validation from './commands/files/validation';
import { cacheClear, cacheInfo } from './commands/terminal/cache';
import { dbCreate, dbSeed, dbTable } from './commands/terminal/db';
import filterCheck from './commands/terminal/filter';
import key from './commands/terminal/key';
import logsClear from './commands/terminal/logs';
import { migrate, migrateRefresh, migrateRollback, migrateStatus } from './commands/terminal/migrate';
import namespaces from './commands/terminal/namespaces';
import routes from './commands/terminal/routes';
import serve from './commands/terminal/serve';

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
  const sparkTerminalCacheClear = vscode.commands.registerCommand('spark.terminal.cache.clear', () => {
    cacheClear(vscode);
  });
  const sparkTerminalCacheInfo = vscode.commands.registerCommand('spark.terminal.cache.info', () => {
    cacheInfo(vscode);
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
  const sparkTerminalKey = vscode.commands.registerCommand('spark.terminal.key', () => {
    key(vscode);
  });
  const sparkTerminalLogsClear = vscode.commands.registerCommand('spark.terminal.logs.clear', () => {
    logsClear(vscode);
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
  const sparkTerminalNamespaces = vscode.commands.registerCommand('spark.terminal.namespaces', () => {
    namespaces(vscode);
  });
  const sparkTerminalRoutes = vscode.commands.registerCommand('spark.terminal.routes', () => {
    routes(vscode);
  });
  const sparkTerminalServe = vscode.commands.registerCommand('spark.terminal.serve', () => {
    serve(vscode);
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
  context.subscriptions.push(sparkTerminalCacheClear);
  context.subscriptions.push(sparkTerminalCacheInfo);
  context.subscriptions.push(sparkTerminalDbCreate);
  context.subscriptions.push(sparkTerminalDbSeed);
  context.subscriptions.push(sparkTerminalDbTable);
  context.subscriptions.push(sparkTerminalFilterCheck);
  context.subscriptions.push(sparkTerminalKey);
  context.subscriptions.push(sparkTerminalLogsClear);
  context.subscriptions.push(sparkTerminalMigrate);
  context.subscriptions.push(sparkTerminalMigrateRefresh);
  context.subscriptions.push(sparkTerminalMigrateRollback);
  context.subscriptions.push(sparkTerminalMigrateStatus);
  context.subscriptions.push(sparkTerminalNamespaces);
  context.subscriptions.push(sparkTerminalRoutes);
  context.subscriptions.push(sparkTerminalServe);
}

export function deactivate() {}
