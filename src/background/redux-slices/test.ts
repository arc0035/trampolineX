import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

/**
 * slice几要素：
 * 状态:
 * action
 * reducer
 * extraReducer
 * thunk：集成，对外相当于api
 * middleware：可以拿到对状态持久化
 */

export type TestState = {
    name: string;
    power: number;
  };

export const initialState: TestState = {
    name: 'alice',
    power: 10
};


  



  

  //async action
  export const testThunkApi = createAsyncThunk(
    //Action
    'test/testThunk',
    async (
        {val}:{val:number}
    ) => {
        
        console.log('test api !')
    //   dispatch(
    //     powerUp({
    //         val
    //     })

    //   );
    }
  );
  const testSlice = createSlice({
    name: 'testSlice',
    initialState,
    reducers: {
      powerUp: (state,val) => ({
        ...state,
        power: state.power + 1
      }),
      powerDown: (state,val) => ({
        ...state,
        power: state.power - 1
      })
    },
  });

  export const { powerUp, powerDown } =
  testSlice.actions;

  export default testSlice.reducer;

  