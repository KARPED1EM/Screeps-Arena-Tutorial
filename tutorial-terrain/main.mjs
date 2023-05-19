import { getObjectsByPrototype } from 'game/utils';
import { Creep, Flag } from 'game/prototypes';

export function loop()
{
    var creeps = getObjectsByPrototype(Creep).filter(x => x.my);
    var flags = getObjectsByPrototype(Flag);
    for (var cp of creeps)
        cp.moveTo(cp.findClosestByPath(flags))
}
