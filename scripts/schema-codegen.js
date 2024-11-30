import * as cliLib from "@codegena/oapi3ts-cli";

const cliApp = new cliLib.CliApplication();

cliApp.cliConfig.typingsDirectory = '';
cliApp.createTypings();