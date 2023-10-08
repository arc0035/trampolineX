import RootState from "./state";

export default class StateStore {

    state: RootState;
    
    constructor(state: RootState){
        this.state = state;
    }

}