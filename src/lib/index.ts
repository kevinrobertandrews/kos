import { stack, queue, createState, withHistory } from "./state";
import { shortId } from "./id";
import { getESModuleDir } from "./esm";
import { extractKeywords } from "./ai";
import { isShallowEqual, clone } from "./object";
import { isWithinBoundingBox } from "./location";
import { runTest } from "./test";
import { clamp } from "date-fns";
import { toTitleCase } from "./text";
import { haversineDistance } from "./geo";
import { bytesToHumanReadable } from "./convert";
import { formatCurrency } from "./currency";
import { cadToUsd } from "./currency/cadToUsd/cadToUsd";
import { publish, subscribe } from "./pubsub";
import { deck } from "./deck";
import { del, options, ping, post, put } from "./http";
import { get } from "http";
import { pick } from "./random";
import { hsl } from "./colour";
import { format } from "./json";
import { log } from "./logger";
import { exists, mkdir, read, save } from "./disk";
import {
  ampm,
  bedtime,
  hhmm,
  hhmmTz,
  longDate,
  longDateWithOrdinal,
  midnight,
  since,
  timestamp,
  YYYYMMDD,
  now,
  between,
  isToday,
  isTodayUTC,
} from "./time";

export default {
  state: {
    stack,
    queue,
    createState,
    withHistory,
  },
  id: {
    shortId,
  },
  esm: {
    getESModuleDir,
  },
  ai: {
    extractKeywords,
  },
  object: {
    clone,
    isShallowEqual,
  },
  location: {
    isWithinBoundingBox,
  },
  test: {
    runTest,
  },
  math: {
    clamp,
  },
  text: {
    toTitleCase,
  },
  geo: {
    haversineDistance,
  },
  convert: {
    bytesToHumanReadable,
  },
  currency: {
    cadToUsd,
    formatCurrency,
  },
  pubsub: {
    subscribe,
    publish,
  },
  deck: {
    deck,
  },
  http: {
    get,
    post,
    put,
    del,
    options,
    ping,
  },
  random: {
    pick,
  },
  colour: {
    hsl,
  },
  json: {
    format,
  },
  logger: {
    log,
  },
  disk: {
    read,
    save,
    exists,
    mkdir,
  },
  time: {
    YYYYMMDD,
    hhmm,
    since,
    timestamp,
    ampm,
    hhmmTz,
    longDateWithOrdinal,
    longDate,
    midnight,
    bedtime,
    now,
    between,
    isToday,
    isTodayUTC,
  },
};
