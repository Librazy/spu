import * as restify from 'restify';
import { UpdaterTo19 } from './to19/updater'
import { UpdaterTo111 } from './to111/updater'
import { UpdaterTo112 } from './to112/updater'
import { UpdaterTo113 } from './to113/updater'
import { UpdaterTo114 } from './to114/updater'
import { UpdateResult } from './utils/utils';

function upCommand(req: restify.Request, res: restify.Response, next: restify.Next) {
    if (!req.body) {
        res.send(400);
        next();
        return;
    }
    if (['18', '19', '111', '112', '113'].indexOf(req.params.from) === -1) {
        res.send(410);
        next();
        return;
    }
    var result: UpdateResult;
    try {
        switch (req.params.to) {
            case '19': {
                result = UpdaterTo19.upLine(req.body, req.params.from)
                break;
            }
            case '111': {
                result = UpdaterTo111.upLine(req.body, req.params.from)
                break;
            }
            case '112': {
                result = UpdaterTo112.upLine(req.body, req.params.from)
                break;
            }
            case '113': {
                result = UpdaterTo113.upLine(req.body, req.params.from)
                break;
            }
            case '114': {
                result = UpdaterTo114.upLine(req.body, req.params.from)
                break;
            }
            default:
                res.send(404);
                next();
                return;
        }
        res.json(200, result);
        next();
    } catch (err) {
        next(err);
    }
}

function upEntityName(req: restify.Request, res: restify.Response, next: restify.Next) {
    if (!req.body) {
        res.send(400);
        next();
        return;
    }
    if (['18', '19', '111', '112', '113'].indexOf(req.params.from) === -1) {
        res.send(410);
        next();
        return;
    }
    var result: string;
    try {
        switch (req.params.to) {
            case '19': {
                result = new UpdaterTo19().upArgument(req.body, "minecraft:entity_summon")
                break;
            }
            case '111': {
                result = new UpdaterTo111().upArgument(req.body, "minecraft:entity_summon")
                break;
            }
            case '112': {
                result = new UpdaterTo112().upArgument(req.body, "minecraft:entity_summon")
                break;
            }
            case '113': {
                result = new UpdaterTo113().upArgument(req.body, "minecraft:entity_summon")
                break;
            }
            case '114': {
                result = new UpdaterTo114().upArgument(req.body, "minecraft:entity_summon")
                break;
            }
            default:
                res.send(404);
                next();
                return;
        }
        res.send(200, result);
        next();
    } catch (err) {
        next(err);
    }
}

function upEntityNbt(req: restify.Request, res: restify.Response, next: restify.Next) {
    if (!req.body) {
        res.send(400);
        next();
        return;
    }
    if (['18', '19', '111', '112', '113'].indexOf(req.params.from) === -1) {
        res.send(410);
        next();
        return;
    }
    var result: string;
    try {
        switch (req.params.to) {
            case '19': {
                result = new UpdaterTo19().upArgument(req.body, "spgoding:entity_nbt")
                break;
            }
            case '111': {
                result = new UpdaterTo111().upArgument(req.body, "spgoding:entity_nbt")
                break;
            }
            case '112': {
                result = new UpdaterTo112().upArgument(req.body, "spgoding:entity_nbt")
                break;
            }
            case '113': {
                result = new UpdaterTo113().upArgument(req.body, "spgoding:entity_nbt")
                break;
            }
            case '114': {
                result = new UpdaterTo114().upArgument(req.body, "spgoding:entity_nbt")
                break;
            }
            default:
                res.send(404);
                next();
                return;
        }
        res.send(200, result);
        next();
    } catch (err) {
        next(err);
    }
}

export const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(restify.pre.sanitizePath());

server.post('/command/:from/:to', upCommand);
server.head('/command/:from/:to', upCommand);

server.post('/entityname/:from/:to', upEntityName);
server.head('/entityname/:from/:to', upEntityName);

server.post('/entitynbt/:from/:to', upEntityNbt);
server.head('/entitynbt/:from/:to', upEntityNbt);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});