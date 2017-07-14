import ioClient = require("socket.io-client");
import {GameClient} from "./processes/GameClient";

GameClient.initGameClient(ioClient());