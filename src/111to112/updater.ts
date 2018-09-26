import Spuses from "./mappings/spuses";
import SpuScript from "../spu_script";
import ArgumentReader from "../utils/argument_reader";
import Checker from "../111to112/checker";
import { getNbtCompound } from "../utils/utils";

export default class Updater {
    /**
Returns an result map from an 1.12 command and an 1.12 spus.
@param cmd An 1.12 minecraft command.
@param spus An 1.12 spus defined in spuses.ts.
@returns NULLABLE. A map filled with converted value.
@example {'%n': 'converted value'}.
     */
    public static getResultMap(cmd: string, spus: string) {
        let spusReader = new ArgumentReader(spus)
        let spusArg = spusReader.next()
        let cmdSplited = cmd.split(' ')
        let begin: number = 0
        let end: number = cmdSplited.length
        let cmdArg = cmdSplited.slice(begin, end).join(' ')
        let map = new Map<string, string>()
        let cnt = 0
        while (spusArg !== '' && begin < cmdSplited.length) {
            while (!Checker.isArgumentMatch(cmdArg, spusArg)) {
                if (cmdArg !== '') {
                    end -= 1
                    cmdArg = cmdSplited.slice(begin, end).join(' ')
                } else {
                    // The cmdArg has sliced to ''.
                    // Still can't match.
                    return null
                }
            }

            begin = end
            end = cmdSplited.length

            if (spusArg.charAt(0) === '%') {
                map.set(`%${cnt++}`, Updater.upArgument(cmdArg, spusArg))
            }
            spusArg = spusReader.next()
            cmdArg = cmdSplited.slice(begin, end).join(' ')
        }
        if (cmdArg === '' && spusArg === '') {
            // Match successfully.
            return map
        } else {
            return null
        }
    }

    public static upLine(input: string) {
        if (/^\s*$/.test(input)) {
            return input
        } else {
            return Updater.upCommand(input)
        }
    }

    private static upCommand(input: string) {
        let slash = false

        if (input.slice(0, 1) === '/') {
            input = input.slice(1)
            slash = true
        }

        for (const spusOld of Spuses.pairs.keys()) {
            let map = Updater.getResultMap(input, spusOld)
            if (map) {
                let spusNew = Spuses.pairs.get(spusOld)
                if (spusNew) {
                    let spus = new SpuScript(spusNew)
                    let result = spus.compileWith(map)
                    if (slash) {
                        result = `/${result}`
                    }
                    return result
                }
            }
        }

        throw `Unknown command: ${input}`
    }

    private static upArgument(arg: string, spus: string) {
        switch (spus.slice(1)) {
            case 'block_nbt':
                return getNbtCompound(arg, 'before 1.12').toString()
            case 'bool':
                return arg
            case 'command':
                return Updater.upCommand(arg)
            case 'entity':
                return arg
            case 'entity_nbt':
                return getNbtCompound(arg, 'before 1.12').toString()
            case 'entity_type':
                return arg
            case 'item_nbt':
                return getNbtCompound(arg, 'before 1.12').toString()
            case 'item_tag_nbt':
                return getNbtCompound(arg, 'before 1.12').toString()
            case 'json':
                return arg
            case 'literal':
                return arg
            case 'num':
                return arg
            case 'num_or_star':
                return arg
            case 'say_string':
                return arg
            case 'string':
                return arg
            case 'vec_2':
                return arg
            case 'vec_3':
                return arg
            case 'word':
                return arg
            default:
                throw `Unknown arg type: '${spus}'`
        }
    }
}