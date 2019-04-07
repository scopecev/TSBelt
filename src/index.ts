import {$log} from "ts-log-debug";
import {Server} from "./Server";
// import * from "extensions";

$log.debug("Start server...");
new Server().start().catch((er) => {
  $log.error(er);
});
