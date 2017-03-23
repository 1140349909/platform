import React from 'react';
import PageBase from 'common/base/PageBase';
import ChargeEnchashment from './component/ChargeEnchashment';
import  './payment.less';

class Enchashment extends PageBase {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="app-page app-page-charge-enchashment">
                <ChargeEnchashment/>
            </div>
        );
    }
}

export default Enchashment;


