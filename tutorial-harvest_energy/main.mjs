import { getObjectsByPrototype } from 'game/utils';
import { Creep, Source, StructureSpawn } from 'game/prototypes';
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from 'game/constants';

export function loop()
{
    var creep = getObjectsByPrototype(Creep).find(i => i.my);
    var source = getObjectsByPrototype(Source)[0];
    var spawn = getObjectsByPrototype(StructureSpawn).find(i => i.my);

    if(creep.store.getFreeCapacity(RESOURCE_ENERGY))
    {
        if(creep.harvest(source) == ERR_NOT_IN_RANGE)
            creep.moveTo(source);
    }
    else if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.moveTo(spawn);
}
