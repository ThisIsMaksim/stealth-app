import axios from "axios"
import * as https from "node:https"
import * as path from "node:path"
import * as fs from "node:fs"
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});


/* The code below will create operation names.
Instead of `/api/User/GetList` you'll get `UserGetList` type
that you can use anywhere */

function addOperationIdsToSchema(schema) {
    const data = schema;

    Object.keys(data.paths).forEach((endpointPath) => {
        const operations = Object.keys(data.paths[endpointPath]);

        operations.forEach((operation) => {
            const oprationName = endpointPath.replace('/api/', '').replace(/\//g, '');
            data.paths[endpointPath][operation].operationId = oprationName;
        });
    });

    return data;
}

instance
    .get('http://95.214.62.89:8080/swagger/doc.json')
    .then((response) => {
        const updatedSchema = addOperationIdsToSchema(response.data);
        fs.writeFileSync(
            path.resolve(__dirname, '../src/typings/api-schema.json'),
            JSON.stringify(updatedSchema, null, 2),
        );

        console.log('==> Schema fetched successfully...');
    })
    .catch(console.error);