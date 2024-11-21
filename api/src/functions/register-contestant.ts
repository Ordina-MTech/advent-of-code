import {app, HttpRequest, HttpResponseInit, InvocationContext, output} from "@azure/functions";
import {Contestant} from '../models/contestant';


const tableOutput = output.table({
  tableName: 'contestants',
  connection: 'STORAGE_CONNECTION_STRING',
});

export async function registerContestant(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const contestant = await request.json() as Contestant;

  if(!contestant || !contestant.username || !contestant.email){
    return {jsonBody: {message: 'Missing contestant information'}, status: 400}
  }

  context.extraOutputs.set(tableOutput, {
    PartitionKey: 'contestant',
    RowKey: contestant.email + contestant.username,
    username: contestant.username,
    email: contestant.email,
    createdAt: new Date()
  });


  return {jsonBody: {message: `Created`}};
}

app.http('register-contestant', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  extraOutputs: [tableOutput],
  handler: registerContestant
});
