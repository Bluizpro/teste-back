const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");

const sessionId = uuid.v4();
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runIntent(projectId, requestText) {
  // A unique identifier for the given session
  const credentials = require("./perfil-bruno.json");
  const sessionClient = new dialogflow.SessionsClient({
    credentials: credentials,
  });

  const sessionPath = sessionClient.projectAgentSessionPath(
    "perfil-bruno-vkty",
    sessionId
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: requestText,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };
  result = null;

  try {
    const responses = await sessionClient.detectIntent(request);
    result = responses[0].queryResult;

  } catch (err) {
    console.log(err);
  }
  console.log(result.intent.displayName);
  return await {
    Query: result.queryText,
    Response: result.fulfillmentText,
    Intent: result.intent.displayName,
  };
}

module.exports.runIntent = runIntent;
