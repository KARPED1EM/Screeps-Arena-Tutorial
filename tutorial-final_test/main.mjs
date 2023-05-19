import { getObjectsByPrototype } from 'game/utils';
import { Creep, Source, StructureSpawn } from 'game/prototypes';
import { CARRY, ERR_NOT_ENOUGH_ENERGY, ERR_NOT_IN_RANGE, MOVE, RANGED_ATTACK, RESOURCE_ENERGY, WORK } from 'game/constants';

export function loop()
{
    var myspw = getObjectsByPrototype(StructureSpawn).find(x => x.my);
    var enemies = getObjectsByPrototype(Creep).filter(x => !x.my);
    var source = getObjectsByPrototype(Source)[0];
    var mcp = getObjectsByPrototype(Creep).filter(x => x.my);
    var mcp_work = mcp.filter(x => x.body.some(y => y.type == WORK));
    var mcp_rtk = mcp.filter(x => x.body.some(y => y.type == RANGED_ATTACK));
    
    console.log("======== 出生点事件 ========")

    var logPrefix, sres;
    if (!myspw.spawning)
    {
        if (mcp_work.length < 5)
        {
            logPrefix = "尝试创建采矿爬爬第" + (mcp_work.length + 1) + "个：";
            sres = myspw.spawnCreep([MOVE, WORK, WORK, CARRY]);
        }
        else if (mcp_rtk.length < 5)
        {
            logPrefix = "尝试创建远程攻击爬爬第" + (mcp_rtk.length + 1) + "个：";
            sres = myspw.spawnCreep([MOVE, RANGED_ATTACK, RANGED_ATTACK]);
        }
        if (sres != null && sres.error != undefined)
        {
            switch (sres.error)
            {
                case ERR_NOT_ENOUGH_ENERGY: console.log(logPrefix + "能量不足"); break;
                default: console.log(logPrefix + sres.error);
            }
        }
        else console.log(logPrefix + "开始创建");
    }
    else console.log("正在创建新爬爬")

    console.log("\n======== 工作型爬爬事件 ========")

    for (var cp of mcp_work.filter(x => !x.spawning))
    {
        logPrefix = "采矿爬爬" + (mcp_work.indexOf(cp) + 1) + "号（" + cp.store[RESOURCE_ENERGY] + "）：";

        if (cp.store.getFreeCapacity(RESOURCE_ENERGY))
        {
            if (cp.harvest(source) == ERR_NOT_IN_RANGE)
            {
                console.log(logPrefix + "移动至资源");
                cp.moveTo(source);
            }
            else console.log(logPrefix + "采矿中")
        }
        else
        {
            if (cp.transfer(myspw, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                console.log(logPrefix + "移动至出生点");
                cp.moveTo(myspw);
            }
            else console.log(logPrefix + "为出生点充能")
        }
    }

    console.log("\n======== 攻击型爬爬事件 ========")

    for (var cp of mcp_rtk.filter(x => !x.spawning))
    {
        logPrefix = "远程攻击爬爬" + (mcp_rtk.indexOf(cp) + 1) + "号：";

        for (var enemy of enemies)
        {
            var rres = cp.rangedAttack(enemy);
            switch (rres)
            {
                case ERR_NOT_IN_RANGE:
                    if (cp.getRangeTo(myspw) < 6 || enemy.getRangeTo(myspw) < 8)
                    {
                        console.log(logPrefix + "向敌移动");
                        cp.moveTo(enemy);
                    }
                    break;
                default: console.log(logPrefix + rres);
            }
            break;
        }
    }
}