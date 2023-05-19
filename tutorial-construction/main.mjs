import { createConstructionSite, getObjectById, getObjectsByPrototype } from 'game/utils';
import { Creep, StructureTower } from 'game/prototypes';
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from 'game/constants';

var constructionSite

export function loop()
{
    if (!constructionSite) constructionSite = createConstructionSite({x: 50, y: 55}, StructureTower).object;
    var mcp = getObjectsByPrototype(Creep).find(x => x.my);
    var container = getObjectById('2');

    if (mcp.store[RESOURCE_ENERGY] < 10)
    {
        console.log("能量不足，正在获取能量")
        var wres = mcp.withdraw(container, RESOURCE_ENERGY);
        if (wres == ERR_NOT_IN_RANGE)
        {
            console.log("移动至容器")
            mcp.moveTo(container);
        }
    }
    else
    {
        console.log("能量充足，正在建造")
        var bres = mcp.build(constructionSite);
        if (bres == ERR_NOT_IN_RANGE)
        {
            console.log("移动至建造地点")
            mcp.moveTo(constructionSite);
        }
    }
}
