import { getObjectsByPrototype } from 'game/utils';
import { Creep, StructureContainer, StructureTower } from 'game/prototypes';
import { RESOURCE_ENERGY } from 'game/constants';

export function loop()
{
    const tower = getObjectsByPrototype(StructureTower)[0];
    var container = getObjectsByPrototype(StructureContainer)[0];
    var mcp = getObjectsByPrototype(Creep).find(x => x.my);
    var target = getObjectsByPrototype(Creep).find(x => !x.my);

    if (target != null && target.exists && tower.cooldown == 0)
    {
        tower.attack(target);
        console.log("防御塔攻击目标");
    }

    if (mcp.store[RESOURCE_ENERGY] < 10 && container.store[RESOURCE_ENERGY] > 0)
    {
        mcp.withdraw(container, RESOURCE_ENERGY);
        console.log("从容器取出能量");
    }
    
    if (mcp.store[RESOURCE_ENERGY] >= 10 && tower.store[RESOURCE_ENERGY] < 50)
    {
        mcp.transfer(tower, RESOURCE_ENERGY);
        console.log("转移能量至防御塔");
    }
}
