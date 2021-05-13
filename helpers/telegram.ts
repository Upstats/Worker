import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions";
import { Logger } from "telegram/extensions";
import { EntityLike } from "telegram/define";
import * as config from "config";
import { ConnectionTCPObfuscated } from "telegram/network";
//Logger.setLevel("none"); // no logging

const config_apiId: number = config.get("api_id");
const config_apiHash: string = config.get("api_hash");
const config_session: string = config.get("tg_session");
const apiId: number =
  ((process.env.api_id as unknown) as number) || config_apiId;
const apiHash: string = process.env.api_hash || config_apiHash;
const stringSession = new StringSession(
  process.env.tg_session || config_session
);
export const getStatus = async (username: EntityLike) => {
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.connect();
  const sentMessage = await client.invoke(
    new Api.messages.SendMessage({ peer: username, message: "/start" })
  );
  // @ts-ignore
  const sentId = sentMessage.updates[0].id;

  await new Promise((r) => setTimeout(r, 1500));

  const history = await client.invoke(
    new Api.messages.GetHistory({ peer: username, limit: 1 })
  );
  // @ts-ignore
  const lastMessageId = history.messages[0].id;

  await client.disconnect();

  return sentId === lastMessageId ? "down" : "up";
};
