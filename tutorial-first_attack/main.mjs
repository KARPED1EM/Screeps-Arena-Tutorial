import { getObjectsByPrototype } from 'game/utils';
import { Creep } from 'game/prototypes';
import { ERR_NOT_IN_RANGE } from 'game/constants';

export function loop()
{
    var mc = getObjectsByPrototype(Creep).find(x => x.my);
    var ec = getObjectsByPrototype(Creep).find(x => !x.my);
    if(mc.attack(ec) == ERR_NOT_IN_RANGE) mc.moveTo(ec);
}
